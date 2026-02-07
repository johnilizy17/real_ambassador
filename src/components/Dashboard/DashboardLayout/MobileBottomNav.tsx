import {
    Box,
    Flex,
    Icon,
    Text,
    VStack,
    useDisclosure,
    useToast,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Divider,
    HStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NavDataUser } from "./User/NavDataUser";
import { MoreHorizontal, LogOut, ChevronRight } from "lucide-react";
import { COLORS } from "@/utils/Theme";
import LogoutModal from "./LogoutModal";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/auth/authSlice";

export default function MobileBottomNav() {
    const router = useRouter();
    const dispatch = useDispatch();
    const toast = useToast();
    const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
    const { isOpen: isMoreOpen, onOpen: onMoreOpen, onClose: onMoreClose } = useDisclosure();

    // First 4 items are displayed directly
    const primaryItems = NavDataUser.slice(0, 4);
    // The rest go into the "More" menu
    const moreItems = NavDataUser.slice(4);

    const handleLogout = () => {
        router.push("/auth/login");
        dispatch(logoutUser("") as any);
        toast({
            position: "top-right",
            description: "Successfully Logged out",
            status: "success",
            isClosable: true,
        });
        onLogoutClose();
        onMoreClose();
    };

    return (
        <>
            <Box
                display={["block", "block", "block", "none"]}
                pos="fixed"
                bottom="0"
                left="0"
                right="0"
                bg="white"
                borderTop="1px solid"
                borderColor="gray.100"
                zIndex={100}
                pb="max(10px, env(safe-area-inset-bottom))"
            >
                <Flex justify="space-around" align="center" h="65px">
                    {primaryItems.map((item, index) => {
                        const isActive = router.pathname === item.nav;
                        return (
                            <VStack
                                key={index}
                                spacing={0.5}
                                as="button"
                                flex="1"
                                onClick={() => router.push(item.nav)}
                                color={isActive ? COLORS.brand_blue : "gray.400"}
                            >
                                <Icon as={item.icon} boxSize={5} />
                                <Text fontSize="10px" fontWeight={isActive ? "700" : "500"}>
                                    {item.item}
                                </Text>
                            </VStack>
                        );
                    })}

                    <VStack
                        spacing={0.5}
                        as="button"
                        flex="1"
                        onClick={onMoreOpen}
                        color={moreItems.some(item => router.pathname === item.nav) ? COLORS.brand_blue : "gray.400"}
                    >
                        <Icon as={MoreHorizontal} boxSize={5} />
                        <Text fontSize="10px" fontWeight={moreItems.some(item => router.pathname === item.nav) ? "700" : "500"}>
                            More
                        </Text>
                    </VStack>
                </Flex>
            </Box>

            {/* More Drawer */}
            <Drawer placement="bottom" onClose={onMoreClose} isOpen={isMoreOpen}>
                <DrawerOverlay />
                <DrawerContent borderTopRadius="20px" maxH="80vh">
                    <DrawerCloseButton mt={2} />
                    <DrawerHeader borderBottomWidth="0px" pt={6} pb={2}>
                        <Text fontSize="lg" fontWeight="700" color="gray.900">
                            Menu
                        </Text>
                    </DrawerHeader>
                    <DrawerBody pb={8}>
                        <VStack align="stretch" spacing={1}>
                            {moreItems.map((item, index) => {
                                const isActive = router.pathname === item.nav;
                                return (
                                    <HStack
                                        key={index}
                                        as="button"
                                        w="full"
                                        p={4}
                                        borderRadius="xl"
                                        spacing={4}
                                        bg={isActive ? "blue.50" : "transparent"}
                                        color={isActive ? COLORS.brand_blue : "gray.700"}
                                        onClick={() => {
                                            router.push(item.nav);
                                            onMoreClose();
                                        }}
                                        _active={{ bg: "gray.100" }}
                                    >
                                        <Icon as={item.icon} boxSize={5} />
                                        <Text fontWeight={isActive ? "700" : "600"} fontSize="md" flex="1" textAlign="left">
                                            {item.item}
                                        </Text>
                                        <Icon as={ChevronRight} boxSize={4} color="gray.400" />
                                    </HStack>
                                );
                            })}

                            <Divider my={4} borderColor="gray.100" />

                            <HStack
                                as="button"
                                w="full"
                                p={4}
                                borderRadius="xl"
                                spacing={4}
                                color="red.600"
                                onClick={onLogoutOpen}
                                _active={{ bg: "red.50" }}
                            >
                                <Icon as={LogOut} boxSize={5} />
                                <Text fontWeight="600" fontSize="md" flex="1" textAlign="left">
                                    Log Out
                                </Text>
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={onLogoutClose}
                onConfirm={handleLogout}
            />
        </>
    );
}
