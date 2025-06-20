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
import ReferralPaymentFlutterwave from '@/template/payment/referralPayment';

export const runtime = 'edge';

export default function StepFive({ data, page, setPage, setData, onClose }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const [amount2, setAmount2] = useState(0);
    const router = useRouter();

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        notification: Yup.string().required('notification is required'),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            setAmount2(amountResult)
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
        return result * amount
    }

    return (
        <Center flexDir='column'>
            {amount2 && amount2 !== 0 ? <ReferralPaymentFlutterwave id={data.email} user={data} amount={amount2} setDisplay={setAmount2} onClose={() => onClose()} /> : ""}
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
                                        label='Form of notification'
                                        name='notification'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        value=''
                                    >
                                        <>
                                            <option value={1}>Email</option>
                                            <option value={2}>SMS</option>
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
