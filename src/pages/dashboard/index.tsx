import React from 'react';
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';

export default function Dashboard() {
    return (
        <UserSideBar>
            <DashboardOverview />
        </UserSideBar>
    )
}