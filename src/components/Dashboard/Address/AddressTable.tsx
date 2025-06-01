import { COLORS } from '@/layout/Theme';
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
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';

export default function AddressTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()

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
        Verification: "active"
    },]

    return (
        <Box overflow="scroll" bg={COLORS.white}>
            <TableContainer display={["none", "none", "block"]} overflow="scroll">
                <Table size='sm' variant='striped' colorScheme='gray' >
                    <Thead>
                        <Tr h="75px">
                            <Th>Name</Th>
                            <Th w="200px">Address</Th>
                            <Th>Code</Th>
                            <Th>Date</Th>
                            <Th>Verification Officer</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((a: any, b: number) => (
                            <Tr key={b} h="75px">
                                <Td>inches</Td>
                                <Td>18721, Millenium Estate,
                                    Ojokoro, Ifo LGA, Ogun State</Td>
                                <Td>LAIK-34567</Td>
                                <Td>08/96/2024</Td>
                                <Td>Muhammadu Buhari</Td>
                                <Td>
                                    <Box>
                                        <Center>
                                            <Center borderRadius="16px" bg={a.Verification === "Pending" ? "#FAF4EE" : "#E7FCF2"} color={a.Verification === "Pending" ? "#F58E18" : "#32A071"} h="26px"  fontWeight="500" fontSize="12px" w="80px" >
                                                {a.Verification}
                                            </Center>
                                            <Button onClick={onOpen} w="57.6px" fontWeight="600" ml="8px" fontSize="13px"  border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="#FAFAFA" borderRadius="5px">
                                                Manage
                                            </Button>
                                        </Center>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}