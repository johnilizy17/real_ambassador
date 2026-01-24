import React, { useEffect, useState, useMemo } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Badge,
    VStack,
    InputGroup,
    InputLeftElement,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { Search, Plus, Users, UserCheck, ChevronLeft } from "lucide-react";
import UserSideBar from "@/components/Dashboard/DashboardLayout/UserSideBar";
import { useRouter } from "next/router";
import { EmptyState } from "@/components/EmptyState";
import { referredProfile } from "@/url/api's/organization";
import { formatDate } from "@/utils/date";
import DownStep from '@/template/Step/DownStep';
import CustomerStep from '@/template/Step/CustomerStep';
import PageAnimation from "@/components/PageAnimation";

export default function TokenTransactions() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [path, setPath] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [creationType, setCreationType] = useState<"partner" | "customer" | null>(null);

    async function registeredUsers(e: string) {
        try {
            setIsLoading(true);
            const users = await referredProfile(e);
            setTransactions(users.data || []);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (router.query.id) {
            const currentPath = router.query.id as string;
            setPath(currentPath);
            if (currentPath === "downline") {
                registeredUsers("USERAMBASSADOR");
            } else {
                registeredUsers("USER");
            }
        }
    }, [router.query.id]);

    const filteredData = useMemo(() => {
        return transactions.filter(tx =>
            `${tx.firstName} ${tx.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [transactions, searchQuery]);

    const handleCreationClose = () => {
        setCreationType(null);
        onClose();
        if (path === "downline") {
            registeredUsers("USERAMBASSADOR");
        } else {
            registeredUsers("USER");
        }
    };

    const typeLabel = path === "downline" ? "Partners" : "Customers";

    return (
        <UserSideBar>
            <PageAnimation>
                <Box bg="#F9FAFB" minH="100vh" p={{ base: "4", md: "8" }} mt="120px">
                    {/* Header Section */}
                    <Flex justify="space-between" align="center" mb="8" direction={{ base: "column", md: "row" }} gap="4">
                        <Box>
                            <Heading size="lg" fontWeight="700" mb="1">Manage {typeLabel}</Heading>
                            <Text color="gray.600">Track and manage your {typeLabel.toLowerCase()} registrations</Text>
                        </Box>
                        <Button
                            leftIcon={<Plus size={20} />}
                            bg="#0047AB"
                            color="white"
                            _hover={{ bg: "#003580" }}
                            px="8"
                            h="50px"
                            borderRadius="xl"
                            onClick={onOpen}
                        >
                            Create Partner/Customer
                        </Button>
                    </Flex>

                    {/* List Container */}
                    <Box bg="white" borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100" overflow="hidden">
                        <Flex p="6" justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap="4">
                            <Heading size="md" fontWeight="700">Total {typeLabel}: {transactions.length}</Heading>
                            <InputGroup maxW={{ base: "full", md: "300px" }}>
                                <InputLeftElement pointerEvents='none'>
                                    <Search size={18} color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    bg="gray.50"
                                    border="none"
                                    _focus={{ bg: "white", ring: 2, ringColor: "blue.400" }}
                                />
                            </InputGroup>
                        </Flex>

                        {filteredData.length > 0 ? (
                            <TableContainer px="2" pb="6">
                                <Table variant="simple" size="md">
                                    <Thead>
                                        <Tr>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Name</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Email</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Date Joined</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredData.map((tx, idx) => (
                                            <Tr key={idx} cursor="pointer" _hover={{ bg: "gray.50" }}>
                                                <Td fontWeight="600">{tx.firstName} {tx.lastName}</Td>
                                                <Td fontSize="sm" color="gray.600">{tx.email}</Td>
                                                <Td fontSize="sm" color="gray.600">{formatDate(tx.createAt || tx.created_at)}</Td>
                                                <Td>
                                                    <Badge
                                                        px="2"
                                                        py="1"
                                                        borderRadius="full"
                                                        colorScheme={tx.payment === 4 ? "green" : tx.payment === 1 ? "orange" : "gray"}
                                                        textTransform="lowercase"
                                                    >
                                                        {tx.payment === 4 ? "active" : "pending"}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box py="20">
                                <EmptyState title={`No ${typeLabel.toLowerCase()} found`} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </PageAnimation>

            {/* Create Modal */}
            <Modal isOpen={isOpen} onClose={handleCreationClose} isCentered size={creationType ? "lg" : "3xl"}>
                <ModalOverlay backdropFilter="blur(4px)" />
                <ModalContent borderRadius="2xl" p="4">
                    <ModalHeader textAlign="center">
                        <Heading size="md" fontWeight="700">
                            {creationType === "partner" ? "Create New Partner" :
                                creationType === "customer" ? "Create New Customer" :
                                    "Choose Registration Type"}
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb="8">
                        {!creationType ? (
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" py="4">
                                <VStack
                                    p="8"
                                    bg="blue.50"
                                    borderRadius="2xl"
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ bg: "blue.100", transform: "translateY(-4px)", shadow: "lg" }}
                                    onClick={() => setCreationType("partner")}
                                    spacing="4"
                                    border="2px solid"
                                    borderColor="blue.100"
                                >
                                    <Icon as={Users} color="blue.600" boxSize={12} />
                                    <VStack spacing="1" align="center">
                                        <Text fontWeight="700" fontSize="lg" color="blue.800">Partner</Text>
                                        <Text fontSize="xs" color="blue.600" textAlign="center">Register a new ambassador to your downline</Text>
                                    </VStack>
                                </VStack>

                                <VStack
                                    p="8"
                                    bg="green.50"
                                    borderRadius="2xl"
                                    cursor="pointer"
                                    transition="all 0.2s"
                                    _hover={{ bg: "green.100", transform: "translateY(-4px)", shadow: "lg" }}
                                    onClick={() => setCreationType("customer")}
                                    spacing="4"
                                    border="2px solid"
                                    borderColor="green.100"
                                >
                                    <Icon as={UserCheck} color="green.600" boxSize={12} />
                                    <VStack spacing="1" align="center">
                                        <Text fontWeight="700" fontSize="lg" color="green.800">Customer</Text>
                                        <Text fontSize="xs" color="green.600" textAlign="center">Register a new user to the ABN platform</Text>
                                    </VStack>
                                </VStack>
                            </SimpleGrid>
                        ) : (
                            <Box>
                                <IconButton
                                    icon={<ChevronLeft size={20} />}
                                    aria-label="Back"
                                    variant="ghost"
                                    onClick={() => setCreationType(null)}
                                    size="sm"
                                    mb="4"
                                />
                                {creationType === "partner" ? (
                                    <DownStep onClose={handleCreationClose} VerificationApi={path === "downline" ? () => registeredUsers("USERAMBASSADOR") : () => registeredUsers("USER")} />
                                ) : (
                                    <CustomerStep onClose={handleCreationClose} VerificationApi={path === "downline" ? () => registeredUsers("USERAMBASSADOR") : () => registeredUsers("USER")} />
                                )}
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </UserSideBar>
    );
}
