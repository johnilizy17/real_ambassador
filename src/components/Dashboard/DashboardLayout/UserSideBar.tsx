import { Box, Flex, Img, useDisclosure } from "@chakra-ui/react";
import React from "react";
import SearchTab from "./SearchTab";
import DashBoardNav from "./User/DashBoardNav";
import UserNavBar from "./User/UserNavBar";
import MobileBottomNav from "./MobileBottomNav";
import VerificationAlert from "./VerificationAlert";
import UserDashboardAuth from "@/Auth/UserDashboardAuth";
import MarqueeText from "@/components/layout/MarqueeText";

export default function UserSideBar({ children }: any) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <UserDashboardAuth>
            <Flex bg="#FAFAFA" zIndex={4} pos="fixed" h="100vh">
                <Box display={["block", "block", "block", "none"]}>
                    <DashBoardNav />
                </Box>
                <UserNavBar />
                <Box display={["none", "none", "none", "block"]}>
                    <SearchTab />
                </Box>
                <Box>
                    <Box h="100vh" className="dashboard_user" overflow="scroll">
                        <Box pb={["80px", "80px", "80px", "60px"]} w="full">
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <MobileBottomNav />
        </UserDashboardAuth>
    )
} 