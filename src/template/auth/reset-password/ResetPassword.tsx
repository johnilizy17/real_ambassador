import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import {
  Box,
  Button,
  Center,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Progress,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import {
  calculatePasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from '@/utils/helpers';
import { COLORS } from '@/utils/Theme';
import ROUTES from '@/utils/ROUTES';
import { useDispatch } from 'react-redux';
import useCustomToast from '@/hooks/useCustomToast';
import { authChangePage } from '@/redux/slices/auth/authSlice';

interface FormValues {
  password: string;
  confirm_password: string;
}

const INITIAL_VALUES: FormValues = {
  password: '',
  confirm_password: '',
};

export default function ResetPasswordForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch()
  const showToast = useCustomToast();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(authChangePage(values) as any)
        .unwrap()
        .then(() => {
          router.push("/auth/login")
          showToast(
            'Password successfully changed',
            'success'
          );
        });
    } catch (error: any) {
      showToast(error || 'An error occurred', 'error');
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
        bg='whitesmoke'
        borderRadius='20px'
        boxShadow='0 0 0 1px rgba(0, 0, 0, 0.1)'
        h="auto"
      >
        <Center w='full' fontWeight='900' fontSize='20px'>
          Set New Password
        </Center>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form>
              {/* <Box w='full' mt='32px'>
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
              </Box> */}

              <Box w='full' mt='24px'>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter Password'
                      onChange={(e) => {
                        handleChange(e);
                        setPasswordStrength(
                          calculatePasswordStrength(e.target.value)
                        );
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        icon={showPassword ? <EyeOff /> : <Eye />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant='ghost'
                        size='sm'
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                {values.password && (
                  <Box mt={2}>
                    <Progress
                      value={passwordStrength}
                      colorScheme={getPasswordStrengthColor(passwordStrength)}
                      size='sm'
                      borderRadius='full'
                    />
                    <Text
                      fontSize='sm'
                      color={getPasswordStrengthColor(passwordStrength)}
                      mt={1}
                    >
                      Password Strength:{' '}
                      {getPasswordStrengthText(passwordStrength)}
                    </Text>
                  </Box>
                )}
              </Box>

              <Box w='full' mt='24px'>
                <FormControl
                  isInvalid={
                    !!errors.confirm_password && touched.confirm_password
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      name='confirm_password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        icon={showPassword ? <EyeOff /> : <Eye />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant='ghost'
                        size='sm'
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box
                w='full'
                pt="20px"
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
                  Save Password
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
