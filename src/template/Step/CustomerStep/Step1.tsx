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
                            <Button mr={3} mt={8} colorScheme='blue' bg={COLORS.blue} disabled={page > 1.2 ? false : true} onClick={() => setPage(page - 1)}>
                                Back
                            </Button>
                            <Button mt={8} colorScheme='green' type={"submit"}>
                                Next
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Center>
    );
}
