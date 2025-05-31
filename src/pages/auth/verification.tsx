import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import VerifyAccount from '@/template/auth/verify-account/VerifyAccount';
import AuthLayout from '@/contants/Rapper/AuthLayerForm';

export default function VerificationForm() {


    return (
        <AuthLayout seoTitle="Verify Account">
            <VerifyAccount/>
        </AuthLayout>
    )
}