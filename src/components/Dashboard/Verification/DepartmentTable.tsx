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

export default function DepartmentTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [type, setType] = useState("")

    const data = [{
        date: "Fire Services",
        description: "Business Owner",
        service: "Fire Services ",
        action: "Completed"
    }, {
        date: "Fire Services",
        description: "Business Owner",
        service: "Fire Services ",
        action: "Completed"
    },]


    function ViewComponent() {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="519px" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="500"  alignItems="center">Request #2019393</ModalHeader>
                    <ModalBody>
                        <Text fontSize="14px" fontWeight="600"  >
                            Emergency Contact Details
                        </Text>
                        <TableContainer>
                            <Table variant='simple'>
                                <Tbody>
                                    <Tr>
                                        <Td w="50%" pt="0px" pl="0px">
                                            <Box color="#667085"  fontSize="14px">Name</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >Allen Tobi</Box>
                                        </Td>
                                        <Td pt="0px">
                                            <Box color="#667085"  fontSize="14px">Email</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >Allen info@youtechng.comTobi</Box>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td w="50%" pt="0px" pl="0px">
                                            <Box color="#667085"  fontSize="14px">Phone Number</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >+2347047070390</Box>
                                        </Td>
                                        <Td pt="0px">
                                            <Box color="#667085"  fontSize="14px">Date of Incident</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >11/06/2024 - 10:15AM</Box>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td w="50%" pt="0px" pl="0px">
                                            <Box color="#667085"  fontSize="14px">State</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >Lagos</Box>
                                        </Td>
                                        <Td pt="0px">
                                            <Box color="#667085"  fontSize="14px">LGA</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >KOSOFE</Box>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td w="50%" pt="0px" pl="0px">
                                            <Box color="#667085"  fontSize="14px">Incident Description</Box>
                                            <Box mt="5px" fontSize="14px" fontWeight="400" >Car Accident</Box>
                                        </Td>
                                        <Td pt="0px">
                                            <Box color="#667085"  fontSize="14px">Address</Box>
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
                            <Button variant='blue' bg={COLORS.blue} color={COLORS.white}>Mark False</Button>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }





    return (
        <>
            <Box overflow="scroll" bg={COLORS.white}>
                <TableContainer  overflow="scroll">
                    <Table size='sm' variant='striped' colorScheme='gray' >
                        <Thead>
                            <Tr h="75px">
                                <Th>Date</Th>
                                <Th>Service</Th>
                                <Th>Description</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((a: any, b: number) => (
                                <Tr key={b} h="75px">
                                    <Td>{a.date}</Td>
                                    <Td>{a.service}</Td>
                                    <Td>{a.description}</Td>
                                    <Td>
                                        <Flex>
                                            <Button onClick={() => {
                                                onOpen()
                                                setType("Approve")
                                            }} w="auto" p="10px" fontWeight="600" ml="8px" fontSize="13px"  border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="#FAFAFA" borderRadius="5px">
                                                View
                                            </Button>
                                            <Button onClick={() => {
                                                onOpen()
                                                setType("Reject")
                                            }} w="auto" p="10px" fontWeight="600" ml="8px" fontSize="13px"  border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="#FAFAFA" borderRadius="5px">
                                                Mark False
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