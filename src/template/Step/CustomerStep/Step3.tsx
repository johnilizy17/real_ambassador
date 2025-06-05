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

export const runtime = 'edge';

export default function StepThree({ data, page, setPage, setData, onClose }: any) {

    const router = useRouter();
    const [amount, setAmount] = useState(0);

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        type: Yup.string().required('Type is required'),
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Include the role_id based on userType
            setData({ ...values });
            if (values.type === '1') {
                setAmount(5000);
            }
            else if (values.type === '2') {
                setAmount(20000);
            } else if (values.type === '3') {
                setAmount(35000);
            }
            onClose(false)
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
                {amount && amount !== 0 ? <NormalPaymentFlutterwave id={data.email} user={data} amount={amount} setDisplay={setAmount} /> : ""}

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

                                <Button mr={3} mt={8} colorScheme='bllue' bg={COLORS.blue} disabled={page > 1.2 ? false : true} onClick={() => setPage(page - 1)}>
                                    Back
                                </Button>
                                <Button mt={8} colorScheme='green' type={"submit"}>
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
