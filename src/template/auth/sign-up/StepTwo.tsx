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
    [key: string]: any;
  };
}

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  type: Yup.string()
    .required('Subscription is required'),
  acceptedTerms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

export default function StepTwo({ setPage, user, data }: SignUpForm2Props) {
  const router = useRouter();
  const userRole = 4; // Default role, adjust as needed
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
      if (values.type === '1') {
        setAmount(5000);
      }
      else if (values.type === '2') {
        setAmount(20000);
      } else if (values.type === '3') {
        setAmount(35000);
      }
      showToast('you have successfully been registered', 'success');
      // router.push(ROUTES.login);
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
        src="/logo/logo_white.png"
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
          fontFamily='Inter'
          fontWeight='500'
          float='right'
          bg={'rgba(241, 245, 249, 1)'}
        >
          Step 2 of 2
        </Center>
        <Box h='37' />
        <Box>
          <Box
            fontWeight='500'
            fontSize='20px'
            color={COLORS.black}
            fontFamily='Inter'
          >
            Secure Your Account
          </Box>
          <Box
            mt='5px'
            fontWeight='400'
            fontSize='13px'
            lineHeight='16.94px'
            color={COLORS.grey}
            fontFamily='Inter'
          >
            Create a unique account password for your account
          </Box>
        </Box>

        <Formik
          initialValues={{
            ...data,
            password: '',
            confirm_password: '',
            type: "",
            acceptedTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, errors, touched }) => (
            <Form>
              <Box w='full' mt='44px'>
                <CustomInput
                  label='Subscription'
                  name='type'
                  type={"select"}
                  placeholder='Enter your subscription'
                  value={values.type}
                >
                  <option value='1'>Sliver {"(" + cashFormat(5000) + " " + "percentage shares 5%" + ")"}</option>
                  <option value='2'>Bronze {"(" + cashFormat(20000) + " " + "percentage shares 10%" + ")"}</option>
                  <option value='3'>Gold {"(" + cashFormat(35000) + " " + "percentage shares 15%" + ")"}</option>
                </CustomInput>
              </Box>
              <Box w='full' mt='44px'>
                <CustomInput
                  label='Password'
                  name='password'
                  placeholder='Enter Password'
                  typeInput='password'
                  value={values.password}
                />
              </Box>

              <Box w='full' mt='44px'>
                <CustomInput
                  label='Confirm Password'
                  name='confirm_password'
                  placeholder='Confirm Password'
                  typeInput='password'
                  value={values.confirm_password}
                />
              </Box>

              <Flex mt='10px' alignItems='center'>
                <Checkbox
                  name='acceptedTerms'
                  onChange={handleChange}
                  isChecked={values.acceptedTerms}
                >
                  I agree to the{' '}
                  <Link href='/terms-and-conditions"'>
                    <Text as='span' color='blue.500' cursor='pointer'>
                      Terms and Conditions
                    </Text>
                  </Link>
                </Checkbox>
              </Flex>
              {touched.acceptedTerms && errors.acceptedTerms && (
                <Text color='red.500' fontSize='sm' mt='1'>
                  {errors.acceptedTerms}
                </Text>
              )}

              <Flex
                w='full'
                paddingTop={['20px', '30px']}
                paddingBottom={['20px', '30px']}
                mt='10px'
              >
                <Button
                  colorScheme='white'
                  borderColor={COLORS.black}
                  borderWidth='1px'
                  h='48px'
                  w='full'
                  borderRadius='5px'
                  color={COLORS.black}
                  marginRight='48px'
                  onClick={() => setPage(1)}
                  isDisabled={isSubmitting}
                >
                  Previous
                </Button>
                <Button
                  colorScheme='blackAlpha'
                  bg={COLORS.black}
                  isLoading={isSubmitting}
                  isDisabled={
                    isSubmitting ||
                      !values.acceptedTerms ||
                      errors.confirm_password
                      ? true
                      : false || errors.password
                        ? true
                        : false || errors.phone_number
                          ? true
                          : false
                  }
                  h='48px'
                  w='full'
                  borderRadius='5px'
                  type='submit'
                  color={COLORS.white}
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
