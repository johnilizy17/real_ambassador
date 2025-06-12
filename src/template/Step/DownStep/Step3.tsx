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

export default function StepThree({ data, VerificationApi, page, setPage, setData, onClose }: any) {

    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const showMassage = useCustomToast()

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        type: Yup.string().required('Type is required'),
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
            setData({ ...data, ...values });
            await RegisterReferral({ ...data, phone: phoneNumber, ...values, role: "USERAMBASSADOR" })
            // Include the role_id based on userType
            showMassage('Account successfully created', 'info');
           if (values.type === '1') {
                setAmount(5000);
            }
            else if (values.type === '2') {
                setAmount(15000);
            } else if (values.type === '3') {
                setAmount(25000);
            }
            onClose(false)
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
                {amount && amount !== 0 ? <ReferralPaymentFlutterwave id={data.email} user={data} amount={amount} setDisplay={setAmount} onClose={refreshData} /> : ""}

                <Formik
                    initialValues={{ type: "" }}
                    onSubmit={initiateLogin}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting, handleChange, values }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Subscription'
                                        name='type'
                                        type={"select"}
                                        placeholder='Enter your subscription'
                                        value={values.type}
                                    >
                                        <option value='1'>Tier 2 {"(" + cashFormat(5000) + " " + "percentage shares 5%" + ")"}</option>
                                        <option value='2'>Tier 1 {"(" + cashFormat(15000) + " " + "percentage shares 10%" + ")"}</option>
                                        <option value='3'>Tier 3 {"(" + cashFormat(25000) + " " + "percentage shares 15%" + ")"}</option>
                                    </CustomInput>
                                </Box>

                                <Button mr={3} mt={8} colorScheme='blue' bg={COLORS.blue} disabled={page > 1.2 ? false : true} onClick={() => setPage(page - 1)}>
                                    Back
                                </Button>
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
