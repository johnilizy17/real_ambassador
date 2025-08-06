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
import { UsersPlan } from '@/utils/constants';
import { cashFormat } from '@/utils/cashformat';

export const runtime = 'edge';

export default function StepStarter({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const router = useRouter();

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        kind: Yup.string().required('Kindly choose the type of account you want to create')
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Include the role_id based on userType
            setData({ ...data, ...values });
            setPage(1);
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
                    {({ isSubmitting, handleChange, values, setFieldValue }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box>
                                    Choose the kind of account you want to open for your customer.
                                    <li>selecting email and phone will use email has a primary form of communication</li>
                                    <li>selecting phone number will use phone number has a primary form of communication</li>
                                </Box>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Account Type'
                                        name='kind'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        handleChange={(val: any) => setFieldValue('kind', val)}
                                        value={values.kind}
                                        type='select'
                                    >
                                        <option value={""}>Select Account Type</option>
                                        <option value={"1"}>Email and Phone Number</option>
                                        <option value={"2"}>Phone number only <span style={{ fontSize: "9px", color: "red" }}>note a fee of 4 naira will be charged for sms</span></option>
                                    </CustomInput>
                                </Box>
                                <Button mr={3} mt={8} colorScheme='bllue' bg={COLORS.blue} disabled={page > 1.2 ? false : true} onClick={() => setPage(page - 1)}>
                                    Back
                                </Button>
                                <Button isLoading={isSubmitting} isDisabled={isSubmitting} mt={8} colorScheme='green' type={"submit"}>
                                    Next
                                </Button>
                            </>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Center>
    );
}
