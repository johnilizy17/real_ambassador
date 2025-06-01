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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Flex,
    Img,
    Text
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function OfficerTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [type, setType] = useState("")

    const data = [{
        date: "1/06/2025",
        name: "Alex Ojo",
        no: "30",
        action: "Completed"
    }, {
        date: "1/06/2025",
        name: "Frances Keyinde",
        no: "12",
        action: "Completed"
    },]

    const addressData = [{ address: "lagos, nigeria", name: "Alex" }, { address: "ibadan, nigeria", name: "John" }, { address: "ojo lagos, nigeria", name: "Ojo" }]

    function ViewComponent() {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="519px" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="500" alignItems="center">Request #2019393</ModalHeader>
                    <ModalBody>
                        {type === "Approve" ?
                            <>
                                <Text fontSize="14px" fontWeight="600"  >
                                    Assign Verification Officer Address
                                </Text>
                                {addressData.map((a: any, b: number) => (
                                    <Box
                                        key={b}
                                        width="100%"
                                        border="1px solid"
                                        borderColor="gray.300"
                                        borderRadius="6px"
                                        padding="10px"
                                        backgroundColor="gray.50"
                                        fontSize="14px"
                                    >
                                        <Flex alignItems="center" justifyContent="space-between">
                                            <Flex alignItems="center">
                                                <Box
                                                    backgroundColor="#fff7c7"
                                                    border="1px solid #f0e090"
                                                    borderRadius="4px"
                                                    padding="4px 8px"
                                                    fontWeight="bold"
                                                    color="black"
                                                >
                                                    {b}
                                                </Box>
                                                <Box marginLeft="10px">
                                                    <Text fontWeight="bold">{a.address}</Text>
                                                    <Text color="gray.600">
                                                        {a.name}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Button
                                                backgroundColor="gray.200"
                                                color="gray.700"
                                                borderRadius="4px"
                                                padding="6px 12px"
                                                _hover={{ backgroundColor: "gray.300" }}
                                            >
                                                Assign
                                            </Button>
                                        </Flex>
                                    </Box>))}
                            </> :
                            <>
                                <Text fontSize="14px" fontWeight="600"  >
                                    Verification Officer Information
                                </Text>
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Tbody>
                                            <Tr>
                                                <Td w="50%" pt="0px" pl="0px">
                                                    <Box color="#667085" fontSize="14px">Name</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >Allen Tobi</Box>
                                                </Td>
                                                <Td pt="0px">
                                                    <Box color="#667085" fontSize="14px">Email</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >Allen info@youtechng.comTobi</Box>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td w="50%" pt="0px" pl="0px">
                                                    <Box color="#667085" fontSize="14px">Phone Number</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >+2347047070390</Box>
                                                </Td>
                                                <Td pt="0px">
                                                    <Box color="#667085" fontSize="14px">Date of Incident</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >11/06/2024 - 10:15AM</Box>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td w="50%" pt="0px" pl="0px">
                                                    <Box color="#667085" fontSize="14px">State</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >Lagos</Box>
                                                </Td>
                                                <Td pt="0px">
                                                    <Box color="#667085" fontSize="14px">LGA</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >KOSOFE</Box>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td w="50%" pt="0px" pl="0px">
                                                    <Box color="#667085" fontSize="14px">Incident Description</Box>
                                                    <Box mt="5px" fontSize="14px" fontWeight="400" >Car Accident</Box>
                                                </Td>
                                                <Td pt="0px">
                                                    <Box color="#667085" fontSize="14px">Address</Box>
                                                    <Box mt="5px" color="#2766AD" fontSize="14px" fontWeight="400" >8721, Millenium Estate,
                                                        Ojokoro, Ifo LGA, Ogun State </Box>
                                                </Td>
                                            </Tr>

                                        </Tbody>
                                    </Table>
                                </TableContainer>
                                <Center justifyContent="space-between" mt="40px">
                                    <Button colorScheme='white' border="1px solid #DADFDB" color="#667085" mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button variant='blue' bg={COLORS.blue} color={COLORS.white}>Delete</Button>
                                </Center>
                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }





    return (
        <>
            <Box overflow="scroll" bg={COLORS.white}>
                <TableContainer overflow="scroll">
                    <Table size='sm' variant='striped' colorScheme='gray' >
                        <Thead>
                            <Tr h="75px">
                                <Th>Date</Th>
                                <Th>Name of Officer</Th>
                                <Th>Number of Address Verified</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((a: any, b: number) => (
                                <Tr key={b} h="75px">
                                    <Td>{a.date}</Td>
                                    <Td>{a.name}</Td>
                                    <Td>{a.no}</Td>
                                    <Td>
                                        <Flex>
                                            <Button onClick={() => {
                                                setType("Approve")
                                                onOpen()
                                            }} w="auto" p="10px" fontWeight="600" ml="8px" fontSize="13px" border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="#FAFAFA" borderRadius="5px">
                                                Assignment
                                            </Button>
                                            <Button onClick={() => {
                                                setType("Reject")
                                                onOpen()
                                            }} w="auto" p="10px" colorScheme='red' fontWeight="600" ml="8px" fontSize="13px" border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="red" borderRadius="5px">
                                                Delete
                                            </Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <ViewComponent />
            </Box>
        </>
    )
}