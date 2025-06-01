import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/layout/utills/CustomInput';
import Link from 'next/link';

export default function AccountBank({ onClose }: { onClose: any }) {

    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({})
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Kindly provide a valid email address")
            .required("Email address is required"),
        password: Yup.string().required("Password is required"),
        phone: Yup.string().required("phone is required"),
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
                                label="Select Bank"
                                name="bank"
                                placeholder="Enter Select Bank"
                                fieldProps={{ type: "text" }}
                                typeInput=""
                                value=""
                               />
                        </Box>
                        <Box w="full" mt="60px">
                            <CustomInput
                                label="Account Number"
                                name="account"
                                placeholder="Enter Account Number"
                                fieldProps={{ type: "number" }}
                                typeInput=""
                                value=""
                               />
                        </Box>
                        <Center mt="30px" flexDir={["column-reverse","column-reverse","column-reverse","row"]} justifyContent="space-between">
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
                            <Button
                                colorScheme="blue"
                                bg={COLORS.blue}
                                mb={["20px","20px","0px","0px"]}
                                h="48px"
                                w={["full", "full", "full", "auto"]}
                                borderRadius="5px"
                                type="submit"
                                color={COLORS.white}
                                onClick={() => router.push("/auth/otp")}
                            >
                                Add Account
                            </Button>
                        </Center>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}