import { Box, Container, SimpleGrid, VStack, Text, HStack, Link, Img, Divider } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
    return (
        <Box bg="#F9FAFB" py={16}>
            <Container maxW="container.xl">
                <SimpleGrid columns={[1, 2, 4]} spacing={10} mb={12}>
                    <VStack align="start" spacing={6}>
                        <Img h="40px" src="/logo/logo_blue.png" alt="logo" />
                        <Text color="gray.600" fontSize="sm">
                            Gateway to better life and with future sustainance.
                            Empowering partners to grow and earn together.
                        </Text>
                    </VStack>

                    <VStack align="start" spacing={4}>
                        <Text fontWeight="bold" color="gray.900">Support</Text>
                        <VStack align="start" spacing={2}>
                            <Link fontSize="sm" color="gray.600" href="#">FAQ</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Contact Us</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Help Center</Link>
                        </VStack>
                    </VStack>

                    <VStack align="start" spacing={4}>
                        <Text fontWeight="bold" color="gray.900">Legal</Text>
                        <VStack align="start" spacing={2}>
                            <Link fontSize="sm" color="gray.600" href="#">Terms of Service</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Privacy Policy</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Partner Agreement</Link>
                        </VStack>
                    </VStack>

                    <VStack align="start" spacing={4}>
                        <Text fontWeight="bold" color="gray.900">Company</Text>
                        <VStack align="start" spacing={2}>
                            <Link fontSize="sm" color="gray.600" href="#">About ABN Partners</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Careers</Link>
                            <Link fontSize="sm" color="gray.600" href="#">Blog</Link>
                        </VStack>
                    </VStack>
                </SimpleGrid>

                <Divider borderColor="gray.200" mb={8} />

                <HStack justify="space-between" wrap="wrap" spacing={4}>
                    <Text fontSize="xs" color="gray.500">
                        © 2026 ABN Partners. All rights reserved.
                    </Text>
                    <HStack spacing={6}>
                        <Link fontSize="xs" color="gray.500" href="#">Facebook</Link>
                        <Link fontSize="xs" color="gray.500" href="#">Twitter</Link>
                        <Link fontSize="xs" color="gray.500" href="#">LinkedIn</Link>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    );
}