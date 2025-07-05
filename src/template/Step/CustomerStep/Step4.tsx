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

    const amountResult = (DataCount: any) => {
        const amount = DataCount.duration === 365 ? UsersPlan[DataCount.plan][365] : DataCount.duration === 548 ? UsersPlan[DataCount.plan][548] : UsersPlan[DataCount.plan][730]
        if (DataCount.type === "instant") {
            return [UsersPlan[DataCount.plan].total, UsersPlan[DataCount.plan].total]
        } else {
            const result = DataCount.type === "daily" ? 1 : DataCount.type === "weekly" ? 7 : 30
            return [result * amount, DataCount.duration * amount]
        }
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
                    {({ isSubmitting, handleChange, values, setFieldValue }) => (
                        <Form>
                            {/* Conditionally render name fields based on userType */}

                            <>
                                <Box>
                                    {values.type != "instant" && values.type != "" && <Box>Total Amount:{cashFormat(amountResult(values)[1])}</Box>}
                                    <Box>Amount Paid {values.type === "instant" ? "Once" : values.type != "daily" ? "Daily" : values.type != "weekly" ? "Weekly" : "Moneys"}:{values.type != "" && values.duration != "" && (values.plan != "" || values.plan === 0 ) ? cashFormat(amountResult(values)[0]) : "Please select your plan"}</Box>
                                </Box>
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Select Your Plan'
                                        name='plan'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        handleChange={(val: any) => setFieldValue('plan', (val - 1))}
                                        value={values.plan + 1}
                                    >
                                        <option value={""}>Select Your Plan</option>
                                        {UsersPlan.map((a: { name: string, total: number }, b: number) => (<option value={b + 1}>{a.name}</option>))}
                                    </CustomInput>
                                </Box>
                                {values.type != "instant" && <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Plan Duration'
                                        name='duration'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        handleChange={(val) => setFieldValue('duration', val)}
                                        value={values.duration}
                                    >
                                        <option value={""}>Select Duration</option>
                                        <option value={365}>365 DAYS</option>
                                        <option value={548}>548 DAYS</option>
                                        <option value={730}>730 DAYS</option>
                                    </CustomInput>
                                </Box>}
                                <Box w='full' mt='44px'>
                                    <CustomInput
                                        label='Plan Duration'
                                        name='type'
                                        fieldProps={{ type: 'select' }}
                                        typeInput=''
                                        type='select'
                                        handleChange={(val) => setFieldValue('type', val)}
                                        value={values.type}
                                    >
                                        <option value={""}>Select Interval</option>
                                        <option value={"instant"}>Instant</option>
                                        <option value={"daily"}>Daily</option>
                                        <option value={"weekly"}>Weekly</option>
                                        <option value={"monthly"}>Monthly</option>
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
