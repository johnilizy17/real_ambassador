import AuthLayout from '@/contants/Rapper/AuthLayerForm';
import VerifyAccount from '@/template/auth/verify-account/components/OtpForm';
import React, { useState } from 'react';

export default function OTP() {

    return (
        <AuthLayout seoTitle="OTP">
           <VerifyAccount/>
        </AuthLayout>
    )
}