import { COLORS } from '@/layout/Theme';
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Center, Button, useDisclosure, Spinner, Icon, Flex
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { listUsers, listOrganizations, listVerificationOfficer } from '@/url/api\'s/admin';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    phone_verified: number;
    email_verified: number;
    address_verified: number;
    created_at: string;
    digital_address: string;
    Verification: string;
    name?: string;
    corp_id?: string;
    lga?: string;
    state?: string;
}

export interface SearchFilters {
    searchQuery: string;
    lga: string;
    state: string;
}

interface PeopleTableProps {
    userType: string;
    searchFilters: SearchFilters;
}

export default function PeopleTable({ userType, searchFilters }: PeopleTableProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setUsers] = useState<UserData[]>([]);
    const [organizations, setOrganizations] = useState<UserData[]>([]);
    const [verificationOfficers, setVerificationOfficers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch data based on userType
                if (userType === "4") {
                    const response = await listUsers();
                    setUsers(response?.data?.users || []);
                } else if (userType === "6") {
                    const response = await listVerificationOfficer();
                    setVerificationOfficers(response || []);
                } else if (userType === "3") {
                    const response = await listOrganizations();
                    setOrganizations(response || []);
                }
            } catch (err: any) {
                console.error("Error fetching data:", err);
                setError(err?.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userType]); // Add userType as dependency

    // Get current data based on userType
    const getCurrentData = () => {
        switch (userType) {
            case "4":
                return users;
            case "6":
                return verificationOfficers;
            case "3":
                return organizations;
            default:
                return [];
        }
    };

    // Filter data based on search filters
    const filteredData = React.useMemo(() => {
        const currentData = getCurrentData();
        return currentData.filter(item => {
            // Filter by search query
            const searchLower = searchFilters.searchQuery.toLowerCase();
            const name = item.name || `${item.first_name} ${item.last_name}`;
            const matchesSearch = !searchFilters.searchQuery || 
                name.toLowerCase().includes(searchLower) ||
                item.email_address.toLowerCase().includes(searchLower) ||
                item.phone_number?.includes(searchFilters.searchQuery) ||
                item.digital_address?.toLowerCase().includes(searchLower);

            // Filter by location
            const matchesLga = !searchFilters.lga || item.lga === searchFilters.lga;
            const matchesState = !searchFilters.state || item.state === searchFilters.state;

            return matchesSearch && matchesLga && matchesState;
        });
    }, [users, verificationOfficers, organizations, searchFilters, userType]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDisplayData = filteredData.slice(startIndex, endIndex);

    // Reset pagination when filters or userType changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilters, userType]);

    // Pagination handlers
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    if (loading) {
        return (
            <Center h="100vh">
                <Spinner size="lg" />
            </Center>
        );
    }

    if (error) {
        return <Box color="red.500">{error}</Box>;
    }

    return (
        <Box overflow="scroll" bg={COLORS.white}>
            <TableContainer display={["none", "none", "block"]} overflow="scroll">
                <Table size='sm' variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr h="75px">
                            <Th>Name</Th>
                            <Th w="200px">Email Address</Th>
                            <Th>Digital Address</Th>
                            <Th>Member Since</Th>
                            <Th>Verification</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentDisplayData.map((item) => (
                            <Tr key={item.user_id || item.corp_id} h="75px">
                                <Td>{item.name || `${item.first_name} ${item.last_name}`}</Td>
                                <Td>{item.email_address}</Td>
                                <Td>{item.digital_address || 'N/A'}</Td>
                                <Td>{item.created_at || 'N/A'}</Td>
                                <Td>
                                    <Flex>
                                        {item.phone_verified ? (
                                            <Icon as={CheckIcon} color="green.500" mr={2} />
                                        ) : (
                                            <Icon as={CloseIcon} color="red.500" mr={2} />
                                        )}
                                        {item.email_verified ? (
                                            <Icon as={CheckIcon} color="green.500" mr={2} />
                                        ) : (
                                            <Icon as={CloseIcon} color="red.500" mr={2} />
                                        )}
                                        {item.address_verified ? (
                                            <Icon as={CheckIcon} color="green.500" />
                                        ) : (
                                            <Icon as={CloseIcon} color="red.500" />
                                        )}
                                    </Flex>
                                </Td>
                                <Td>
                                    {/* Rest of your table cell content */}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Flex 
                justifyContent="space-between" 
                mt={4} 
                alignItems="center" 
                flexDirection={["column", "column", "row", "row"]}
            >
                <Box fontSize="14px" color={COLORS.grey}>
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                </Box>
                <Flex alignItems="center">
                    <Button 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 1}
                        mr={2}
                    >
                        Previous
                    </Button>
                    <Box mx={2}>
                        Page {currentPage} of {totalPages}
                    </Box>
                    <Button 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}