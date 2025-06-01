import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function SettingHeader() {

    return (
        <Center flexDir={"row"} w="full" p={["20px", "20px", "20px", "30px"]} pt={["100px", "100px", "100px", "0px"]} alignItems={"center"} justifyContent={"space-between"}>
            <Box color={COLORS.black} fontWeight="700" textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]} >Settings </Box>
         </Center>
    )
}