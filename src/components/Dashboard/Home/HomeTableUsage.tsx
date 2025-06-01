import { cashFormat, cashFormat2 } from '@/utils/cashformat'
import {
    Box, Card, Center, Flex, Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { listOrganizations, listVerificationOfficer } from "@/url/api's/admin";

export default function HomeTableUsage() {
    const [organizations, setOrganizations] = useState([]);
    const [verificationOfficers, setVerificationOfficers] = useState([]);
    const [orgLoading, setOrgLoading] = useState(true);
    const [voLoading, setVOLoading] = useState(true);
    const [orgError, setOrgError] = useState(null);
    const [voError, setVOError] = useState(null);

    // Pagination state for organizations
    const [orgCurrentPage, setOrgCurrentPage] = useState(1);
    const orgsPerPage = 10;

    // Pagination state for verification officers
    const [voCurrentPage, setVOCurrentPage] = useState(1);
    const vosPerPage = 10;

    useEffect(() => {
        const fetchOrganizations = async () => {
            setOrgLoading(true);
            try {
                const orgs = await listOrganizations();
                setOrganizations(orgs);
            } catch (error) {
                //setOrgError("Error fetching organizations");
                console.error("Error fetching organizations:", error);
            } finally {
                setOrgLoading(false);
            }
        };

        const fetchVerificationOfficers = async () => {
            setVOLoading(true);
            try {
                const vos = await listVerificationOfficer();
                setVerificationOfficers(vos);
            } catch (error) {
                //setVOError("Error fetching verification officers");
                console.error("Error fetching verification officers:", error);
            } finally {
                setVOLoading(false);
            }
        };

        fetchOrganizations();
        fetchVerificationOfficers();
    }, []);

    // Pagination calculations for organizations
    const orgTotalPages = Math.ceil(organizations.length / orgsPerPage);
    const orgStartIndex = (orgCurrentPage - 1) * orgsPerPage;
    const orgEndIndex = orgStartIndex + orgsPerPage;
    const currentOrgs = organizations.slice(orgStartIndex, orgEndIndex);

    // Pagination calculations for verification officers
    const voTotalPages = Math.ceil(verificationOfficers.length / vosPerPage);
    const voStartIndex = (voCurrentPage - 1) * vosPerPage;
    const voEndIndex = voStartIndex + vosPerPage;
    const currentVOs = verificationOfficers.slice(voStartIndex, voEndIndex);



    return (
        <Flex flexDir={["column", "column", "column", "row"]} p={["20px", "20px", "20px", "30px"]} justifyContent="space-between">
            <Card w={["full", "full", "full", "48%"]} p={["20px", "20px", "20px", "30px"]}>
                <Center justifyContent="space-between">
                    <Box>
                        API  Usage
                    </Box>
                    {/* <Input w="190px" placeholder='Select Date' size='md' type='date' /> */}
                </Center>
                <TableContainer mb="20px" overflow="scroll">
                    <Table size='sm' variant='striped' colorScheme='gray' >
                        <Thead>
                            <Tr h={["55px", "75px"]}>
                                <Th>Business Name</Th>
                                <Th >Code</Th>
                                <Th>API Calls</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentOrgs.map((org:any) => (
                                <Tr h={["55px", "75px"]} key={org.id}>
                                    <Td>{org.name}</Td>
                                    <Td>{org.code}</Td>
                                    <Td>{cashFormat2(org.apiCalls)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Flex justifyContent="space-between" mt={4} alignItems="center">
                    <Box fontSize="14px" color="gray.500">
                        Showing {orgStartIndex + 1} to {Math.min(orgEndIndex, organizations.length)} of {organizations.length} entries
                    </Box>
                    <Flex alignItems="center">
                        <Button onClick={() => setOrgCurrentPage(Math.max(orgCurrentPage - 1, 1))} disabled={orgCurrentPage === 1} mr={2}>Previous</Button>
                        <Box mx={2}>Page {orgCurrentPage} of {orgTotalPages}</Box>
                        <Button onClick={() => setOrgCurrentPage(Math.min(orgCurrentPage + 1, orgTotalPages))} disabled={orgCurrentPage === orgTotalPages}>Next</Button>
                    </Flex>
                </Flex>
            </Card>
            <Card w={["full", "full", "full", "48%"]} p={["20px", "20px", "20px", "30px"]}>
                <Center justifyContent="space-between">
                    <Box>
                    Top 5 verification officers
                    </Box>
                </Center>
                <TableContainer mb="20px" overflow="scroll">
                    <Table size='sm' variant='striped' colorScheme='gray' >
                        <Thead>
                            <Tr h={["55px", "75px"]}>
                                <Th>Officer Name</Th>
                                <Th >Code</Th>
                                <Th>API Calls</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                    {currentVOs.map((vo:any) => (
                        <Tr h={["55px", "75px"]} key={vo.id}> {/* Make sure you have a unique key */}
                            <Td>{vo.first_name} {vo.last_name}</Td> {/* Replace with appropriate property */}
                            <Td>{vo.digital_address}</Td> {/* Replace with appropriate property */}
                            <Td>{cashFormat2(vo.address_verified || 0)}</Td> {/* Replace with appropriate property */}
                        </Tr>
                    ))}
                </Tbody>
                    </Table>
                </TableContainer>
                <Flex justifyContent="space-between" mt={4} alignItems="center">
                    <Box fontSize="14px" color="gray.500">
                        Showing {voStartIndex + 1} to {Math.min(voEndIndex, verificationOfficers.length)} of {verificationOfficers.length} entries
                    </Box>
                    <Flex alignItems="center">
                        <Button onClick={() => setOrgCurrentPage(Math.max(voCurrentPage - 1, 1))} disabled={voCurrentPage === 1} mr={2}>Previous</Button>
                        <Box mx={2}>Page {voCurrentPage} of {voTotalPages}</Box>
                        <Button onClick={() => setOrgCurrentPage(Math.min(voCurrentPage + 1, voTotalPages))} disabled={voCurrentPage === voTotalPages}>Next</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}