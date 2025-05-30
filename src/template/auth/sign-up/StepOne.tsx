import { COLORS } from '@/utils/Theme';
import {
  Box,
  Button,
  Center,
  Flex,
  Img,
  Text,
  useToast,
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
        src="/image/Logo2.png"
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
          fontWeight='500'
          float='right'
          bg={'rgba(241, 245, 249, 1)'}
        >
          Step 1 of 2
        </Center>
        <Box h='37' />
        <Box>
          <Box fontWeight='500' fontSize='20px' color={COLORS.black}>
            {formHeading}
          </Box>
          <Box
            mt='5px'
            fontWeight='400'
            fontSize='13px'
            lineHeight='16.94px'
            color={COLORS.grey}
          >
            {userType === 'organization'
              ? 'Provide the necessary information about your organization'
              : 'Provide all the necessary information about yourself'}
          </Box>
        </Box>
        <Formik
          initialValues={data}
          onSubmit={initiateLogin}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              {/* Conditionally render name fields based on userType */}

              <>
                <Box w='full' mt='44px'>
                  <CustomInput
                    label='First Name'
                    name='firstName'
                    placeholder='Enter First Name'
                    fieldProps={{ type: 'text' }}
                    typeInput=''
                    value=''
                  />
                </Box>
                <Box w='full' mt='44px'>
                  <CustomInput
                    label='Last Name (Surname)'
                    name='lastName'
                    placeholder='Enter Last Name'
                    fieldProps={{ type: 'text' }}
                    typeInput=''
                    value=''
                  />
                </Box>
              </>

              <Box w='full' mt='44px'>
                <CustomInput
                  label='Email'
                  name='email'
                  placeholder='example@gmail.com'
                  fieldProps={{ type: 'email' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box w='full' mt='44px'>
                <CustomInput
                  label='Date of Birth'
                  name='birth_date'
                  placeholder='2/20/2024'
                  fieldProps={{ type: 'date' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box w='full' mt='44px'>
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

              <Box
                w='full'
                paddingTop={['20px', '30px']}
                paddingBottom={['20px', '30px']}
                mt='10px'
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
                  Continue
                </Button>
                {/* <SocialAuth /> */}
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
