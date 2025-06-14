import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Box
} from '@chakra-ui/react';
import { cashFormat } from '@/utils/cashformat';
import CustomInput from '@/components/CustomInput/CustomInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import NormalPaymentFlutterwave from '@/template/payment/normalPayment';
import { useSelector } from 'react-redux';
import { COLORS } from '@/layout/Theme';

export default function SettingPlan() {

    const [amount, setAmount] = useState(0);
    const validationSchema = Yup.object({
        type: Yup.string()
            .required('Subscription is required'),
    })
    const { user } = useSelector((a: { auth: { user: any, setOnboarded: any } }) => a.auth)


    const handleSubmit = async (
        values: any,
        { setSubmitting, setFieldError }: any
    ) => {

        if (values.type === '1') {
            setAmount(5100);
        }
        else if (values.type === '2') {
            setAmount(15350);
        } else if (values.type === '3') {
            setAmount(25530);
        }
    };

    return (
        <>
            {amount && amount !== 0 ? <NormalPaymentFlutterwave id={user.email} user={user} amount={amount} setDisplay={setAmount} /> : ""}

            <Formik
                initialValues={{
                    type: "",
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, values, errors, touched }) => (

                    <Form>
                        <Box w='full' p="20px" mt='44px'>
                            <Box mb="50px">
                                Your Package <span style={{ color: COLORS.blue }}> {user.payment == 2 ? "Tier 1" : user.payment == 3 ? "Tier 2" : "Tier 3"}</span>
                            </Box>
                            <CustomInput
                                label='Subscription'
                                name='type'
                                type={"select"}
                                placeholder='Enter your subscription'
                                value={values.type}
                            >
                                <option value='1'>Tier 1 {"(" + cashFormat(5100) + " " + "percentage shares 5%" + ")"}</option>
                                <option value='2'>Tier 2 {"(" + cashFormat(15350) + " " + "percentage shares 10%" + ")"}</option>
                                <option value='3'>Tier 3 {"(" + cashFormat(25530) + " " + "percentage shares 15%" + ")"}</option>
                            </CustomInput>
                        </Box>
                        <Button type="submit" colorScheme="blue" mr={3}>
                            Submit
                        </Button>
                    </Form>

                )}
            </Formik>

        </>
    );
}
