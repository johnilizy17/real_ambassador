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
    Img
} from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme'
import Image from "next/image";

export default function HomeTable() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
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
                        <Img src="location.png" />
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
        Verification: "Verified"
    },]

    return (
        <>
            <Box p={["20px", "20px", "20px", "30px"]} pt="0px">
                <Card p="16px" >
                    <Text fontWeight="400" color={COLORS.black} fontSize="20px" >Verification Request</Text>
                    <TableContainer display={["none", "none", "block"]} overflow="scroll">
                        <Table size='sm' variant='striped' colorScheme='gray' >
                            <Thead>
                                <Tr  h="75px">
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
                                                        View
                                                    </Button>
                                                </Center>
                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <table className="table">
                        <thead >
                            <tr style={{ marginBottom: 20 }}>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Code</th>
                                <th scope="col">Date</th>
                                <th scope="col">Verification Officer</th> </tr>
                        </thead>
                        <tbody>
                            {data.map((a: any, b: number) => (
                                <tr key={b} style={{ marginBottom: 20 }}>
                                    <td scope="row" data-label="Name:">sdsdds</td>
                                    <td style={{backgroundColor:"white"}} data-label="Address:">sdsdds</td>
                                    <td data-label="Code:">sdsdds</td>
                                    <td style={{backgroundColor:"white"}} data-label="Date:">sjhd jhs </td>
                                    <td data-label="Verification Officer:">
                                        sdkmsd
                                    </td>
                                    <td style={{backgroundColor:"white"}} data-label="Action">
                                        <Box>
                                            <Center>
                                                <Center borderRadius="16px" bg={a.Verification === "Pending" ? "#FAF4EE" : "#E7FCF2"} color={a.Verification === "Pending" ? "#F58E18" : "#32A071"} h="26px"  fontWeight="500" fontSize="12px" w="80px" >
                                                    {a.Verification}
                                                </Center>
                                                <Button onClick={onOpen} w="57.6px" fontWeight="600" ml="8px" fontSize="13px"  border="1px solid rgba(0, 0, 0, 0.05)" h="36px" bg="#FAFAFA" borderRadius="5px">
                                                    View
                                                </Button>
                                            </Center>
                                        </Box>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>

                </Card>
            </Box >
            <ViewComponent />
        </>
    )
}