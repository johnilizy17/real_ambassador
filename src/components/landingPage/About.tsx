import { Box, Center, Flex, Img, Heading, Text, Container, SimpleGrid, Icon } from "@chakra-ui/react";
import React from "react";
import { UserPlus, Share2, DollarSign } from "lucide-react";
import { VStack } from "@chakra-ui/react";
import { COLORS } from "../utils/theme";

export default function About() {
    const steps = [
        {
            title: "Sign Up",
            description: "Create your agent account in minutes with a simple registration process.",
            icon: UserPlus,
        },
        {
            title: "Refer",
            description: "Share your unique referral link or code with businesses in your network.",
            icon: Share2,
        },
        {
            title: "Earn",
            description: "Receive competitive commissions deposited securely to your account.",
            icon: DollarSign,
        }
    ];

    return (
        <Box py={["60px", "100px"]} bg="white">
            <Container maxW="container.xl">
                <VStack spacing={4} mb={16} textAlign="center">
                    <Heading as="h2" size="xl" color="#1A202C">
                        How It Works
                    </Heading>
                </VStack>

                <SimpleGrid columns={[1, 1, 3]} spacing={10}>
                    {steps.map((step, index) => (
                        <Box
                            key={index}
                            textAlign="center"
                            p={8}
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="gray.100"
                            _hover={{ shadow: "xl", transform: "translateY(-5px)" }}
                            transition="all 0.3s"
                        >
                            <Center
                                w="64px"
                                h="64px"
                                bg={COLORS.blue}
                                color={COLORS.brand_blue}
                                borderRadius="full"
                                mx="auto"
                                mb={6}
                            >
                                <Icon as={step.icon} boxSize={6} />
                            </Center>
                            <Heading as="h3" size="md" mb={4}>
                                {step.title}
                            </Heading>
                            <Text color="gray.600">
                                {step.description}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}

