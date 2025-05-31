import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { COLORS } from '@/utils/Theme';
import EmailLogin from '@/template/auth/login/EmailLogin';
import AuthLayout from '@/contants/Rapper/AuthLayerForm';

export default function LogIn() {
  const [userType, setUserType] = useState('4');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const buttonBg = useColorModeValue('white', 'gray.700');
  const selectedBg = useColorModeValue(COLORS.black, 'blue.500');
  const buttonHoverBg = useColorModeValue('gray.50', 'gray.600');
  const textColor = useColorModeValue(COLORS.black, 'gray.200');
  const selectedTextColor = 'White';

  return (
    <>

      <AuthLayout seoTitle='Login Page'>
          <Center flexDir={"column"}>
            <Image
              w='200px'
              src='/image/Logo2.png'
              mb={8}
              display={['flex', 'flex', 'flex', 'none']}
              alt='Logo'
            />
          <EmailLogin userType={userType} /> {/* Pass userType prop */}
          </Center>
      </AuthLayout>
    </>
  );
}
