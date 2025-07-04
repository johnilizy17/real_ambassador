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

export default function StepFour({ data, page, setPage, setData }: any) {
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const router = useRouter();

    // Adjust validation schema based on userType
    const validationSchema = Yup.object({
        plan: Yup.string().required('Plan is required'),
        type: Yup.string().required('Type is required')
    });

    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Include the role_id based on userType
            const type = values.type === "instant" ? 1 : values.type === "" ? 365 : values.duration
            setData({ ...data, ...values, phone: phoneNumber, duration: type });
            setPage(5);
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
                    {({ isSubmitting, handleChange, values }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Select Your Plan'
                                        name='plan'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        value=''
                                    >
                                        <>
                                            <option value={""}>Select Name</option>
                                            {UsersPlan.map((a: { name: string, total: number }, b: number) => (<option value={b}>{a.name}</option>))}
                                        </>
                                    </CustomInput>
                                </Box>
                                {values.type != "instant" && <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Plan Duration'
                                        name='duration'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        value=''
                                    >
                                        <>
                                            <option value={""}>Select Duration</option>
                                            <option value={365}>365 DAYS</option>
                                            <option value={548}>548 DAYS</option>
                                            <option value={730}>730 DAYS</option>
                                        </>
                                    </CustomInput>
                                </Box>}
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Plan Duration'
                                        name='type'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        value=''
                                    >
                                        <>
                                            <option value={""}>Select Interval</option>
                                            <option value={"instant"}>Instant</option>
                                            <option value={"daily"}>Daily</option>
                                            <option value={"weekly"}>Weekly</option>
                                            <option value={"monthly"}>Monthly</option>
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
