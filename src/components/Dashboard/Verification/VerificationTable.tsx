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
    ModalBody
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function VerificationTable({ result }: { result: any }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [type, setType] = useState("")



    function ViewComponent() {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="auto" pb={["20px", "20px", "20px", "30px"]} w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="600" alignItems="center">{type} Request</ModalHeader>
                    <ModalBody mt="17px" fontSize="16px" fontWeight="500" textAlign="center" color={COLORS.grey}>
                        Are you sure you want to {type === "Reject" ? "Reject" : "Accept"} the request? you will not be able to undo this action
                        <Center mt="64px" justifyContent="space-between">
                            <Button p="20px" bg={COLORS.white} onClick={() => onClose()} border="1px solid #DADFDB" color={COLORS.grey} h="50px" fontSize="16px" fontWeight="500">
                                Cancel
                            </Button>
                            <Button p="20px" bg={type === "Approve" ? COLORS.blue : COLORS.red} color={COLORS.white} h="50px" fontSize="16px" fontWeight="500">
                                Yes, reject request
                            </Button>
                        </Center>
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
                                <Th>Id</Th>
                                <Th>Digital Code</Th>
                                <Th>Date</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {result.map((a: any, b: number) => (
                                <Tr key={b} h="75px">
                                    <Td>{a.request_id}</Td>
                                    <Td>{a.digital_address}</Td>
                                    <Td>{a.created_at}</Td>
                                    <Td>
                                        {a.verification_status}
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