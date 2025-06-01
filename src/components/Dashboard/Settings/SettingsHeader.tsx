import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function SettingsHeader() {

    return (
        <Center flexDir={["column", "column", "column", "row"]} mt={["70px", "70px", "70px", "0px"]} alignItems={["start","start","start","center"]} justifyContent={["flex-start", "flex-start", "flex-start", "space-between"]}>
            <Box mt="24px"  p={["20px", "20px", "20px", "30px"]}>
                <Box color={COLORS.black} fontWeight="700" mb={["2px", "2px", "2px", "4px"]} textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]} >Hi Allen Pena </Box>
                <Box fontWeight="400" color="#667085" fontSize="14px"  >Welcome back</Box>
            </Box>
            <Center  p={["20px", "20px", "20px", "30px"]} mt="24px" w={["100vw", "100vw", "100vw", "300px"]} justifyContent={["space-between"]}>
                <Button borderWidth="1px" w="131px" h="40px" borderColor="#DCDCDC" bg={"transparent"} color={COLORS.black} fontWeight="700"  mr="20px">
                    <svg width="24" style={{marginLeft:5}} height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19 9.5H15V3.5H9V9.5H5L12 16.5L19 9.5ZM5 18.5V20.5H19V18.5H5Z" fill="#898989" />
                    </svg>
                    Download
                </Button>
                <Button colorScheme="blue" bg={COLORS.blue} color={COLORS.white} fontWeight="700"  w="128px" h="40px">
                    + Add Staff
                </Button>
            </Center>
        </Center>
    )
}