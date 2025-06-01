import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/layout/utills/CustomInput';
import Link from 'next/link';
import { createAccountWallet } from '@/url/api\'s/userProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getWallet } from '@/redux/slices/userSlice';
import useCustomToast from '@/hooks/useCustomToast';

export default function CreateAccount({ onClose }: { onClose: any }) {

    const toast = useToast();
    const [data, setData] = useState({})
    const { user } = useSelector((a: { auth: any }) => a.auth);
    const dispatch = useDispatch()
    const showToast = useCustomToast();
    const router = useRouter();
    const validationSchema = Yup.object({
        bvn: Yup.string().required("BVN is required")
    });
    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            setSubmitting(true);
            console.log("start", "wallet")
            const result = await createAccountWallet({
                ...values, "last_name": user.last_name, first_name: user.first_name,
                "type": 6, user_id: user.officer_id, email: user.email_address
            })
            dispatch(getWallet(user.officer_id) as any)
            onClose()
            showToast("Account number successfully generated", 'success')
            setSubmitting(false)
        } catch (error: any) {
            showToast(error.response.data.message, "error")
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <Center flexDir="column" w="full">
            <Formik
                initialValues={data}
                onSubmit={initiateLogin}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box w={["280px", "280px", "280px", "384px"]} mt="30px">
                            <CustomInput
                                label="Bvn"
                                name="bvn"
                                placeholder="Enter Your BVN"
                                fieldProps={{ type: "text" }}
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
                                color={COLORS.grey}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="blue"
                                bg={COLORS.blue}
                                mb={["20px", "20px", "0px", "0px"]}
                                h="48px"
                                w={["full", "full", "full", "auto"]}
                                borderRadius="5px"
                                type="submit"
                                color={COLORS.white}
                            >
                                Create
                            </Button>
                        </Center>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}