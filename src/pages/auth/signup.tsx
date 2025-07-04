import AuthLayout from '@/contants/Rapper/AuthLayerForm';
import StepOne from '@/template/auth/sign-up/StepOne';
import StepTwo from '@/template/auth/sign-up/StepTwo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SignUp() {

  const [page, setPage] = useState(1)
  const [data, setData] = useState({phone:"+234",phone_number:""})

  const { query } = useRouter()


  return (
    <AuthLayout seoTitle="Register">

      {page === 1 ?
        <StepOne data={data} setPage={setPage} user={query.user} setData={setData} />
        :
        <StepTwo data={data} setPage={setPage} user={query.user} />}
    </AuthLayout>
  )
}