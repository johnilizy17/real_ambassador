import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    Center,
    Flex,
    Img,
    ModalFooter,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';

export const runtime = 'edge';

export default function StepOne({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState();
    const router = useRouter();

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        birth_date: Yup.string().required('Date of Birth is required'),
        lastName: Yup.string().required('Last name is required')
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Include the role_id based on userType
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
        <Center flexDir='column'>
            <Box
                paddingLeft={['10px']}
                w="full"
                paddingRight={['10px']}
                pos='relative'
            >
                <Formik
                    initialValues={data}
                    onSubmit={initiateLogin}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, handleChange }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='First Name'
                                        name='firstName'
                                        placeholder='Enter First Name'
                                        fieldProps={{ type: 'text' }}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Last Name (Surname)'
                                        name='lastName'
                                        placeholder='Enter Last Name'
                                        fieldProps={{ type: 'text' }}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>
                            </>
                            <Box w='full' mt='44px'>
                                <CustomInput
                                    label='Date of Birth'
                                    name='birth_date'
                                    placeholder='2/20/2024'
                                    fieldProps={{ type: 'date' }}
                                    typeInput=''
                                    value=''
                                />
                            </Box>
                            <Flex justify="space-between" align="center" mt={10} gap={4}>
                                <Button
                                    flex={["1", "none"]}
                                    variant="outline"
                                    isDisabled={page === 0}
                                    onClick={() => setPage(page - 1)}
                                    borderRadius="xl"
                                    h="50px"
                                    px={8}
                                >
                                    Back
                                </Button>
                                <Button
                                    flex={["2", "none"]}
                                    colorScheme='blue'
                                    bg={COLORS.blue}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                    borderRadius="xl"
                                    h="50px"
                                    px={12}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Center>
    );
}
