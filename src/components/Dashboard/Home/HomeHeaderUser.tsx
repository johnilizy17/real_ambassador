import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function HomeHeaderUser() {

    const router = useRouter()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    return (
        <Center flexDir={["column", "column", "column", "row"]} mt={["70px", "70px", "70px", "70px"]} alignItems={["start", "start", "start", "center"]} justifyContent={["flex-start", "flex-start", "flex-start", "space-between"]}>
            <Box mt="24px" p={["20px", "20px", "20px", "30px"]}>
                <Box color={COLORS.black} fontWeight="500" mb={["2px", "2px", "2px", "4px"]} textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]} >Hi {user.last_name} {user.first_name} </Box>
                <Box fontWeight="400" color="#667085" fontSize="14px"  >Welcome back</Box>
            </Box>
            <Center p={["20px", "20px", "20px", "30px"]} mt="24px" w={["100vw", "100vw", "100vw", "auto"]} justifyContent={["space-between"]}>
                <Button
                    onClick={() => router.push("/dashboard/user/claim")}
                    borderWidth="1px" w="auto" h="40px" borderColor="#DCDCDC" bg={"transparent"} color={COLORS.black} fontWeight="500"  mr="20px">
                    <svg width="25" height="25" fill="#000" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                    </svg>
                    <Box ml="5px">
                        Verify Address
                    </Box>
                </Button>
                <Button
                    onClick={() => router.push("/dashboard/user/claim/addressForm")}
                    colorScheme="blue" bg={COLORS.blue} color={COLORS.white} fontWeight="500"  w="auto" h="40px">
                    <svg width="25" height="25" fill="#fff" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                    <Box ml="5px">
                        New Digital Address
                    </Box>
                </Button>
            </Center>
        </Center>
    )
}