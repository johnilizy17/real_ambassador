import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/components/CustomInput/CustomInput';
import Link from 'next/link';
import { banklist } from "@/url/banklist";
import { verifyInternalWallet, verifyWallet, withdrawInternalWallet, withdrawWallet } from '@/url/api\'s/userProfile';
import { useSelector } from 'react-redux';
import { referredBalance } from '@/url/api\'s/organization';
import useCustomToast from '@/hooks/useCustomToast';
import { cashFormat } from '@/utils/cashformat';

export default function TransferModel({ onClose }: { onClose: any }) {

    const toast = useToast();
    const [showPassword, setShowPassword] = useState(true);
    const [data, setData] = useState({ "email": "", amount: 0 })
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<any>(null)
    const { user } = useSelector((a: { auth: any }) => a.auth)

    const [details, setDetails] = useState("");
    const router = useRouter();

    const [amount, setAmount] = useState(0)
    const showMessage = useCustomToast()

    async function Balance() {
        const result = await referredBalance()
        setAmount(result)
    }

    useEffect(() => {
        Balance()
    }, [])

    const validationSchema = Yup.object({
        email: Yup.string().required("Email/Phone is required"),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            setSubmitting(true);
            const data = values.email.includes("@") ? { "email": values.email } : { "phone": values.email }
            const result = await verifyInternalWallet(data)
            console.log(result, "result")
            // setDetails(result.data.account_name)
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        } finally {
            setSubmitting(false);
        }
    };


    const initiateVerification = async (
        values: any, setSubmitting: any
    ) => {
        try {
            setSubmitting(true);
            const data = values.email.includes("@") ? { "email": values.email } : { "phone": values.email }
            const result = await verifyInternalWallet(data)
            setSubmitting(false);
            setShowPassword(false)
            showMessage("Account successfully verified", "success")
            setUserId(result.data.id)
            setData(values)
            setDetails(result.data.firstName + "," + result.data.lastName)
        } catch (error: any) {
            setSubmitting(false);
            setDetails(error.response.data.message)
            setShowPassword(true)
        }
    };


    const initiateWithdrawVerifcation = async () => {
        try {
            setLoading(true);
            const result = await withdrawInternalWallet({ ...data, id: userId })
            showMessage("Transfer Successful", "success")
            setLoading(false);
        } catch (error: any) {
            showMessage(error.response.data.message || "Failed to withdraw", "error")
            setLoading(false);
        }
    };

    return (
        <Center flexDir="column" w="full">
            <Formik
                initialValues={data}
                onSubmit={initiateLogin}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, setSubmitting, setFieldValue, values }) => (
                    <Form style={{ width: "100%" }}>
                        <Box w="full" mt="20px">
                            <CustomInput
                                label="Email/Phone Number"
                                name="email"
                                placeholder="Enter Email"
                                fieldProps={{ type: "text" }}
                                typeInput=""
                                value=""
                            />
                            <Box color={showPassword ? "red" : "black"}>{details}</Box>
                        </Box> 
                            <Box w="full" mt="40px">
                                <CustomInput
                                    label="Amount"
                                    name="amount"
                                    placeholder="Enter Amount"
                                    fieldProps={{ type: "number" }}
                                    typeInput=""
                                    value=""
                                />
                            </Box>
                        
                        <Center mt="30px" flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]} justifyContent="space-between">
                            <Button
                                colorScheme="white"
                                bg={COLORS.white}
                                border="1px solid #DADFDB"
                                h="48px"
                                w={["full", "full", "full", "131px"]}
                                borderRadius="5px"
                                type="submit"
                                color={COLORS.grey}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            {showPassword ? <Button
                                colorScheme="blue"
                                bg={COLORS.blue}
                                isLoading={isSubmitting}
                                mb={["20px", "20px", "0px", "0px"]}
                                h="48px"
                                w={["full", "full", "full", "auto"]}
                                borderRadius="5px"
                                onClick={async () => await initiateVerification(values, setSubmitting)}
                                color={COLORS.white}
                            >
                                Verify
                            </Button> : <Button
                                colorScheme="blue"
                                bg={COLORS.blue}
                                isLoading={loading}
                                onClick={() => initiateWithdrawVerifcation()}
                                mb={["20px", "20px", "0px", "0px"]}
                                h="48px"
                                w={["full", "full", "full", "auto"]}
                                borderRadius="5px"
                                color={COLORS.white}
                            >
                                Transfer
                            </Button>}
                        </Center>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}