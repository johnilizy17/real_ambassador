import AuthLayout from '@/contants/Rapper/AuthLayerForm';
import StepAccountType from '@/template/auth/sign-up/StepAccountType';
import StepOne from '@/template/auth/sign-up/StepOne';
import StepTwo from '@/template/auth/sign-up/StepTwo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SignUp() {

  const { query, isReady } = useRouter()
  const [page, setPage] = useState(1)
  const [data, setData] = useState({
    phone: "+234",
    phone_number: "",
    referralcode: "",
    accountType: "",
    accountTypeFee: 0,
    payment: 5,
    commissions: {
      referral: 0,
      subscription: 0,
      landSales: 10
    }
  })

  React.useEffect(() => {
    if (isReady && query.ref) {
      setData(prev => ({ ...prev, user_id: query.ref as string }))
    }
  }, [query.ref, isReady])


  return (
    <AuthLayout seoTitle="Register">

      {page === 1 ?
        <StepOne data={data} setPage={setPage} user={query.user} setData={setData} />
        : page === 2 ?
          <StepAccountType data={data} setPage={setPage} setData={setData} />
          :
          <StepTwo data={data} setPage={setPage} user={query.user} />}
    </AuthLayout>
  )
}