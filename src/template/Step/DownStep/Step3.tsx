import { COLORS } from '@/utils/Theme';
import {
    Box,
    Button,
    VStack,
    HStack,
    Flex,
    Text,
    Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cashFormat } from '@/utils/cashformat';
import { RegisterReferral } from '@/url/api\'s/userProfile';
import useCustomToast from '@/hooks/useCustomToast';
import ReferralPaymentFlutterwave from '@/template/payment/referralPayment';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function StepThree({ data, VerificationApi, page, disable, setPage, setData, onClose }: any) {
    const [amount, setAmount] = useState(0);
    const showMassage = useCustomToast()

    function refreshData() {
        VerificationApi()
        onClose()
    }

    const initiateLogin = async (
        values: any,
        { setSubmitting }: any
    ) => {
        try {
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

                // referralcode is the key requested by the user
                const payload = {
                    ...data,
                    phone: phoneNumber,
                    role: "USERAMBASSADOR",
                    referralcode: data.referralcode || "" // Assuming this might be available or not
                };

                await RegisterReferral(payload);

                if (data.accountTypeFee > 0) {
                    setAmount(data.accountTypeFee);
                    showMassage('Account created! Proceeding to payment', 'info');
                } else {
                    showMassage('Account successfully created', 'success');
                    refreshData();
                }
            } else {
                refreshData();
            }

            setSubmitting(true);
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
                initialValues={{}}
                onSubmit={initiateLogin}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <VStack spacing="6" align="stretch">
                            <Box
                                p={6}
                                borderRadius="2xl"
                                bg="blue.50"
                                border="1px solid"
                                borderColor="blue.100"
                            >
                                <VStack align="start" spacing={4}>
                                    <HStack spacing={3}>
                                        <Icon as={CheckCircle2} color="blue.500" boxSize={5} />
                                        <Text fontWeight="800" color="gray.900">Registration Summary</Text>
                                    </HStack>

                                    <VStack align="stretch" spacing={2} w="full">
                                        <Flex justify="space-between">
                                            <Text fontSize="sm" color="gray.600">Account Type</Text>
                                            <Text fontSize="sm" fontWeight="800" color="gray.900" textTransform="capitalize">
                                                {data.accountType || 'N/A'}
                                            </Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontSize="sm" color="gray.600">Email Address</Text>
                                            <Text fontSize="sm" fontWeight="800" color="gray.900">{data.email}</Text>
                                        </Flex>
                                        <Box h="1px" bg="blue.100" my={2} />
                                        <Flex justify="space-between">
                                            <Text fontSize="md" fontWeight="800" color="gray.900">Total Due</Text>
                                            <Text fontSize="md" fontWeight="900" color="blue.600">
                                                {data.accountTypeFee === 0 ? 'FREE' : cashFormat(data.accountTypeFee)}
                                            </Text>
                                        </Flex>
                                    </VStack>
                                </VStack>
                            </Box>

                            <HStack p={4} bg="orange.50" borderRadius="xl" spacing={3} border="1px solid" borderColor="orange.100">
                                <Icon as={AlertCircle} color="orange.500" />
                                <Text fontSize="xs" color="orange.800" fontWeight="600">
                                    {data.accountTypeFee > 0
                                        ? "You'll be redirected to complete payment after clicking finish."
                                        : "Click finish to complete the registration process."}
                                </Text>
                            </HStack>

                            <Flex justify="space-between" align="center" mt={4} gap={4}>
                                <Button
                                    flex={["1", "none"]}
                                    variant="outline"
                                    isDisabled={isSubmitting}
                                    onClick={() => setPage(3)}
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
                                    fontWeight="bold"
                                >
                                    {data.accountTypeFee > 0 ? "Pay & Finish" : "Finish"}
                                </Button>
                            </Flex>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
