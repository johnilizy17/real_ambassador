import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react';
import React from 'react';

export default function UserVisibility() {

    return (
        <Box >
            <Flex px={["4", "4", "8"]} py="4" w="full" borderBottomWidth="thin" align="center">
                <Box mr="4" w="full" flex="1">
                    <Heading fontWeight="normal" fontSize="lg">Visibility</Heading>
                </Box>
            </Flex>
            <Box px={["4", "4", "8"]} pt="20px">
                <Text fontSize="sm" color="gray.500">Decide who can view the address to protect personal or sensitive information. Publicly visible addresses might invite privacy issues, while restricted visibility can enhance security.</Text>
            </Box>
            <Box px={["4", "4", "8"]}>
                <Select placeholder='Select visibility type' size='md'>
                    <option label='Public' value="Public" />
                    <option label='Private' value="Private" />
                    <option label='Only People i give access to' value="Only People i give access to" />
                </Select>
            </Box>
        </Box>
    )
}