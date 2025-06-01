import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function ClaimHeader({title}:{title:string}) {

    const router = useRouter();

    return (
        <Center flexDir={["column", "column", "column", "row"]} mt={["70px", "70px", "70px", "70px"]} alignItems={["start", "start", "start", "center"]} justifyContent={["flex-start", "flex-start", "flex-start", "space-between"]}>
            <Box mt="24px" p={["20px", "20px", "20px", "30px"]}>
                <Box color={COLORS.black} fontWeight="500" mb={["2px", "2px", "2px", "4px"]} textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]} >{title} Address </Box>
                <Box fontWeight="400" color="#667085" fontSize="14px"  >{title} with ease with G-AIMS</Box>
            </Box>
            <Center p={["20px", "20px", "20px", "30px"]} mt={["0px", "0px", "0px", "24px"]} w={["100vw", "100vw", "100vw", "auto"]} justifyContent={["space-between"]}>
                <Button onClick={() => router.push("/dashboard/user/claim")}
                    colorScheme="blue" bg={COLORS.blue} color={COLORS.white} fontWeight="500"  w="auto" h="40px">
                    + New Address
                </Button>
            </Center>
        </Center>
    )
}