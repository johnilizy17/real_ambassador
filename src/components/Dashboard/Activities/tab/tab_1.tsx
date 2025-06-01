import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Center,
    Button,
    useDisclosure,
    Text
} from '@chakra-ui/react';
import { cashFormat2 } from '@/components/Util/cashformat';
import { COLORS } from '@/layout/Theme';

export default function Tab_1() {
    return (
        <Box ml={["0px","0px","30px"]}>
            <Text fontSize="14px" mt={["30px"]} fontWeight="600"  >
                About this activity
            </Text>
            <TableContainer>
                <Table variant='simple'>
                    <Tbody>
                        <Tr>
                            <Td w="50%" pt="0px" pl="0px">
                                <Box color="#667085"  fontSize="14px">User</Box>
                                <Box color={"#3676C8"} mt="5px" fontSize="14px" fontWeight="400" >evwidonor allen</Box>
                            </Td>
                            <Td pt="0px">
                                <Box color="#667085"  fontSize="14px">Email</Box>
                                <Box color="#667085" mt="5px" fontSize="14px" fontWeight="400" >info@youtechng.comTobi</Box>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td w="50%" pt="0px" pl="0px">
                                <Box color="#667085"  fontSize="14px">Role</Box>
                                <Box color="#667085" mt="5px" fontSize="14px" fontWeight="400" >admin</Box>
                            </Td>
                            <Td pt="0px">
                                <Box color="#667085"  fontSize="14px">Address</Box>
                                <Box color="#667085" mt="5px" fontSize="14px" fontWeight="400" >154.120.103.89</Box>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td w="50%" pt="0px" pl="0px">
                                <Box color="#667085"  fontSize="14px">Date</Box>
                                <Box color="#667085" mt="5px" fontSize="14px" fontWeight="400" >23 Mar, 2024 - 8:03 am</Box>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

        </Box>
    )
}