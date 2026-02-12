import { Box, Flex, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { COLORS } from "@/utils/Theme";
import { useSelector } from "react-redux";

export default function TierProgress() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    const tiers = [
        { name: "Realtor", rate: "10% Land Sales", color: "green.400", id: 5, benefits: "Land Sales Only" },
        { name: "Agent", rate: "40% Multi-Stream", color: "blue.400", active: true, id: 6, benefits: "Referrals, Subscriptions & Land Sales" },
    ];

    return (
        <Box bg="white" p={8} borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
            <VStack align="stretch" spacing={6}>
                <Flex justify="space-between" align="end">
                    <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="700" color="gray.900">
                            Account Type
                        </Text>
                        <Text fontSize="sm" fontWeight="600" color="gray.500">
                            {tiers.map((a, b) => {
                                if (user && user.payment === a.id) {
                                    return a.name
                                }
                            })}
                        </Text>
                    </VStack>

                </Flex>

                <Box>
                    <Text fontSize="sm" color="gray.600" mb={3}>
                        {user && user.payment === 6 ? (
                            <Text>
                                <Text as="span" fontWeight="700" color="blue.600">Agent Account Active:</Text> Earning 40% on Referrals, 40% on Subscriptions, and 10% on Land Sales.
                            </Text>
                        ) : (
                            <Text>
                                <Text as="span" fontWeight="700" color="green.600">Realtor Account Active:</Text> Earning 10% on Land Sales. Upgrade to Agent for multi-stream earnings!
                            </Text>
                        )}
                    </Text>
                </Box>

                <SimpleGrid columns={[1, 2]} spacing={4}>
                    {user && tiers.map((tier, index) => (
                        <Box
                            key={index}
                            p={5}
                            borderRadius="lg"
                            bg={user && tier.id === user.payment ? (tier.name === "Agent" ? "blue.50" : "green.50") : "gray.50"}
                            border="2px solid"
                            borderColor={user && tier.id === user.payment ? (tier.name === "Agent" ? COLORS.brand_blue : "green.500") : "transparent"}
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{ bg: tier.id === user.payment ? (tier.name === "Agent" ? "blue.50" : "green.50") : "gray.100" }}
                        >
                            <VStack spacing={2} align="start">
                                <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
                                    {tier.name}
                                </Text>
                                <Text fontSize="lg" fontWeight="800" color={tier.name === "Agent" ? COLORS.brand_blue : "green.600"}>
                                    {tier.rate}
                                </Text>
                                <Text fontSize="xs" color="gray.600">
                                    {tier.benefits}
                                </Text>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}
