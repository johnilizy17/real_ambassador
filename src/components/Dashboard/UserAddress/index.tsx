import React from 'react';
import EnterAddress from './EnterAddress';
import HomeCard from '../Home/HomeCard';
import HomeHeaderUser from '../Home/HomeHeaderUser';
import VerificationAlert from '../DashboardLayout/VerificationAlert';

export default function UserAddress() {

    return (
        <>
            <HomeHeaderUser />
            <VerificationAlert />
            <HomeCard />
        </>
    )
}