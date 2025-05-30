import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useToast,
  IconButton,
  FormLabel,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
// import Turnstile from 'react-turnstile';
import { COLORS } from '@/utils/Theme';
import useCustomToast from '@/hooks/useCustomToast';
import ROUTES from '@/utils/ROUTES';
import { authLogin } from '@/redux/slices/auth/authSlice';
import { useAppDispatch } from '@/redux/store/store';

interface LoginFormProps {
  userType: string;
}

const createRateLimiter = () => {
  const attempts = new Map();
  const MAX_ATTEMPTS = 50;
  const LOCKOUT_TIME = 15 * 60 * 1000;

  return {
    checkRateLimit: (email: string): boolean => {
      const now = Date.now();
      const userAttempts = attempts.get(email) || { count: 0, timestamp: now };

      if (userAttempts.count >= MAX_ATTEMPTS) {
        if (now - userAttempts.timestamp < LOCKOUT_TIME) {
          return false;
        }
        attempts.delete(email);
        return true;
      }
      return true;
    },
    incrementAttempts: (email: string) => {
      const now = Date.now();
      const userAttempts = attempts.get(email) || { count: 0, timestamp: now };
      attempts.set(email, { count: userAttempts.count + 1, timestamp: now });
    },
    resetAttempts: (email: string) => {
      attempts.delete(email);
    },
  };
};

const rateLimiter = createRateLimiter();

export default function EmailLogin({ userType }: LoginFormProps) {
  const showToast = useCustomToast();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [isCaptchaRequired, setIsCaptchaRequired] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .max(255, 'Email is too long'),
    password: Yup.string().required('Password is required'),
  });

  const initiateLogin = async (values: any, { setSubmitting }: any) => {
    try {
      if (!rateLimiter.checkRateLimit(values.email)) {
        showToast('Too many login attempts. Please try again later.', 'error');
        return;
      }

      setSubmitting(true);

      if (isCaptchaRequired && !captchaToken) {
        showToast('Please complete the captcha verification', 'error');
        return;
      }

      const loginData = {
        email: values.email.trim().toLowerCase(),
        password: values.password,
      };
      await dispatch(authLogin(loginData) as any).unwrap()
        .then(() => {
          showToast('Login successful', 'success');
          router.push(ROUTES.dashboard);
        });
    } catch (error: any) {
      rateLimiter.incrementAttempts(values.email);

      showToast(error?.message || 'Login failed', 'error');

      console.error('Login error:', error);
      setSubmitting(false);
    }
  };

  return (
    <Center flexDirection='column'>
      <Box
        w={['320px', '429px']}
        position='relative'
        px={[5, 12]}
        bg='white'
        borderRadius='2xl'
        boxShadow='sm'
        h='404px'
      >
        <Formik
          initialValues={data}
          onSubmit={initiateLogin}
          enableReinitialize={true}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form>
              <VStack spacing={8}>
                {data.email.length < 2 && (
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name='email'
                      type='email'
                      value={values.email}
                      placeholder='example@gmail.com'
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter Password'
                      onChange={handleChange}
                      value={values.password}
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

                <Flex w='full' justify='space-between' mb='20px' align='center'>
                  <FormControl
                    onClick={() => setRememberMe(!rememberMe)}
                    display='flex'
                    alignItems='center'
                  >
                    <input
                      type='checkbox'
                      id='remember-me'
                      checked={rememberMe}
                    />
                    <FormLabel htmlFor='remember-me' ml={3} mb={0}>
                      Remember me
                    </FormLabel>
                  </FormControl>
                  <Link href='/auth/forgot-password'>
                    <Button variant='link' color={COLORS.black} fontSize='13px'>
                      Forgot password?
                    </Button>
                  </Link>
                </Flex>
              </VStack>

              <Button
                colorScheme='blackAlpha'
                bg={COLORS.black}
                h='48px'
                w='full'
                isLoading={isSubmitting}
                isDisabled={
                  isSubmitting || (isCaptchaRequired && !captchaToken)
                }
                type='submit'
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Flex mt={4} color={COLORS.brand_grey} fontWeight='medium'>
        Don&apos;t have an account?{' '}
        <Text
          ml={1}
          cursor='pointer'
          onClick={() => router.push('/auth/signup')}
          color={COLORS.black}
        >
          Register Here
        </Text>
      </Flex>
    </Center>
  );
}
