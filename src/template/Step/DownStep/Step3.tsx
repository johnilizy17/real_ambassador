import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    VStack,
    HStack,
    Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';
import { cashFormat } from '@/utils/cashformat';
import { RegisterReferral } from '@/url/api\'s/userProfile';
import useCustomToast from '@/hooks/useCustomToast';
import ReferralPaymentFlutterwave from '@/template/payment/referralPayment';

export default function StepThree({ data, VerificationApi, page, disable, setPage, setData, onClose }: any) {
    const [amount, setAmount] = useState(0);
    const showMassage = useCustomToast()

    const validationSchema = Yup.object({
        type: Yup.string().required('Subscription tier is required'),
    });

    function refreshData() {
        VerificationApi()
        onClose()
    }

    const initiateLogin = async (
        values: any,
        { setSubmitting }: any
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
                await RegisterReferral({ ...data, phone: phoneNumber, ...values, role: "USERAMBASSADOR" })
                showMassage('Account successfully created', 'info');
            }

            if (values.type === '1') setAmount(5000);
            else if (values.type === '2') setAmount(15000);
            else if (values.type === '3') setAmount(50000);

            setSubmitting(true);
            VerificationApi()
        } catch (error: any) {
            showMassage(error.response?.data?.message || "Failed to create account", "error")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box w="full">
            {amount && amount !== 0 ? <ReferralPaymentFlutterwave id={data.email} user={data} amount={amount} setDisplay={setAmount} onClose={refreshData} /> : ""}

            <Formik
                initialValues={{ type: "" }}
                onSubmit={initiateLogin}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <VStack spacing="5" align="stretch">
                            <Box w='full' mt="44px">
                                <CustomInput
                                    label='Select Subscription Tier'
                                    name='type'
                                    type={"select"}
                                    placeholder='Choose a tier'
                                    handleChange={(val: any) => setFieldValue('type', val)}
                                    value={values.type}
                                >
                                    <option value='1'>Tier 1 - {cashFormat(5000)} (5% Commission)</option>
                                    <option value='2'>Tier 2 - {cashFormat(15000)} (10% Commission)</option>
                                    <option value='3'>Tier 3 - {cashFormat(50000)} (15% Commission)</option>
                                </CustomInput>
                            </Box>

                            <Flex justify="space-between" align="center" mt={10} gap={4}>
                                <Button
                                    flex={["1", "none"]}
                                    variant="outline"
                                    isDisabled={isSubmitting}
                                    onClick={() => setPage(page - 1)}
                                    borderRadius="xl"
                                    h="50px"
                                    px={8}
                                >
                                    Back
                                </Button>
                                <Button
                                    flex={["2", "none"]}
                                    bg="#0047AB"
                                    color="white"
                                    _hover={{ bg: "#003580" }}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                    borderRadius="xl"
                                    h="50px"
                                    px={12}
                                >
                                    Finish
                                </Button>
                            </Flex>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
