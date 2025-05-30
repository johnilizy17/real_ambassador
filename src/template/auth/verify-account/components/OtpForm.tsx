import { COLORS } from '@/utils/Theme';
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
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
import { useDispatch } from 'react-redux';
import { authForgottenPassword } from '@/redux/slices/auth/authSlice';
import useCustomToast from '@/hooks/useCustomToast';
import ROUTES from '@/utils/ROUTES';

export default function OTPForm() {
  const toast = useToast();

  const [data, setData] = useState({ otp: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const showToast = useCustomToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const validationSchema = Yup.object({
    otp: Yup.string().required('otp is required'),
  });
  const initiateLogin = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await dispatch(authForgottenPassword(values) as any).unwrap()
        .then(() => {
          showToast('OTP successfully verified', 'success');
          router.push(ROUTES.passwordReset);
        }).catch((error: any) => {
          showToast(error, "error")
        });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center flexDir='column'>
      <Box
        w={['320px', '429px']}
        pos='relative'
        paddingLeft={['20px', '50px']}
        paddingTop={['20px', '30px']}
        paddingRight={['20px', '50px']}
        paddingBottom={['20px', '30px']}
        bg='rgba(255, 255, 255, 1)'
        borderRadius='20px'
        boxShadow='0 0 0 1px rgba(0, 0, 0, 0.1)'
        h='322px'
        p='30px, 50px'
      >
        <Center w='full' fontWeight='500' fontSize='14px'>
          OTP Verifications
        </Center>
        <Formik
          initialValues={data}
          onSubmit={initiateLogin}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box w='full' mt='62px'>
                <CustomInput
                  label='Enter OTP'
                  name='otp'
                  placeholder='********'
                  fieldProps={{ type: 'text' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Center mt='10px'>
                <Flex mt='16px' fontSize='13px' fontWeight='500'>
                  Didn’t get OTP Code?{' '}
                  <Text ml='5px' cursor='pointer' color={COLORS.black}>
                    {' '}
                    Resend Code
                  </Text>
                </Flex>
              </Center>
              <Box
                w='full'
                paddingLeft={['20px', '50px']}
                paddingTop={['20px', '30px']}
                paddingRight={['20px', '50px']}
                paddingBottom={['20px', '30px']}
                left='0px'
                pos='absolute'
                bottom='0px'
              >
                <Button
                  colorScheme='blackAlpha'
                  bg={COLORS.black}
                  h='48px'
                  w='full'
                  borderRadius='5px'
                  type='submit'
                  color={COLORS.white}
                >
                  Verify
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
