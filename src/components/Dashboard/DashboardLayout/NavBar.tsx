import { Box, Flex, Icon, Img, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavData } from './NavData';
import { useRouter } from 'next/router';
import { COLORS } from '@/utils/Theme';
import { LogOut } from 'lucide-react';

export default function NavBar() {
    const router = useRouter();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const index = NavData.findIndex(item => router.pathname === item.nav);
        if (index !== -1) setActive(index);
    }, [router.pathname]);

    const handleLogout = () => {
        // Implement logout logic or redirect to login
        router.push('/auth/login');
    };

    return (
        <Flex
            display={["none", "none", "none", "flex"]}
            w="260px"
            h="100vh"
            bg="#fff"
            flexDirection="column"
            borderRight="1px solid"
            borderColor="gray.100"
            py={8}
            px={4}
        >
            <Box mb={10} px={2}>
                <Img h="40px" src="/logo/logo_blue.png" alt="logo" />
            </Box>

            <VStack align="stretch" spacing={1} flex="1">
                <Text
                    fontSize="xs"
                    fontWeight="600"
                    color="gray.400"
                    mb={4}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                >
                    Menu
                </Text>

                {NavData.map((item: any, index: number) => {
                    const isActive = index === active;
                    return (
                        <Flex
                            key={index}
                            onClick={() => router.push(item.nav)}
                            align="center"
                            px={4}
                            py={3}
                            borderRadius="lg"
                            bg={isActive ? "blue.50" : "transparent"}
                            color={isActive ? COLORS.brand_blue : "gray.500"}
                            cursor="pointer"
                            _hover={{ bg: isActive ? "blue.50" : "gray.50" }}
                            transition="all 0.2s"
                        >
                            <Icon as={item.icon} boxSize={5} mr={4} />
                            <Text fontWeight={isActive ? "600" : "500"} fontSize="sm">
                                {item.item}
                            </Text>
                        </Flex>
                    );
                })}
            </VStack>

            <Box mt="auto">
                <Flex
                    onClick={handleLogout}
                    align="center"
                    px={4}
                    py={3}
                    borderRadius="lg"
                    color="red.500"
                    cursor="pointer"
                    _hover={{ bg: "red.50" }}
                    transition="all 0.2s"
                >
                    <Icon as={LogOut} boxSize={5} mr={4} />
                    <Text fontWeight="600" fontSize="sm">
                        Logout
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
}