import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Text, Input } from "@chakra-ui/react";
import React from "react";

export default function PeopleHeader() {
    return (
        <Center flexDir={"row"} w="full" p={["20px", "20px", "20px", "30px"]} pt={["100px", "100px", "100px", "0px"]} alignItems={"center"} justifyContent={"space-between"}>
            <Box color={COLORS.black} fontWeight="500" textAlign={"start"} fontSize={["20px", "20px", "20px", "30px"]}>People </Box>
            <Flex> {/* Use Flex to arrange buttons side-by-side */}
                <Button colorScheme="white" border="1px solid #DCDCDC" bg="#fff" fontWeight="500" w="128px" h="40px">
                    <Center>
                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z" fill="#898989" />
                        </svg>
                        <Box ml="12px" color={COLORS.black}>
                            Download
                        </Box>
                    </Center>
                </Button>
                <Box ml={4}> {/* Add some spacing between buttons */}
                    <label htmlFor="upload-button"> {/* Use label to associate with input */}
                        <Button colorScheme="gray" bg="#fff" fontWeight="500" w="128px" h="40px">
                            <Center>
                                <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z" fill="#898989" />
                                </svg>
                                <Box ml="12px" color={COLORS.black}>
                                    Upload
                                </Box>
                            </Center>
                        </Button>
                    </label>
                    <Input type="file" id="upload-button" display="none" onChange={(e) => { /* Handle file upload here */ }} /> {/* Hidden file input */}
                </Box>
            </Flex>
        </Center>
    );
}
