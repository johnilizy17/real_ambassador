import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Box } from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme';
import PeopleTable, { SearchFilters } from './PeopleTable';

export default function PeopleTab() {
    const [selectedUserType, setSelectedUserType] = useState<string>("4");
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        searchQuery: '',
        lga: '',
        state: ''
    });

    const handleTabChange = (index: number) => {
        switch (index) {
            case 0:
                setSelectedUserType("4");
                break;
            case 1:
                setSelectedUserType("6");
                break;
            case 2:
                setSelectedUserType("3");
                break;
            default:
                setSelectedUserType("4");
        }
    };

    return (
        <Box p={["20px", "20px", "20px", "30px"]} pt="0px">
            <Tabs position='relative' variant='unstyled' onChange={handleTabChange} index={selectedUserType === "4" ? 0 : selectedUserType === "6" ? 1 : 2}>
                <TabList>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400" fontSize="14px" color={COLORS.grey}>General User</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400" fontSize="14px" color={COLORS.grey}>Verification Officers</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400" fontSize="14px" color={COLORS.grey}>Organization Admin</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg='#7ED31F' borderRadius='1px' />
                <TabPanels paddingTop="10px">
                    <TabPanel>
                        <PeopleTable userType={selectedUserType} searchFilters={searchFilters} />
                    </TabPanel>
                    <TabPanel>
                        <PeopleTable userType={selectedUserType} searchFilters={searchFilters} />
                    </TabPanel>
                    <TabPanel>
                        <PeopleTable userType={selectedUserType} searchFilters={searchFilters} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}