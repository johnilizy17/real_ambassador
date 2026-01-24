import { Box, Button, Flex, Img, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../utils/theme";

export default function NavContent() {

    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    return (
        <Box w="full" bg={"#fff"} pos="fixed" top="0" zIndex={100} borderBottom="1px solid" borderColor="gray.100">
            <Container maxW="container.xl">
                <Flex h="80px" alignItems="center" justifyContent="space-between">
                    <Box cursor="pointer" onClick={() => router.push("/")}>
                        <Img h="40px" src="/logo/logo_blue.png" alt="logo" />
                    </Box>

                    <Flex alignItems="center" gap={4}>
                        {user && user.id ? (
                            <Button
                                onClick={() => router.push("/dashboard")}
                                bg={COLORS.brand_blue}
                                color="white"
                                _hover={{ bg: "blue.700" }}
                                borderRadius="full"
                                px={8}
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    display={["none", "flex"]}
                                    variant="ghost"
                                    onClick={() => router.push("/auth/signup")}
                                >
                                    Register
                                </Button>
                                <Button
                                    onClick={() => router.push("/auth/login")}
                                    color={COLORS.brand_blue}
                                    _hover={{ bg: "blue.100" }}
                                    borderRadius="full"
                                    px={8}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}