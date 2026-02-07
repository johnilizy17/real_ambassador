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
import useCustomToast from '@/hooks/useCustomToast';
import { generateShortUUID } from '@/utils/constants';

export const runtime = 'edge';

export default function StepTwo({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const router = useRouter();
    const toast = useCustomToast()

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
            if (phoneNumber && phoneNumber.length > 0.1) {
                const email = values.kind === "2" ? values.lastName + generateShortUUID() + "@abn.com.ng" : values.email
                // Include the role_id based on userType

                setData({ ...data, ...values, phone: phoneNumber, email: email });
                setPage(3);
            } else {
                toast("Please fill in your phone number", "warning")
            }
            setSubmitting(true);
        } catch (error: any) {
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
                    {({ isSubmitting, values, handleChange }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                {values.kind === "1" && <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Email'
                                        name='email'
                                        placeholder='example@gmail.com'
                                        fieldProps={{ type: 'email' }}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>}
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Phone Number'
                                        name='phone'
                                        typeInput=''
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
                                        isDisabled={false}
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
                            </>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Center>
    );
}
