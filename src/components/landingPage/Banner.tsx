import { Box, Button, Center, Img, Container, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../utils/theme";

export default function Banner() {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    return (
        <Box
            pt={["120px", "150px"]}
            pb={["60px", "100px"]}
            bgImage={["/images/mask.png", "/images/mask (1).png"]}
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            overflow="hidden"
        >
            <Container maxW="container.xl">
                <Flex direction={["column", "column", "row"]} alignItems="center" gap={10}>
                    <Box flex="1" textAlign={["center", "center", "left"]}>
                        <Heading
                            as="h1"
                            fontSize={["40px", "50px", "64px"]}
                            lineHeight="1.1"
                            color="#003580"
                            fontWeight="800"
                            mb={6}
                        >
                            Earn with ABN Partners
                        </Heading>
                        <Text fontSize={["18px", "20px"]} color="gray.600" mb={8} maxW="500px">
                            Refer businesses, track performance, and get paid seamlessly
                        </Text>

                        <Stack direction={["column", "row"]} spacing={4} justify={["center", "center", "flex-start"]}>
                            {user && user.id ? (
                                <Button
                                    onClick={() => router.push("/dashboard")}
                                    size="lg"
                                    h="60px"
                                    px={10}
                                    bg={COLORS.brand_blue}
                                    color="white"
                                    _hover={{ bg: "blue.700" }}
                                    borderRadius="lg"
                                >
                                    Go to Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => router.push("/auth/signup")}
                                        size="lg"
                                        h="56px"
                                        px={10}
                                        bg={COLORS.brand_blue}
                                        color="white"
                                        _hover={{ bg: "blue.700" }}
                                        borderRadius="lg"
                                    >
                                        Become a Partner
                                    </Button>
                                    <Button
                                        onClick={() => router.push("/auth/login")}
                                        size="lg"
                                        h="56px"
                                        px={10}
                                        variant="outline"
                                        borderColor="gray.200"
                                        bg="white"
                                        color="gray.700"
                                        _hover={{ bg: "gray.50" }}
                                        borderRadius="lg"
                                    >
                                        Login
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Box>

                    <Box flex="1" pos="relative" display={["none", "none", "block"]}>
                        {/* This simulates the collage in the design image */}
                        <Box pos="relative" w="full" h="500px">
                        </Box>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}