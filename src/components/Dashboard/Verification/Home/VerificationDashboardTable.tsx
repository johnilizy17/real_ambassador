import SideBar from '@/components/Dashboard/DashboardLayout/SideBar';
import DepartmentTable from '@/components/Dashboard/Verification/DepartmentTable';
import VerificationTable from '@/components/Dashboard/Verification/VerificationTable';
import { EmptyState } from '@/components/EmptyState';
import { COLORS } from '@/layout/Theme';
import { getgainVerificationAddresses } from '@/url/api\'s/organization';
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Center,
    Button,
    useDisclosure,
    Flex
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function VerificationDashboardTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({ pending: [], completed: [], rejected: [] })
    const router = useRouter()

    async function getAddressFormGain() {
        const pending = await getgainVerificationAddresses("PENDING")
        const completed = await getgainVerificationAddresses("COMPLETED")
        const rejected = await getgainVerificationAddresses("REJECTED")
        console.log("pending")
        setData({
            pending: pending,
            completed: completed,
            rejected: rejected
        })
    }

    useEffect(() => {
        getAddressFormGain()
    }, [])


    return (
        <Box p={["20px", "20px", "20px", "30px"]} w={["100vw", "100vw", "100vw", "full"]}>
            <Tabs position='relative' variant='unstyled'>
                <TabList>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400" fontSize="14px" color={COLORS.grey}>Customer</Tab>
                    <Tab _selected={{ color: COLORS.blue }} fontWeight="400" fontSize="14px" color={COLORS.grey}>Downline</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg='#7ED31F' borderRadius='1px' />
                <TabPanels paddingTop="10px">
                    <TabPanel>
                        {data.pending.length > 0.1 ? <VerificationTable result={data.pending} /> : <EmptyState title='No Request' />}
                    </TabPanel>
                    <TabPanel>
                        {data.completed.length > 0.1 ? <VerificationTable result={data.completed} /> : <EmptyState title='No Request' />}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}