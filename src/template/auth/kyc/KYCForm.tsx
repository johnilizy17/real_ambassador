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
import { authForgottenPassword, CompleteKYC } from '@/redux/slices/auth/authSlice';
import { useAppDispatch } from '@/redux/store/store';
import ROUTES from '@/utils/ROUTES';
import CustomInput from '@/components/CustomInput/CustomInput'

interface FormValues {
  bvn: string;
  address: string;
  state: string;
  city: string;
}

const INITIAL_VALUES: FormValues = {
  bvn: "",
  address: "",
  state: "",
  city: ""
};

export default function KYCForm({onClose}:{onClose:any}) {
  const showToast = useCustomToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    bvn: Yup.string().required('BVN address is required'),
    address: Yup.string().required('Address address is required'),
    state: Yup.string().required('State address is required'),
    city: Yup.string().required('City address is required'),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(CompleteKYC(values) as any)
        .unwrap()
        .then((result:{message:string}) => {
          onClose()
          showToast(
            result.message,
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
        w={"full"}
      >
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='BVN'
                  name='bvn'
                  placeholder='Enter BVN'
                  fieldProps={{ type: 'text' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='Address'
                  name='address'
                  placeholder='Enter Address'
                  fieldProps={{ type: 'text' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='State'
                  name='state'
                  placeholder='Enter States'
                  fieldProps={{ type: 'text' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='City'
                  name='city'
                  placeholder='Enter City'
                  fieldProps={{ type: 'text' }}
                  typeInput=''
                  value=''
                />
              </Box>
              <Box fontSize="10px">kindly note your bvn is not stored on AB NARINOHS it is use to verify your indentity</Box>
              <Box
                w='full'
                mt="20px"
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
