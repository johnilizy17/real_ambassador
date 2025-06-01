import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Box } from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme';
import SettingProfile from './SettingProfile';
import SettingsAdmin from './SettingsAdmin';
import VerificationCard from './VerificationCard';

export default function VerificationSettings() {

    return (
        <Box pt="40px">
            <Tabs position='relative' variant='unstyled'>
                <TabList>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400"  fontSize="14px" color={COLORS.grey}>Profile</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400"  fontSize="14px" color={COLORS.grey}>Payout Account</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg='#7ED31F' borderRadius='1px' />
                <TabPanels paddingTop="10px">
                    <TabPanel>
                        <SettingProfile />
                    </TabPanel>
                    <TabPanel>
                        <VerificationCard />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}