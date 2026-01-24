import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    VStack,
    HStack,
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
                            <VStack spacing="4">
                                <Box w='full' mt="44px">
                                    <CustomInput
                                        label='Email'
                                        name='email'
                                        placeholder='example@gmail.com'
                                        fieldProps={{ type: 'email' }}
                                    />
                                </Box>
                                <Box w='full' mt="44px">
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
                            </VStack>

                            <HStack justify="flex-end" spacing="4" pt="4">
                                <Button
                                    variant="ghost"
                                    isDisabled={isSubmitting}
                                    onClick={() => setPage(page - 1)}
                                    borderRadius="lg"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    bg="#0047AB"
                                    color="white"
                                    _hover={{ bg: "#003580" }}
                                    borderRadius="lg"
                                    px="8"
                                    isLoading={isSubmitting}
                                >
                                    Next
                                </Button>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
