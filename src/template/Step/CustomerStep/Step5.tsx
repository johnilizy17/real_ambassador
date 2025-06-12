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

export default function StepFive({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const router = useRouter();

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        payment: Yup.string().required('Plan is required'),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Include the role_id based on userType
            setData({ ...data, ...values, phone: phoneNumber, });
            setPage(5);
            setSubmitting(true);
        } catch (error: any) {
        } finally {
            setSubmitting(false);
        }
    };

    const amountResult = () => {
        const amount = data.duration === 356 ? UsersPlan[data.plan][356] :
            data.duration === 546 ? UsersPlan[data.plan][546] :
                UsersPlan[data.plan][730]

        const result = data.type === "daily" ? 1 : data.type === "weekly" ? 7 : 30
        return result*amount
    }

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
                                <p>
                                    You are subscribing to {UsersPlan[data.plan].name} which is for {data.duration} days and you will be charge {cashFormat(amountResult())} every {data.type}
                                </p>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Do you want to be automatically Charged'
                                        name='duration'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        value=''
                                    >
                                        <>
                                            <option value={1}>Yes</option>
                                            <option value={2}>No</option>
                                        </>
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
