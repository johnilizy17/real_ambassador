import {
    Box,
    Flex,
    Icon,
    Text,
    VStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NavDataUser } from "./User/NavDataUser";
import { MoreHorizontal, LogOut } from "lucide-react";
import { COLORS } from "@/utils/Theme";
import LogoutModal from "./LogoutModal";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/auth/authSlice";

export default function MobileBottomNav() {
    const router = useRouter();
    const dispatch = useDispatch();
    const toast = useToast();
    const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();

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

                    <Menu autoSelect={false}>
                        <MenuButton flex="1">
                            <VStack spacing={0.5} color="gray.400">
                                <Icon as={MoreHorizontal} boxSize={5} />
                                <Text fontSize="10px" fontWeight="500">
                                    More
                                </Text>
                            </VStack>
                        </MenuButton>
                        <Portal>
                            <MenuList zIndex={2000} shadow="xl" borderRadius="xl" mb="10px">
                                {moreItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        icon={<Icon as={item.icon} boxSize={4} />}
                                        onClick={() => router.push(item.nav)}
                                        fontWeight="500"
                                        fontSize="sm"
                                        py={3}
                                    >
                                        {item.item}
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    icon={<Icon as={LogOut} boxSize={4} color="red.500" />}
                                    onClick={onLogoutOpen}
                                    fontWeight="600"
                                    fontSize="sm"
                                    color="red.600"
                                    py={3}
                                >
                                    Log Out
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Flex>
            </Box>

            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={onLogoutClose}
                onConfirm={handleLogout}
            />
        </>
    );
}
