import { COLORS } from '@/utils/Theme';
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Text,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Progress,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useCustomToast from '@/hooks/useCustomToast';
import { authForgottenPassword } from '@/redux/slices/auth/authSlice';
import { useAppDispatch } from '@/redux/store/store';
import ROUTES from '@/utils/ROUTES';

interface FormValues {
  email: string;
}

const INITIAL_VALUES: FormValues = {
  email: '',
};

export default function ForgotPassword() {
  const showToast = useCustomToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Kindly provide a valid email address')
      .required('Email address is required'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authForgottenPassword(values))
        .unwrap()
        .then(() => {
          router.push("/auth/otp")
          showToast(
            'Password your pin has been set to your email',
            'success'
          );
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
        pos='relative'
        p={['20px', '30px 50px']}
        bg='white'
        borderRadius='20px'
        boxShadow='0 0 0 1px rgba(0, 0, 0, 0.1)'
        h='260px'
      >
        <Center w='full' fontWeight='900' fontSize='20px'>
          Forgot Account Password
        </Center>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form>
              <Box w='full' mt='32px'>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name='email'
                    type='email'
                    placeholder='example@gmail.com'
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box
                w='full'
                p={['20px', '30px 50px']}
                left='0px'
                pos='absolute'
                bottom='0px'
              >
                <Button
                  colorScheme='blackAlpha'
                  bg={COLORS.black}
                  h='48px'
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  w='full'
                  borderRadius='5px'
                  type='submit'
                  color={COLORS.white}
                >
                  Send Verification Email
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Flex mt='16px' color={COLORS.brand_grey} fontWeight='500'>
        Remember your password?{' '}
        <Text
          ml='5px'
          cursor='pointer'
          onClick={() => router.push(ROUTES.login)}
          color={COLORS.black}
        >
          Login Here
        </Text>
      </Flex>
    </Center>
  );
}
