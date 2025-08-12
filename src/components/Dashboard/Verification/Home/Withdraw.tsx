import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/components/CustomInput/CustomInput';
import Link from 'next/link';
import { banklist } from "@/url/banklist";
import { verifyWallet, withdrawWallet } from '@/url/api\'s/userProfile';
import { useSelector } from 'react-redux';
import { referredBalance } from '@/url/api\'s/organization';
import useCustomToast from '@/hooks/useCustomToast';
import { cashFormat } from '@/utils/cashformat';

export default function Withdraw({ onClose }: { onClose: any }) {

    const toast = useToast();
    const [showPassword, setShowPassword] = useState(true);
    const [data, setData] = useState({ "account_number": "", "account_bank": "" })
    const [loading, setLoading] = useState(false)
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
        account_number: Yup.string().required("Account Number is required"),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            setSubmitting(true);
        } catch (error) {
        } finally {
            setSubmitting(false);
        }
    };


    const initiateVerification = async (
        values: any, setSubmitting: any
    ) => {
        try {
            setSubmitting(true);
            const result = await verifyWallet({ ...values, account_bank: banklist[values.account_bank].code })
            setData({ ...values, account_bank: banklist[values.account_bank].bank_code })
            setDetails(result.data.account_name)
            setSubmitting(false);
            setShowPassword(false)
        } catch (error: any) {
            setSubmitting(false);
            setDetails("Incorrect account")
            setShowPassword(true)
        }
    };


    const initiateWithdrawVerifcation = async () => {
        try {
            setLoading(true);
            
            const result = await withdrawWallet(data)
            showMessage("Withdrawal Successful", "success")
            setLoading(false);
        } catch (error: any) {
            showMessage("Failed to withdraw", "error")
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
                    <Form>
                        <p style={{ color: "red", fontSize: 12 }}>Kindly note your will be charged {cashFormat(100)} for withdrawal of {cashFormat(amount)}</p>
                        <Box w={["280px", "280px", "280px", "384px"]} mt="30px">
                            <CustomInput
                                label="Select Bank"
                                name="account_bank"
                                placeholder="Enter Bank name"
                                fieldProps={{ type: "select" }}
                                typeInput=""
                                type="select"
                                handleChange={(val: any) => setFieldValue('account_bank', val)}
                                value={values.account_bank}
                            >
                                <option value={""}>Select Bank</option>
                                {banklist.map((a, b) => (
                                    <option key={b} value={b}>{a.name}</option>
                                ))}
                            </CustomInput>
                        </Box>
                        <Box w="full" mt="60px">
                            <CustomInput
                                label="Account"
                                name="account_number"
                                placeholder="Enter Account"
                                fieldProps={{ type: "text" }}
                                typeInput=""
                                value=""
                            />
                            <Box color={showPassword ? "red" : "black"}>{details}</Box>
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
                                Withdraw
                            </Button>}
                        </Center>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}