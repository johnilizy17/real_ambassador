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
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels
} from '@chakra-ui/react'
import { COLORS } from '@/layout/Theme'
import { EmptyState } from '@/components/EmptyState'
import PopupCalendar from '../../EmptyState/calendarPopup'

export default function CoporateTable() {

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
                <Card p="16px" mb="80px">
                    <Flex justifyContent={"space-between"} mb="30px">
                        <Text fontWeight="400" color={COLORS.black} fontSize="20px" >Address Verification</Text>
                        <PopupCalendar />
                    </Flex>

                    <Tabs colorScheme='green'>
                        <TabList>
                            <Tab>Total Users</Tab>
                            <Tab>Pending</Tab>
                            <Tab>Verified</Tab>
                            <Tab>Rejected</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <TableContainer overflow="scroll">
                                    <Table size='sm' variant='striped' colorScheme='gray' >
                                        <Thead>
                                            <Tr h="75px">
                                                <Th>Name</Th>
                                                <Th w="200px">Address</Th>
                                                <Th>Code</Th>
                                                <Th>Date</Th>
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
                                                    <Td>
                                                        <Box>
                                                            <Center borderRadius="16px" bg={a.Verification === "Pending" ? "#FAF4EE" : "#E7FCF2"} color={a.Verification === "Pending" ? "#F58E18" : "#32A071"} h="26px" fontWeight="500" fontSize="12px" w="80px" >
                                                                {a.Verification}
                                                            </Center>

                                                        </Box>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    <EmptyState title='No user data is avaliable' />
                                </Center>
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    <EmptyState title='No user data is avaliable' />
                                </Center>
                            </TabPanel>
                            <TabPanel>
                                <Center>
                                    <EmptyState title='No user data is avaliable' />
                                </Center>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Card>
            </Box >
        </>
    )
}