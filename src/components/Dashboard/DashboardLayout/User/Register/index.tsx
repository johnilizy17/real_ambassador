import AccountType from '@/components/SignUp/AccountType';
import React, { useState } from 'react';
import Head from "next/head";
import GoogleMap from '@/components/SignUp/GoogleMap';
import CreateAccount from '@/components/SignUp/CreateAccount';
import AddressRegisterForm from './RegisterForm';
import ImageAddressUpload from './ImageAddressUpload';

export default function UserRegisterationAddress({ page, setPage }: any) {

    const [data, setData] = useState({address:""})

    return (
        <AddressRegisterForm data={data} />
    )
}