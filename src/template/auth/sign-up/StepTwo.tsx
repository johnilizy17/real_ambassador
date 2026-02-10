import { COLORS } from '@/utils/Theme';
import {
  Box,
  Button,
  Center,
  Flex,
  Checkbox,
  Img,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';
import Link from 'next/link';
import { authRegister } from '@/redux/slices/auth/authSlice';
import ROUTES from '@/utils/ROUTES';
import useCustomToast from '@/hooks/useCustomToast';
import { useAppDispatch } from '@/redux/store/store';
import { cashFormat } from '@/utils/cashformat';
import NormalPaymentFlutterwave from '@/template/payment/normalPayment';

interface SignUpForm2Props {
  setPage: (page: number) => void;
  user?: string | string[];
  data: {
    phone_number: string;
    phone: string;
    accountType: string;
    accountTypeFee: number;
    [key: string]: any;
  };
}

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  acceptedTerms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

export default function StepTwo({ setPage, user, data }: SignUpForm2Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const showToast = useCustomToast();
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      if (values.password !== values.confirm_password) {
        setFieldError('confirm_password', 'Passwords do not match');
        return;
      }

      let phoneNumber = values.phone;
      if (
        phoneNumber &&
        (phoneNumber.startsWith('+') || phoneNumber.startsWith('0'))
      ) {
        phoneNumber = phoneNumber.slice(1);
      }

      if (!phoneNumber) {
        showToast('Please enter a proper phone number', 'warning');
        return;
      }

      const formData = { ...data, ...values, phone_number: phoneNumber };
      delete formData.confirm_password;
      delete formData.acceptedTerms;

      await dispatch(authRegister(formData) as any).unwrap();

      if (data.accountTypeFee > 0) {
        setAmount(data.accountTypeFee);
        showToast('Account created! Proceeding to payment...', 'success');
      } else {
        showToast('Registration successful!', 'success');
        router.push(ROUTES.login);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center flexDir='column'>
      {amount && amount !== 0 ? <NormalPaymentFlutterwave id={data.email} user={data} amount={amount} setDisplay={setAmount} /> : ""}
      <Img
        w='200px'
        src="/logo/logo_blue.png"
        mb='30px'
        display={['flex', 'flex', 'flex', 'none']}
      />
      <Box
        w={['320px', '429px']}
        paddingLeft={['10px', '50px']}
        paddingRight={['10px', '50px']}
        pos='relative'
      >
        <Center
          w='100px'
          h='37px'
          fontSize='14px'
          borderRadius='34px'
          color={COLORS.grey}
          fontWeight='800'
          float='right'
          bg={'rgba(241, 245, 249, 1)'}
        >
          Step 3 of 3
        </Center>
        <Box h='37' />
        <VStack spacing={2} mb={8} align="start">
          <Text fontSize="2xl" fontWeight="800" color="gray.900">
            Secure Your Account
          </Text>
          <Text fontSize="sm" color="gray.600">
            Create a unique password to safeguard your account.
          </Text>
        </VStack>

        <Formik
          initialValues={{
            ...data,
            password: '',
            confirm_password: '',
            acceptedTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, errors, touched, setFieldValue }) => (
            <Form>
              <VStack spacing={6} align="stretch">
                <Box w='full'>
                  <CustomInput
                    label='Referral Code (Optional)'
                    name='referralcode'
                    placeholder='Enter referral code'
                    fieldProps={{ type: 'text' }}
                    typeInput=''
                  />
                </Box>
                <Box w='full'>
                  <CustomInput
                    label='Password'
                    name='password'
                    placeholder='Enter Password'
                    typeInput='password'
                    value={values.password}
                  />
                </Box>

                <Box w='full'>
                  <CustomInput
                    label='Confirm Password'
                    name='confirm_password'
                    placeholder='Confirm Password'
                    typeInput='password'
                    value={values.confirm_password}
                  />
                </Box>

                <Flex alignItems='center'>
                  <Checkbox
                    name='acceptedTerms'
                    onChange={handleChange}
                    isChecked={values.acceptedTerms}
                    colorScheme="blue"
                    size="md"
                  >
                    <Text fontSize="sm" ml={2}>
                      I agree to the{' '}
                      <Link href='/terms-and-conditions'>
                        <Box as='span' color='blue.500' fontWeight="700" cursor='pointer' _hover={{ textDecoration: 'underline' }}>
                          Terms and Conditions
                        </Box>
                      </Link>
                    </Text>
                  </Checkbox>
                </Flex>
                {touched.acceptedTerms && errors.acceptedTerms && (
                  <Text color='red.500' fontSize='xs' mt='-2'>
                    {errors.acceptedTerms}
                  </Text>
                )}

                <Flex w='full' gap={4} py={6}>
                  <Button
                    flex="1"
                    variant="outline"
                    borderColor="gray.200"
                    h='56px'
                    borderRadius='xl'
                    color="gray.600"
                    onClick={() => setPage(2)}
                    isDisabled={isSubmitting}
                    fontWeight="bold"
                  >
                    Back
                  </Button>
                  <Button
                    flex="2"
                    colorScheme='blue'
                    bg={COLORS.blue}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting || !values.acceptedTerms || !!errors.confirm_password || !!errors.password}
                    h='56px'
                    borderRadius='xl'
                    type='submit'
                    color={COLORS.white}
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{ bg: 'blue.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                  >
                    Finalize
                  </Button>
                </Flex>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
