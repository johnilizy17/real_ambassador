import { COLORS } from '@/layout/Theme';
import { Box, Button, Card, Center, Flex, FormLabel, IconButton, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/layout/utills/CustomInput';
import Link from 'next/link';

export default function DocumentForm() {

    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({})
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Kindly provide a valid email address")
            .required("Email address is required"),
        fullname: Yup.string().required("Password is required"),
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
        <Card w={["full", "full", "full", "429px"]} mb="20px" mr={["0px","0px","0px","16px"]} borderRadius="10px" mt="20px" p="20px" flexDir="column">
            <Box pos="relative" >
                <Box>
                    <Box fontWeight="700" fontSize="20px" color={COLORS.black} >Documents</Box>
                </Box>
                <Formik
                    initialValues={data}
                    onSubmit={initiateLogin}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="Physical Address"
                                    name="fullname"
                                    placeholder="18721, Millenium Estate,Ojokoro, Ifo LGA, Ogun State"
                                    fieldProps={{ type: "text" }}
                                    typeInput=""
                                    value=""
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="State"
                                    name="dot"
                                    placeholder="Lagos"
                                    fieldProps={{ type: "text" }}
                                    typeInput=""
                                    value=""
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="LGA"
                                    name="marital"
                                    typeInput=""
                                    value=""
                                    placeholder="KOSOFE"
                                    fieldProps={{ type: "text" }}
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Flex justifyContent="space-between" w="full" mt="5px" mb="44px">
                                <Box  fontWeight="600" fontSize={["14px", "14px", "14px", "16px"]} color={COLORS.black}>
                                    Snap House Image
                                </Box>
                                <IconButton aria-label=''>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.2087 15.0417C18.2087 15.4616 18.0418 15.8643 17.7449 16.1613C17.448 16.4582 17.0453 16.625 16.6253 16.625H2.37533C1.9554 16.625 1.55267 16.4582 1.25574 16.1613C0.958807 15.8643 0.791992 15.4616 0.791992 15.0417V6.33333C0.791992 5.91341 0.958807 5.51068 1.25574 5.21375C1.55267 4.91681 1.9554 4.75 2.37533 4.75H5.54199L7.12533 2.375H11.8753L13.4587 4.75H16.6253C17.0453 4.75 17.448 4.91681 17.7449 5.21375C18.0418 5.51068 18.2087 5.91341 18.2087 6.33333V15.0417Z" stroke="#2766AD" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.49967 13.4583C11.2486 13.4583 12.6663 12.0406 12.6663 10.2917C12.6663 8.54276 11.2486 7.125 9.49967 7.125C7.75077 7.125 6.33301 8.54276 6.33301 10.2917C6.33301 12.0406 7.75077 13.4583 9.49967 13.4583Z" stroke="#2766AD" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </IconButton>
                            </Flex>
                            <Box
                                w="full"
                                mt="20px"
                            >
                                <Button
                                    colorScheme="blue"
                                    bg={COLORS.blue}
                                    h="36px"
                                    w="56.6px"
                                    borderRadius="5px"
                                    type="submit"
                                    color={COLORS.white}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>

        </Card>
    )
}