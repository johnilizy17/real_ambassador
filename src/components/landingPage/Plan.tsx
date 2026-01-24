import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Icon, Button, Badge } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../utils/Theme";
import { Check } from "lucide-react";
import { cashFormat } from "@/utils/cashformat";

export default function Plan() {
    const tiers = [
        {
            name: "Tier 1",
            interest: "5%",
            price: 5000,
            features: [
                "Basic dashboard access",
                "Referral tracking",
                "Email support",
                "Monthly reports"
            ]
        },
        {
            name: "Tier 2",
            interest: "10%",
            price: 15000,
            features: [
                "Everything in Tier 1",
                "Priority support",
                "Advanced analytics",
                "Weekly reports",
                "Marketing materials"
            ]
        },
        {
            name: "Tier 3",
            interest: "15%",
            price: 50000,
            features: [
                "Everything in Tier 2",
                "Dedicated account manager",
                "Custom reporting",
                "API access",
                "Co-marketing opportunities"
            ],
            highlighted: true
        }
    ];

    return (
        <Box py={["60px", "100px"]} bg="gray.50" id="plans">
            <Container maxW="container.xl">
                <VStack spacing={4} mb={16} textAlign="center">
                    <Badge colorScheme="blue" borderRadius="full" px={4} py={1} fontSize="xs" fontWeight="bold">
                        Our Pricing
                    </Badge>
                    <Heading as="h2" size="xl" color="#1A202C">
                        Choose the best Tier that suites you
                    </Heading>
                    <Text color="gray.600" maxW="600px">
                        Flexible commissions built for every stage — from startup to scale, no hidden fees.
                    </Text>
                </VStack>

                <SimpleGrid columns={[1, 1, 3]} spacing={8}>
                    {tiers.map((tier, index) => (
                        <Box
                            key={index}
                            bg="white"
                            p={8}
                            borderRadius="2xl"
                            border="2px solid"
                            borderColor={tier.highlighted ? COLORS.brand_blue : "transparent"}
                            shadow={tier.highlighted ? "2xl" : "lg"}
                            pos="relative"
                            overflow="hidden"
                        >
                            <VStack align="start" spacing={6}>
                                <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold" fontSize="lg" color="gray.900">{tier.name}</Text>
                                    <HStack align="baseline">
                                        <Text fontSize="4xl" fontWeight="800" color="#003580">{tier.interest}</Text>
                                        <Text color="gray.500" fontSize="sm">/referral</Text>
                                    </HStack>
                                    <Text color="gray.600" fontSize="sm">
                                        Great for partners just getting started.
                                    </Text>
                                </VStack>

                                <Box w="full" h="1px" bg="gray.100" />

                                <VStack align="start" spacing={4} w="full">
                                    <Text fontWeight="bold" fontSize="xs" color="gray.900" textTransform="uppercase" letterSpacing="wider">
                                        What's included
                                    </Text>
                                    {tier.features.map((feature, idx) => (
                                        <HStack key={idx} align="start" spacing={3}>
                                            <Icon as={Check} color="green.500" mt={1} />
                                            <Text fontSize="sm" color="gray.700">{feature}</Text>
                                        </HStack>
                                    ))}
                                </VStack>

                                <Button
                                    w="full"
                                    h="50px"
                                    bg={tier.highlighted ? COLORS.brand_blue : "white"}
                                    color={tier.highlighted ? "white" : COLORS.brand_blue}
                                    variant={tier.highlighted ? "solid" : "outline"}
                                    borderColor={COLORS.brand_blue}
                                    _hover={{ bg: tier.highlighted ? "blue.700" : "blue.50" }}
                                    onClick={() => window.location.href = "/auth/signup"}
                                >
                                    Get Started
                                </Button>
                            </VStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}