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

export default function RegistrationPopUp({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: any, onClose: any }) {


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
            setAmount(5000);
        }
        else if (values.type === '2') {
            setAmount(15000);
        } else if (values.type === '3') {
            setAmount(25000);
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

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalContent>
                            <ModalHeader>Complete Registeration</ModalHeader>
                            <ModalBody>
                                Complete your registeration payment
                            </ModalBody>
                            <Form>
                                <Box w='full' p="20px" mt='44px'>
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
                                <ModalFooter>
                                    <Button type="submit" colorScheme="blue" mr={3}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </Form>

                        </ModalContent>
                    </Modal>
                )}
            </Formik>

        </>
    );
}
