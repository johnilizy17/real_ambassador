import { COLORS } from '@/layout/Theme';
import { Box, Button, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/layout/utills/CustomInput';
import Link from 'next/link';
import ROUTES from '@/utils/ROUTES';
import { getAccessToken } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { authResetPassword } from '@/redux/slices/auth/authSlice';

export default function ChangePassword({ onClose }: { onClose: any }) {

    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({})
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        Old_Password: Yup.string().required("Old Password is required"),
        password: Yup.string().required("New Password is required"),
    });
    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            const token = await getAccessToken()
            dispatch(authResetPassword({password:values.password, token: token})as any)
            toast({
                position: "top-right",
                description: "Password changed",
                status: "success",
                isClosable: true,
            });
            onClose()
            setSubmitting(true);
        } catch (error) {
            toast({
                position: "top-right",
                description: "error occur while changing password",
                status: "error",
                isClosable: true,
            });
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
                                label="Old Password"
                                name="Old_Password"
                                placeholder="Enter Old Password"
                                fieldProps={{ type: "password" }}
                                typeInput=""
                                value=""
                            />
                        </Box>
                        <Box w="full" mt="60px">
                            <CustomInput
                                label="New Password"
                                name="password"
                                placeholder="Enter New Password"
                                fieldProps={{ type: "password" }}
                                typeInput=""
                                value=""
                            />
                        </Box>
                        <Center mt="30px" flexDir={["column", "column", "column", "row"]} justifyContent="space-between">
                            <Button
                                colorScheme="white"
                                bg={COLORS.white}
                                mb={["20px", "20px", "0px", "0px"]}
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
                                isLoading={isSubmitting}
                                isDisabled={isSubmitting}
                                bg={COLORS.blue}
                                h="48px"
                                w={["full", "full", "full", "auto"]}
                                borderRadius="5px"
                                type="submit"
                                color={COLORS.white}
                            >
                                Change Password
                            </Button>
                        </Center>
                    </Form>
                )}
            </Formik>
        </Center>
    )
}