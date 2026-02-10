import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    VStack,
    HStack,
    Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';

export default function StepTwo({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting }: any
    ) => {
        try {
            setData({ ...data, ...values, phone: phoneNumber });
            setPage(3);
            setSubmitting(true);
        } catch (error: any) {
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box w="full">
            <Formik
                initialValues={data}
                onSubmit={initiateLogin}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <VStack spacing="5" align="stretch">
                            <Box w='full'>
                                <CustomInput
                                    label='Email'
                                    name='email'
                                    placeholder='example@gmail.com'
                                    fieldProps={{ type: 'email' }}
                                />
                            </Box>
                            <Box w='full'>
                                <CustomInput
                                    label='Phone Number'
                                    name='phone'
                                    type='phone'
                                    value={phoneNumber}
                                    handleChange={setPhoneNumber}
                                    placeholder='Enter phone number'
                                    fieldProps={{ type: 'phone' }}
                                />
                            </Box>

                            <Flex justify="space-between" align="center" mt={10} gap={4}>
                                <Button
                                    flex={["1", "none"]}
                                    variant="outline"
                                    isDisabled={isSubmitting}
                                    onClick={() => setPage(page - 1)}
                                    borderRadius="xl"
                                    h="50px"
                                    px={8}
                                >
                                    Back
                                </Button>
                                <Button
                                    flex={["2", "none"]}
                                    bg="#0047AB"
                                    color="white"
                                    _hover={{ bg: "#003580" }}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                    borderRadius="xl"
                                    h="50px"
                                    px={12}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
