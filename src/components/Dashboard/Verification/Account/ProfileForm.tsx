import { COLORS } from '@/layout/Theme';
import { Box, Button, Card, Center, Flex, FormLabel, Img, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from '@/layout/utills/CustomInput';
import Link from 'next/link';

export default function ProfileForm() {

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
        <Card w={["full", "full", "full", "429px"]}  mr={["0px","0px","0px","16px"]} mb="20px" borderRadius="10px" mt="20px" p="20px" flexDir="column">
            <Box pos="relative" >
                <Box>
                    <Box fontWeight="700" fontSize="20px" color={COLORS.black} >Personal  details</Box>
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
                                    label="Full Name"
                                    name="fullname"
                                    placeholder="Enter name"
                                    fieldProps={{ type: "text" }}
                                    typeInput=""
                                    value=""
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="Date of Birth"
                                    name="dot"
                                    placeholder=""
                                    fieldProps={{ type: "date" }}
                                    typeInput=""
                                    value=""
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="Marital Status"
                                    name="marital"
                                    typeInput=""
                                    value=""
                                    placeholder="Select Option"
                                    fieldProps={{ type: "select" }}
                                    type="select"
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
                            <Box w="full" mt="44px">
                                <CustomInput
                                    label="Employment  Status"
                                    name="employment"
                                    typeInput=""
                                    value=""
                                    placeholder="Select Option"
                                    fieldProps={{ type: "select" }}
                                    type="select"
                                    showPassword={showPassword}
                                    onChangeShowPassword={setShowPassword}
                                />
                            </Box>
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