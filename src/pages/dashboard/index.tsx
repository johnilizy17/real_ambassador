import React from 'react';
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import PageAnimation from '@/components/PageAnimation';

export default function Dashboard() {
    return (
        <UserSideBar>
            <PageAnimation>
                <DashboardOverview />
            </PageAnimation>
        </UserSideBar>
    )
}