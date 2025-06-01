import { COLORS } from '@/layout/Theme';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
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
    Spinner // Import Spinner for loading indicator
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import AddAdmin from './AddAdmin';
import { useSelector } from 'react-redux';

interface User {
    corp_id: string;
    name: string;
    email_address: string;
    phone_number: string;
}


export default function SettingsAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [teamMembers, setTeamMembers] = useState<any[]>([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState<string | null>(null); // Add an error state
    const { user } = useSelector((state: any) => state.auth); // Get user data directly here

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                setLoading(true);
                setError(null);

                const corpId = user?.officer_id; // Access corpId directly

                if (!corpId) {
                    setError("Corp ID not found in Redux store.");
                    return;
                }

                // const members = await getTeamMembers(corpId);
                // setTeamMembers(members);
            } catch (error: any) {
                setError(error.message);
                console.error("Error fetching team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamMembers(); // Call the function directly here
    }, [user]); // Dependency array now includes 'user'


    if (loading) {
        return <Center><Spinner size="xl" /></Center>; // Show loading indicator while fetching data
    }

    if (error) {
        return <Center>Error: {error}</Center>; // Display error message if something went wrong
    }

    function AdminModal() {

        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="329px" w={["400px", "400px", "400px", "704px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="800" alignItems="center">Add Admin User</ModalHeader>
                    <ModalBody overflow="scroll" w="full">
                        <AddAdmin onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <Box overflow="scroll" bg={COLORS.white} p={["20px", "20px", "20px", "30px"]}>
            <Center justifyContent="space-between">
                <Box fontSize="18px" fontWeight="400">Organisation Connected</Box>
            </Center>
            <TableContainer overflow="scroll">
                <Table size='sm' variant='striped' colorScheme='gray' >
                    <Thead>
                        <Tr h="75px">
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {teamMembers.map((member: any, index: number) => ( // Use teamMembers array
                            <Tr key={index} h="75px">
                                <Td>{member.first_name}</Td>
                                <Td>{member.email_address}</Td>
                                <Td>{member.date || member.Date || "N/A"}</Td>
                                <Td>
                                    <Box>
                                        <Center>
                                            <Center borderRadius="16px" bg={member.verification_status === "Pending" ? "#FAF4EE" : "#E7FCF2"} color={member.verification_status === "Pending" ? "#F58E18" : "#32A071"} h="26px" fontWeight="700" fontSize="12px" w="80px">
                                                {member.verification_status || "Active"}
                                            </Center>
                                        </Center>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <AdminModal />
        </Box>
    )
}