import SideBar from '@/components/Dashboard/DashboardLayout/SideBar';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import VerificationNavBar from '@/components/Dashboard/Verification/Home/SideBar';
import VerificationBody from '@/components/Dashboard/Verification/Home/HomeBody';
import { useSelector } from 'react-redux';
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';

export default function Dashboard() {
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
  
    return (
        <UserSideBar>
            <Box bg="#FAFAFA">
                <Box pt="120px" pl={["0px","0px","0px","20px"]}>
                    <VerificationBody />
                </Box>
            </Box>
        </UserSideBar>
    )
}