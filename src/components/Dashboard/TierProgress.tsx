import { Box, Flex, Text, VStack, Progress, SimpleGrid, Center } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "@/utils/Theme";
import { useSelector } from "react-redux";

export default function TierProgress() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    const tiers = [
        { name: "Bronze", rate: "5%", color: "orange.400", id: 2 },
        { name: "Silver", rate: "10%", color: "blue.400", active: true, id: 3 },
        { name: "Gold", rate: "15%", color: "yellow.400", id: 4 },
    ];

    return (
        <Box bg="white" p={8} borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <VStack align="stretch" spacing={6}>
                <Flex justify="space-between" align="end">
                    <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="700" color="gray.900">
                            Tier Progress
                        </Text>
                        <Text fontSize="sm" fontWeight="600" color="gray.500">
                            {tiers.map((a, b) => {
                                if (user.payment === b) {
                                    return a.name
                                }
                            })}
                        </Text>
                    </VStack>

                </Flex>

                <Box>
                    <Progress
                        value={96}
                        size="md"
                        borderRadius="full"
                        colorScheme="blue"
                        bg="gray.100"
                        sx={{
                            '& > div': {
                                backgroundColor: COLORS.brand_blue,
                            },
                        }}
                    />
                    <Text mt={3} fontSize="sm" color="gray.500">
                        You're 96% of the way to Gold tier! Just 1 more referral to unlock 10% commission.
                    </Text>
                </Box>

                <SimpleGrid columns={[2, 2, 4]} spacing={4}>
                    {user && tiers.map((tier, index) => (
                        <Box
                            key={index}
                            p={4}
                            borderRadius="lg"
                            bg={tier.id === user.payment ? "blue.50" : "gray.50"}
                            border="2px solid"
                            borderColor={tier.id === user.payment ? COLORS.brand_blue : "transparent"}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{ bg: tier.id === user.payment ? "blue.50" : "gray.100" }}
                        >
                            <VStack spacing={1}>
                                <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
                                    {tier.name}
                                </Text>
                                <Text fontSize="xl" fontWeight="800" color={tier.active ? COLORS.brand_blue : "gray.700"}>
                                    {tier.rate}
                                </Text>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}
