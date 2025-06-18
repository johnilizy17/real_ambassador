import { Box, Center, Flex, Img } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../utils/theme";
import { cashFormat } from "@/utils/cashformat";

export default function About() {

    return (
        <Box bg={COLORS.blue} p={["20px", "20px", "20px", "20px"]} pb={["80px", "80px", "80px", "20px"]} pl={["20px", "20px", "20px", "120px"]} pr={["20px", "20px", "20px", "120px"]}>
            <Center flexDir={"column"}>
                <Box h="121px" p="16px" w={["full", "full", "full", "350px"]} bg="#F5F5F5" borderRadius={"30.94px"}>
                    <Center justifyContent={"space-between"}>
                        <Img w="100px" src="/images/logo2.png" />
                        <Box fontSize={"11px"} color={COLORS.blue}>
                            Now
                        </Box>
                    </Center>
                    <Box fontSize="14px" color={"#000"} mt="16px" fontWeight={"bold"}>
                        Credit Alert
                    </Box>
                    <Box fontSize="10px" color={"#000"}>
                        {cashFormat(100000)} has been credited to your account sade
                    </Box>
                </Box>
                <Box color="#fff" mt="16px" fontSize="20px" mb="16px">
                    Welcome to AB Narinohs
                </Box>
                <Box fontWeight={"400"} w={["full","full","full","500px"]} textAlign="center" color="#fff" lineHeight={"131%"}>
                    Are you passionate about making an impact, connecting with your community, and representing a bold, forward-thinking brand? The ABN Nariohs Partner Program is your chance to be part of something bigger — and be rewarded for it.
                </Box>
            </Center>
        </Box>
    )
}