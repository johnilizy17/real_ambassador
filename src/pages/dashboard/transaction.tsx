import SideBar from '@/components/Dashboard/DashboardLayout/SideBar';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box, IconButton,
    Center
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DashboardHome from '@/components/Dashboard/Home'
import VerificationNavBar from '@/components/Dashboard/Verification/Home/SideBar';
import { COLORS } from '@/layout/Theme';
import { useRouter } from 'next/router';
import AccountForm from '@/components/Dashboard/Verification/Account/AccountForm';
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import { useSelector } from 'react-redux';
import { EmptyState } from '@/components/EmptyState';
import { referredTransaction } from '@/url/api\'s/organization';
import { formatDate } from '@/utils/date';

export default function Dashboard() {

    const router = useRouter()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [history, setHistory] = useState([])

    async function DashboardUser() {
        const historyPeople = await referredTransaction()
        setHistory(historyPeople.transaction)
    }

    useEffect(() => {
        DashboardUser()
    }, [])

    return (
        <UserSideBar>
            <Box h="100vh" bg="#FAFAFA">
                <Box pt="120px" pl={"20px"} pr={"20px"}>
                    <IconButton aria-label="" bg="transparent" onClick={() => router.back()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>

                    <Box fontWeight="400" fontSize={["14px", "14px", "14px", "16px"]} color={COLORS.grey}>
                        Transactions
                    </Box>

                    {history.length > 0.1 ?
                        <Box w="full" mt="40px">
                            <Box overflow="scroll" bg={COLORS.white}>
                                <TableContainer display={["none", "none", "block"]} overflow="scroll">
                                    <Table size='sm' variant='striped' colorScheme='gray' >
                                        <Thead>
                                            <Tr h="75px">
                                                <Th>Name</Th>
                                                <Th>Amount</Th>
                                                <Th>Type</Th>
                                                <Th>Date</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {history.map((a: any, b: number) => (
                                                <Tr key={b} h="75px">
                                                    <Td>{a.user_id == "" ? user.firstName : JSON.parse(a.user_id).firstName + "," + JSON.parse(a.user_id).lastName}</Td>
                                                    <Td color={a.amount > 0 ? "green" : "red"}>{a.amount}</Td>
                                                    <Td>{!a.type ? "Registration fee" : "Subscription"}</Td>
                                                    <Td>{formatDate(a.created_at)}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                        :
                        <EmptyState title='No Transaction' />
                    }                </Box>
            </Box>
        </UserSideBar>
    )
}