import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Box } from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme';
import AddressTable from './AddressTable';

export default function AddressTab() {

    return (
        <Box p={["20px", "20px", "20px", "30px"]} pt="0px">
            <Tabs position='relative' variant='unstyled'>
                <TabList>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400"  fontSize="14px" color={COLORS.grey}>General User</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400"  fontSize="14px" color={COLORS.grey}>Verification Officers</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400"  fontSize="14px" color={COLORS.grey}>Organization Admin</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg='#7ED31F' borderRadius='1px' />
                <TabPanels paddingTop="10px">
                    <TabPanel>
                        <AddressTable />
                    </TabPanel>
                    <TabPanel>
                        <AddressTable />
                    </TabPanel>
                    <TabPanel>
                        <AddressTable />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}