import { referredProfile } from "@/url/api's/organization";
import { Box, Flex, Text, VStack, Badge, HStack, Divider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function RecentReferrals() {
    const [referrals, setReferrals] = useState<any[]>([]);

    async function registeredUsers(e: string) {
        const users = await referredProfile(e)
        return users.data
    }

    async function UsersCount() {
        const users: any = await registeredUsers("USERAMBASSADOR") ?? []
        const user: any = await registeredUsers("USER") ?? []
        const filterUsers = users.filter((a: any, b: any) => b < 2)
        const filterUser = user.filter((a: any, b: any) => b < 2)
        setReferrals([...filterUsers, ...filterUser])
    }

    useEffect(() => {
        UsersCount();
    }, []);

    return (
        <Box bg="white" p={8} borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <VStack align="stretch" spacing={6}>
                <Text fontSize="lg" fontWeight="700" color="gray.900">
                    Recent Referrals
                </Text>

                <VStack align="stretch" spacing={0}>
                    {referrals.map((ref, index) => (
                        <Box key={index}>
                            <Flex justify="space-between" align="center" py={4}>
                                <VStack align="start" spacing={0}>
                                    <Text fontWeight="600" color="gray.900">
                                        {ref.firstName} {ref.lastName} <span style={index > 1 ? { color: "blue", fontSize: "12px" } : { color: "green", fontSize: "12px" }}> {index < 2 ? "Ambassador" : "Customer"}</span>
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {ref.createAt || "Recently"}
                                    </Text>
                                </VStack>
                                <HStack spacing={8}>
                                    <Badge
                                        colorScheme={ref.payment === 1 ? "gray" : ref.payment === 4 ? "green" : "blue"}
                                        variant="subtle"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        textTransform="capitalize"
                                    >
                                        {ref.payment === 1 ? "Pending" : "Active"}
                                    </Badge>
                                </HStack>
                            </Flex>
                            {index < referrals.length - 1 && <Divider />}
                        </Box>
                    ))}
                    {referrals.length === 0 && (
                        <Text color="gray.500" py={4} textAlign="center">
                            No recent referrals found.
                        </Text>
                    )}
                </VStack>
            </VStack>
        </Box>
    );
}
