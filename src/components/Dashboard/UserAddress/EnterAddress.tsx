import { Box, Button, Center, Flex, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function EnterAddress() {

    const router = useRouter()

    return (
        <Flex position="relative" flexDir={["column", "column", "column", "row"]} >
            <Center flexDir={"column"} h="100vh" w="full" overflow={"hidden"}>
                <Box color="#2766AD" mb="20px" fontWeight="800" fontSize="24px">Create your Address</Box>
                <Box>
                    <Img w={["full", "600px"]} src="/icon/world.png" />
                </Box>
            </Center>
            <Center w="full" p="20px" position="absolute" bottom="0px">
                <Button onClick={()=>router.push("/dashboard/user/claim/addressForm")} className="btn" h="50px" id="secondaryBtn">
                    Get your Address
                </Button>
            </Center>
        </Flex>
    )
}