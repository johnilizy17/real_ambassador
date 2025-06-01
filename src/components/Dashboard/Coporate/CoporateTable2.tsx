import React from 'react'
import {
    Box,
    Text,
    Card,
    Button,
    Flex,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Img,
    Select
} from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme'
import { cashFormat } from '@/utils/cashformat'

export default function CoporateTable2() {

    const data = [{
        Name: "djdnjkds",
        Address: "djdnjkds",
        Code: "djdnjkds",
        Date: "djdnjkds",
        Verification: "Pending"
    }, {
        Name: "djdnjkds",
        Address: "djdnjkds",
        Code: "djdnjkds",
        Date: "djdnjkds",
        Verification: "Success"
    },]

    return (
        <>
            <Box mt="40px">
                <Card p="16px" >
                    <Flex justifyContent={"space-between"} mb="30px">
                        <Text fontWeight="400" color={COLORS.black} fontSize="20px" >Address Verification</Text>
                        <Select w="100px" placeholder='June 8 224'>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select>
                    </Flex> <TableContainer overflow="scroll">
                        <Table size='sm' variant='striped' colorScheme='gray' >
                            <Thead>
                                <Tr h="75px">
                                    <Th>date</Th>
                                    <Th w="200px">ref</Th>
                                    <Th>Amount</Th>
                                    <Th>Token</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((a: any, b: number) => (
                                    <Tr key={b} h="75px">
                                        <Td>08/96/2024</Td>
                                        <Td>ref920001911019348</Td>
                                        <Td>{cashFormat(3000)}</Td>
                                        <Td>{cashFormat(3000)}</Td>
                                        <Td>
                                            <Box>
                                                <Center borderRadius="16px" bg={a.Verification === "Pending" ? "#FAF4EE" : "#E7FCF2"} color={a.Verification === "Pending" ? "#F58E18" : "#32A071"} h="26px"  fontWeight="500" fontSize="12px" w="80px" >
                                                    {a.Verification}
                                                </Center>

                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box >
        </>
    )
}