import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";
import SearchTab from "./SearchTab";
import DashboardNav from "./DashBoardNav";

export default function SideBar({ children }: any) {

    return (
        <Flex bg="#FAFAFA" pos="fixed" h="100vh">
            <Box display={["block", "block", "block", "none"]}>
                <DashboardNav />
            </Box>
            <NavBar />
            <Box>
                <Box display={["none", "none", "none", "block"]}>
                    <SearchTab />
                </Box>
                <Box h="100vh" overflow="scroll">
                 {children}
                 </Box>
            </Box>
        </Flex>
    )
} 