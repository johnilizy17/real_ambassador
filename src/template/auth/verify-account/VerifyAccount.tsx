import { COLORS } from '@/utils/Theme';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';

import useCustomToast from '@/hooks/useCustomToast';
import { useAppDispatch } from '@/redux/store/store';
import {
  authVerifyEmail,
  authVerifyPhone,
} from '@/redux/slices/auth/authSlice';

export const runtime = 'edge';

export default function VerifyAccount() {
  const showToast = useCustomToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState(true); // true: phone, false: email
  const [phoneNumber, setPhoneNumber] = useState('');

  const userType = router.query.user
    ? Array.isArray(router.query.user)
      ? router.query.user[0]
      : router.query.user
    : 'generaluser';

  const validUserTypes = [
    'generaluser',
    'organization',
    'verification-officer',
  ];

  if (!validUserTypes.includes(userType)) {
    return <div>404 | Not found here</div>;
  }

  const validationSchema = Yup.object({
    email: !selection
      ? Yup.string()
          .email('Kindly provide a valid email address')
          .required('Email is required')
      : Yup.string(),
    otp:
      page === 2
        ? Yup.string()
            .required('OTP is required')
            .min(6, 'OTP must be 6 digits')
        : Yup.string(),
  });

  const initiateLogin = async (values: any, { setSubmitting }: any) => {
    try {
      const submitEmail = {
        email: values.email,
      };
      setSubmitting(true);
      selection
        ? await dispatch(authVerifyPhone({ phone_number: phoneNumber }))
            .unwrap()
            .then(() => {
              setPage(2);
              showToast(`OTP sent! Verify yourPhone number`, 'success');
            })
        : await dispatch(authVerifyEmail(submitEmail))
            .unwrap()
            .then(() => {
              setPage(2);
              showToast(`OTP sent! Verify your Email`, 'success');
            });
    } catch (error: any) {
      showToast(error.response?.data?.message || 'An error occurred', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center flexDir='column'>
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
          fontWeight='500'
          float='right'
          bg={'rgba(241, 245, 249, 1)'}
        >
          Step {page} of 2
        </Center>
        <Box h='37' />
        <Flex
          mt='20px'
          mb='20px'
          borderRadius='10px'
          justifyContent='space-between'
          h='50px'
        >
          <Button
            onClick={() => setSelection(true)}
            w='full'
            bg='transparent'
            h='50px'
            fontWeight='800'
            borderBottom={selection ? '2px solid green' : ''}
          >
            By Phone
          </Button>
          <Button
            onClick={() => setSelection(false)}
            w='full'
            bg='transparent'
            h='50px'
            fontWeight='800'
            borderBottom={!selection ? '2px solid green' : ''}
          >
            By Email
          </Button>
        </Flex>
        <Box>
          <Text fontWeight='500' fontSize='20px' color={COLORS.black}>
            {page === 1
              ? selection
                ? 'Verify your Phone'
                : 'Verify your Email'
              : 'Verify OTP'}
          </Text>

          <Formik
            initialValues={{ email: '', otp: '' }}
            onSubmit={initiateLogin}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                {page === 1 && selection && (
                  <CustomInput
                    // label="Phone Number"
                    name='phone_number'
                    type='phone'
                    value={phoneNumber}
                    handleChange={setPhoneNumber}
                    placeholder='Enter phone number'
                    fieldProps={{ type: 'phone' }}
                    typeInput=''
                  />
                )}
                {page === 1 && !selection && (
                  <CustomInput
                    // label="Email"
                    name='email'
                    placeholder='Enter email'
                    fieldProps={{ type: 'text' }}
                  />
                )}
                {page === 2 && (
                  <CustomInput
                    label='OTP'
                    name='otp'
                    placeholder='Enter your OTP'
                    fieldProps={{ type: 'number' }}
                  />
                )}

                <Box w='full' paddingY={['20px', '30px']} mt='10px'>
                  <Button
                    colorScheme='blackAlpha'
                    bg={COLORS.black}
                    h='48px'
                    w='full'
                    borderRadius='5px'
                    type='submit'
                    color={COLORS.white}
                    isLoading={isSubmitting}
                  >
                    Verify
                  </Button>
                </Box>
                <Field type='hidden' name='userType' value={userType} />
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Center>
  );
}
