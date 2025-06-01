import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function AddressHeader() {

    return (
        <Center flexDir={"row"} w="full" p={["20px", "20px", "20px", "30px"]} pt={["100px", "100px", "100px", "0px"]} alignItems={"center"} justifyContent={"space-between"}>
            <Box color={COLORS.black} fontWeight="500" textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]} >Addresses </Box>
            <Button colorScheme="white" border="1px solid #DCDCDC" bg="#fff"  fontWeight="500"  w="128px" h="40px">
                <Center>
                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z" fill="#898989" />
                    </svg>

                    <Box ml="12px" color={COLORS.black}>
                        Download
                    </Box>
                </Center>
            </Button>
        </Center>
    )
}