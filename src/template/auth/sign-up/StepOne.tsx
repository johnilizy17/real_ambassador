import { COLORS } from '@/utils/Theme';
import {
  Box,
  Button,
  Center,
  Flex,
  Img,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/CustomInput/CustomInput';

export const runtime = 'edge';

export default function StepOne({ data, setPage, user, setData }: any) {
  const [phoneNumber, setPhoneNumber] = useState(data.phone);
  const router = useRouter();
  // Get user type from query parameter, with validation
  const userType = router.query.user
    ? Array.isArray(router.query.user)
      ? router.query.user[0]
      : router.query.user
    : 'generaluser'; // Default to 'generaluser' if not provided

  const validUserTypes = [
    'generaluser',
    'organization',
    'verification-officer',
  ];

  // Add explicit role mapping
  const USER_ROLE_MAP = {
    generaluser: 4,
    organization: 3,
    'verification-officer': 6,
  };

  if (!validUserTypes.includes(userType)) {
    console.error('Invalid user type:', userType);
    return <div>Invalid user type</div>;
  }

  // Determine the form heading based on userType
  const formHeading =
    userType === 'organization' ? 'Organization Details' : 'Personal Details';

  // Adjust validation schema based on userType
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Kindly provide a valid email address')
      .required('Email address is required'),
    firstName: Yup.string().required('First name is required'),
    birth_date: Yup.string().required('Date of Birth is required'),
    lastName: Yup.string().required('Last name is required')
  });

  const initiateLogin = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      // Include the role_id based on userType
      const roleId = USER_ROLE_MAP[userType as keyof typeof USER_ROLE_MAP];
      setData({ ...values, phone: phoneNumber, role_id: roleId });
      setPage(2);
      setSubmitting(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center flexDir='column'>
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
          Step 1 of 3
        </Center>
        <Box h='37' />
        <VStack spacing={2} mb={8} align="start">
          <Text fontSize="2xl" fontWeight="800" color="gray.900">
            {formHeading}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {userType === 'organization'
              ? 'Provide the necessary information about your organization'
              : 'Provide all the necessary information about yourself'}
          </Text>
        </VStack>
        <Formik
          initialValues={data}
          onSubmit={initiateLogin}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <VStack spacing={5} align="stretch">
                <Box w='full'>
                  <CustomInput
                    label='First Name'
                    name='firstName'
                    placeholder='Enter First Name'
                    fieldProps={{ type: 'text' }}
                    typeInput=''
                  />
                </Box>
                <Box w='full'>
                  <CustomInput
                    label='Last Name (Surname)'
                    name='lastName'
                    placeholder='Enter Last Name'
                    fieldProps={{ type: 'text' }}
                    typeInput=''
                  />
                </Box>
                <Box w='full'>
                  <CustomInput
                    label='Email'
                    name='email'
                    placeholder='example@gmail.com'
                    fieldProps={{ type: 'email' }}
                    typeInput=''
                  />
                </Box>
                <Box w='full'>
                  <CustomInput
                    label='Date of Birth'
                    name='birth_date'
                    placeholder='2/20/2024'
                    fieldProps={{ type: 'date' }}
                    typeInput=''
                  />
                </Box>
                <Box w='full'>
                  <CustomInput
                    label='Phone Number'
                    name='phone'
                    typeInput=''
                    type='phone'
                    value={phoneNumber}
                    handleChange={setPhoneNumber}
                    placeholder='Enter phone number'
                    fieldProps={{ type: 'phone' }}
                  />
                </Box>
              </VStack>

              <Box
                w='full'
                paddingTop={['20px', '30px']}
                paddingBottom={['20px', '30px']}
                mt='20px'
              >
                <Button
                  colorScheme='blue'
                  bg={COLORS.blue}
                  h='56px'
                  w='full'
                  borderRadius='xl'
                  type='submit'
                  color={COLORS.white}
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ bg: 'blue.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                >
                  Continue
                </Button>
              </Box>
              <Field type='hidden' name='userType' value={userType} />
            </Form>
          )}
        </Formik>
      </Box>

      <Flex mt='0px' color={COLORS.brand_grey} fontWeight='500'>
        Already have an account?{' '}
        <Text
          ml='5px'
          cursor='pointer'
          onClick={() => router.push('/auth/login')}
          color={COLORS.black}
        >
          Sign In
        </Text>
      </Flex>
    </Center>
  );
}
