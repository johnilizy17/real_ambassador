import { Box, Container, SimpleGrid, VStack, Heading, Text, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import StatCard from "./StatCard";
import TierProgress from "./TierProgress";
import RecentReferrals from "./RecentReferrals";
import { Users, DollarSign, ArrowUpRight, Award } from "lucide-react";
import { CopyCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import useCustomToast from "@/hooks/useCustomToast";
import { generateAccount } from "@/url/api's/userProfile";
import { referredBalance, referredProfile } from "@/url/api's/organization";
import { cashFormat } from "@/utils/cashformat";

const data = [
    { value: 100 },
    { value: 115 },
    { value: 90 },
    { value: 130 },
    { value: 70 },
    { value: 140 },
    { value: 110 },
    { value: 130 },
];
export default function DashboardOverview() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [wallet, setWallet] = useState({ account_number: "", bank_name: "" })
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [transferWallet, setTransferWallet] = useState(false)
    const [amount, setAmount] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const showMessage = useCustomToast();

    async function Balance() {
        const account = await generateAccount({ ...user, amount: 0, name: `${user.lastName},${user.firstName}` })
        setWallet(account.data)
        const result = await referredBalance()
        setAmount(result)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage("Copy Successfully Account Number", "success")
        } catch (err) {
            showMessage("Copy Failed", "success")
        }
    };

    async function registeredUsers(e: string) {
        const users = await referredProfile(e)
        return users.data ? users.data.length : 0
    }


    async function UsersCount() {
        const users = await registeredUsers("USERAMBASSADOR") + await registeredUsers("USER")
        setTotalUsers(users ?? 0)
    }
    useEffect(() => {
        UsersCount()
        Balance()
    }, [])



    return (
        <Box bg="#F9FAFB" minH="100vh" pb={20}>
            <Container maxW="container.xl" pt={8} px={[4, 4, 10]}>
                <VStack align="stretch" spacing={10}>
                    {/* Header */}
                    <VStack align="start" spacing={1}>
                        <Heading size="lg" fontWeight="700" color="gray.900">
                            Dashboard
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            Welcome back! Here's your performance overview.
                        </Text>
                    </VStack>

                    {/* Stats Grid */}
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        <StatCard
                            label="Total Referrals"
                            value={totalUsers}
                            change="+3 this month"
                            changeType="increase"
                            icon={Users}
                        />
                        <StatCard
                            label="Total Earnings"
                            value={cashFormat(amount)}
                            change="+12% from last month"
                            changeType="increase"
                            icon={DollarSign}
                        />
                        <StatCard
                            label="Current Tier"
                            value={user && (user.payment === 1 ? "Pending" : user.payment === 2 ? "Bronze" : user.payment === 3 ? "Silver" : "Gold")}
                            helperText={`1 more to ${user && (user.payment === 1 ? "Pending" : user.payment === 2 ? "Bronze" : user.payment === 3 ? "Silver" : "Gold")}`}
                            icon={Award}
                        />
                    </SimpleGrid>

                    {/* Tier Progress */}
                    <TierProgress />

                    {/* Recent Referrals */}
                    <RecentReferrals />
                </VStack>
            </Container>
        </Box>
    );
}
