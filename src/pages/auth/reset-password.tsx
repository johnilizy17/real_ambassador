
import React, { useEffect } from 'react';
import ResetPasswordForm from '@/template/auth/reset-password/ResetPassword';
import AuthLayout from '@/contants/Rapper/AuthLayerForm';

export default function ResetPassword() {

    return (
        <AuthLayout seoTitle="Reset Password">
            <ResetPasswordForm />
        </AuthLayout>
    )
}