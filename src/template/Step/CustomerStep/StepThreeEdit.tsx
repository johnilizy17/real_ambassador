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
import { cashFormat } from '@/utils/cashformat';
import NormalPaymentFlutterwave from '@/template/payment/normalPayment';
import { RegisterReferral } from '@/url/api\'s/userProfile';
import useCustomToast from '@/hooks/useCustomToast';
import ReferralPaymentFlutterwave from '@/template/payment/referralPayment';

export const runtime = 'edge';

export default function StepThreeEdit({ data, VerificationApi, disable, page, setPage, setData, onClose }: any) {

    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const showMassage = useCustomToast()

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
    });

    function refreshData() {
        VerificationApi()
        onClose()
    }

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            setData({ ...data, ...values });
            if (!disable) {
                let phoneNumber = data.phone;
                if (
                    phoneNumber &&
                    (phoneNumber.startsWith('+') || phoneNumber.startsWith('0'))
                ) {
                    phoneNumber = phoneNumber.slice(1);
                }

                if (!phoneNumber) {
                    showMassage('Please enter a proper phone number', 'warning');
                    return;
                }

                await RegisterReferral({ ...data, phone: phoneNumber, ...values, role: "USER" })
                // Include the role_id based on userType
                showMassage('Account successfully created', 'info');
            }
            setAmount(5000);
            setSubmitting(true);
            VerificationApi()
        } catch (error: any) {
            showMassage(error.response.data.message, "error")
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
                {amount && amount !== 0 ? <ReferralPaymentFlutterwave id={data.email} user={data} amount={amount} setDisplay={setAmount} onClose={() => setPage(4)} /> : ""}

                <Formik
                    initialValues={{ type: "" }}
                    onSubmit={initiateLogin}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, handleChange, values }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box color={COLORS.gray}>
                                    <p>
                                        Registeration fee for saving small is {cashFormat(5000)}
                                    </p>
                                </Box>
                                <Button mt={8} colorScheme='green' isLoading={isSubmitting} isDisabled={isSubmitting} type={"submit"}>
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
