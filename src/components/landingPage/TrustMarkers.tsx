import { Box, Container, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { ShieldCheck, Clock, TrendingUp } from "lucide-react";
import React from "react";

export default function TrustMarkers() {
    const markers = [
        {
            icon: ShieldCheck,
            label: "Secure & Transparent",
        },
        {
            icon: Clock,
            label: "Fast Payouts",
        },
        {
            icon: TrendingUp,
            label: "Growing Network",
        },
    ];

    return (
        <Box py={10} bg="white" borderTop="1px solid" borderColor="gray.50">
            <Container maxW="container.xl">
                <Flex
                    direction={["column", "row"]}
                    justify="center"
                    align="center"
                    gap={[8, 20]}
                    wrap="wrap"
                >
                    {markers.map((marker, index) => (
                        <HStack key={index} spacing={4} align="center">
                            <Flex
                                w="48px"
                                h="48px"
                                bg="#E8F5E9"
                                borderRadius="full"
                                align="center"
                                justify="center"
                            >
                                <Icon as={marker.icon} color="#2E7D32" boxSize={5} />
                            </Flex>
                            <Text fontWeight="600" color="gray.700" fontSize="md">
                                {marker.label}
                            </Text>
                        </HStack>
                    ))}
                </Flex>
            </Container>
        </Box>
    );
}
