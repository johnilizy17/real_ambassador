import { Box, Center, Flex } from '@chakra-ui/react';
import React from 'react';

export default function ImageAddressUpload({ page }: any) {

    return (
        <Box mt="30px" display={page === 4 ? "inherit" : "none"}>
            <Flex justifyContent="space-between" flexDir={["column", "column", "column", "row"]}>
                <Box>
                    <Box fontWeight="800" fontSize="18px" mb="10px">Front Image</Box>
                    <Center cursor="pointer" h="300px" mb="30px" w={["full", "400px"]} borderRadius="15px" _hover={{ background: "#2766AD" }} bg="white">
                        <svg width="44" height="44" viewBox="0 0 24 24"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                    </Center>
                </Box>
                <Box>
                    <Box fontWeight="800" fontSize="18px" mb="10px">Back Image</Box>
                    <Center cursor="pointer" h="300px" mb="30px" w={["full", "400px"]} borderRadius="15px" _hover={{ background: "#2766AD" }} bg="white">
                        <svg width="44" height="44" viewBox="0 0 24 24"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                    </Center>
                </Box>
            </Flex>
            <Flex justifyContent="space-between" flexDir={["column", "column", "column", "row"]}>
                <Box>
                    <Box fontWeight="800" fontSize="18px" mb="10px">Left Image</Box>
                    <Center cursor="pointer" h="300px" mb="30px" w={["full", "400px"]} borderRadius="15px" _hover={{ background: "#2766AD" }} bg="white">
                        <svg width="44" height="44" viewBox="0 0 24 24"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                    </Center>
                </Box>
                <Box>
                    <Box fontWeight="800" fontSize="18px" mb="10px">Right Image</Box>
                    <Center cursor="pointer" h="300px" mb="30px" w={["full", "400px"]} borderRadius="15px" _hover={{ background: "#2766AD" }} bg="white">
                        <svg width="44" height="44" viewBox="0 0 24 24"><path d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                    </Center>
                </Box>
            </Flex>
        </Box>

    )
}