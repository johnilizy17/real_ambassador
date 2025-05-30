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
import CustomInput from '@/components/CustomInput/CustomInput';
import { cashFormat } from '@/utils/cashformat';
import { createSub } from '@/utils/url/asset';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useSelector } from 'react-redux';
import PaymentFlutterwave from './paymentFlutterwave';
import { setDisplay } from '@/redux/slices/driverSlice';
import { createRealSub } from '@/redux/slices/assetSlice';

interface FormValues {
  duration: number,
  interval: string
}

const INITIAL_VALUES: FormValues = {
  duration: 1,
  interval: "daily"
};

export default function Sub({ data }: { data: any }) {
  const showToast = useCustomToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: any) => state.auth)
  const [dataPayment, setDataPayment] = React.useState<any>({ amount: 0, id: "" });
  const validationSchema = Yup.object({
    duration: Yup.string().required('Duration is required'),
    interval: Yup.string().required('Interval is required'),
  });
  const [display, setDisplay] = React.useState(false);

  const interval = ["daily", "weekly", "monthly"]
  const amount = [
    data.first_year,
    data.second_year,
    data.third_year,
    data.forth_year,
    data.fifth_year
  ]

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSubmitting(true);

      const baseAmount = amount[values.duration - 1];
      const totalDays = values.duration * 356;

      const computedAmount =
        values.interval === "daily"
          ? baseAmount / totalDays
          : values.interval === "weekly"
            ? (7 * baseAmount) / totalDays
            : (30 * baseAmount) / totalDays;

      const computedDuration =
        values.interval === "daily"
          ? totalDays / 1
          : values.interval === "weekly"
            ? totalDays / 7
            : totalDays / 30;

      const payload = {
        amount: computedAmount,
        duration: computedDuration,
        interval: values.interval,
      };

      const result = await createSub(payload);
      setDataPayment({ amount: computedAmount, id: result.data });
      dispatch(createRealSub({ ...payload, savingsId: JSON.stringify(data), userId: user.id, subId: result.data, }));
       setDisplay(true);
      // Trigger payment with dynamic amount and payment plan

    } catch (error: any) {
      showToast(error.response?.data?.message || "An error occurred", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center flexDir='column'>
      {display && <PaymentFlutterwave setDisplay={setDisplay} amount={dataPayment.amount} id={dataPayment.id} />}
      <Box
        w={['320px', '429px']}
        pos='relative'
      >
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form>
              <Box>
                Interval Amount {cashFormat(values.interval === "daily" ? amount[values.duration - 1] / (values.duration * 356) : values.interval === "weekly" ? 7 * amount[values.duration - 1] / (values.duration * 356) : 30 * amount[values.duration - 1] / (values.duration * 356))}
              </Box>

              <Box>
                Interval Times {values.interval === "daily" ? (values.duration * 356) / 1 : values.interval === "weekly" ? (values.duration * 356) / 7 : (values.duration * 356) / 30}
              </Box>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='Type of plan'
                  name='duration'
                  placeholder='Enter Plan'
                  fieldProps={{ type: 'select' }}
                  type="select"
                  typeInput=''
                  value=''
                >
                  <option value={1}>1 year for {cashFormat(data.first_year)}</option>
                  <option value={2}>2 years for {cashFormat(data.second_year)}</option>
                  <option value={3}>3 years for {cashFormat(data.third_year)}</option>
                  <option value={4}>4 years for {cashFormat(data.forth_year)}</option>
                  <option value={5}>5 years for {cashFormat(data.fifth_year)}</option>
                </CustomInput>
              </Box>
              <Box w='full' mt='32px'>
                <CustomInput
                  label='Interval'
                  name='interval'
                  placeholder='Enter interval'
                  fieldProps={{ type: 'select' }}
                  typeInput=''
                  type="select"
                  value=''
                >
                  <>
                    {interval.map((a: string, b: number) => (<option key={b} value={a} >{a}</option>))}
                  </>
                </CustomInput>
              </Box>

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
                  Subscribe
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}
