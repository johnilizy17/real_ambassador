import { Box, Center, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import * as animationData from '@/Auth/Email.json';
import { emailVerification } from '@/redux/slices/auth/authSlice';
import { useRouter } from 'next/router';
import useCustomToast from '@/hooks/useCustomToast';
import { useAppDispatch } from '@/redux/store/store';
import ROUTES from '@/utils/ROUTES';
import LottieLoader from '@/utils/LottieLoader';
import AuthLayout from '@/contants/Rapper/AuthLayerForm';

export default function EmailVerify() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const showToast = useCustomToast();
  const router = useRouter();

  useEffect(() => {
    if (query.token) {
      setIsVerifying(true);
      dispatch(emailVerification(query.token as string))
        .unwrap()
        .then(() => {
          setIsVerifying(false);
          showToast('Email verified successfully', 'success');
          router.push(ROUTES.login);
        })
        .catch((error: any) => {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'An unknown error occurred';
          showToast(errorMessage || 'Email not verified', 'error');
        });
    }
  }, [query.token, dispatch]);

  return (
    <AuthLayout seoTitle="Verify Email">
      <Center flexDir='column' h='full' w='full'>
        <LottieLoader defaultOptions={defaultOptions} height={400} width={400} />
        <Box fontWeight='800' fontSize='18px'>
          {isVerifying && 'Verifying..'}
        </Box>
      </Center>
    </AuthLayout>
  );
}
