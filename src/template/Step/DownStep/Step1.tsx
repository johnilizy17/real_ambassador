import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    VStack,
    HStack,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';

export default function StepOne({ data, page, setPage, setData }: any) {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        birth_date: Yup.string().required('Date of Birth is required'),
        lastName: Yup.string().required('Last name is required')
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting }: any
    ) => {
        try {
            setData({ ...data, ...values });
            setPage(2);
            setSubmitting(true);
        } catch (error) {
            console.log(error);
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
                                        label='First Name'
                                        name='firstName'
                                        placeholder='Enter First Name'
                                        fieldProps={{ type: 'text' }}
                                    />
                                </Box>
                                <Box w='full' mt="44px">
                                    <CustomInput
                                        label='Last Name (Surname)'
                                        name='lastName'
                                        placeholder='Enter Last Name'
                                        fieldProps={{ type: 'text' }}
                                    />
                                </Box>
                                <Box w='full' mt="44px">
                                    <CustomInput
                                        label='Date of Birth'
                                        name='birth_date'
                                        placeholder='Select Date'
                                        fieldProps={{ type: 'date' }}
                                    />
                                </Box>
                            </VStack>

                            <HStack justify="flex-end" spacing="4" pt="4">
                                <Button
                                    variant="ghost"
                                    isDisabled={page === 1}
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
