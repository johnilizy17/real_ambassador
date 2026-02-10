import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Input,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Badge,
    HStack,
    IconButton,
    VStack,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Tabs,
    TabList,
    Tab,
    Icon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { Copy, Search, ChevronLeft, ChevronRight, Users, UserCheck, Plus } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { referredProfile } from "@/url/api's/organization";
import { formatDate } from '@/utils/date';
import useCustomToast from '@/hooks/useCustomToast';
import { EmptyState } from '@/components/EmptyState';
import DownStep from '@/template/Step/DownStep';
import CustomerStep from '@/template/Step/CustomerStep';
import PageAnimation from "@/components/PageAnimation";

const ITEMS_PER_PAGE = 10;

export default function Referrals() {
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [referrals, setReferrals] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0); // 0 for Partner, 1 for User
    const [currentPage, setCurrentPage] = useState(1);
    const showMessage = useCustomToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [creationType, setCreationType] = useState<"partner" | "customer" | null>(null);

    const referralCode = user?.id || "ABN-PARTNER-2024";
    const referralLink = activeTab === 0
        ? `https://partners.abn.com.ng/auth/signup?ref=${referralCode}`
        : `https://pay.abn.com.ng/auth/signup?ref=${referralCode}`;

    async function fetchReferrals() {
        try {
            setIsLoading(true);
            const ambassadors = await referredProfile("USERAMBASSADOR");
            const normalUsers = await referredProfile("USER");

            const allReferrals = [
                ...(ambassadors.data || []).map((u: any) => ({ ...u, type: 'Ambassador' })),
                ...(normalUsers.data || []).map((u: any) => ({ ...u, type: 'Customer' }))
            ];

            allReferrals.sort((a, b) => new Date(b.createAt || b.created_at).getTime() - new Date(a.createAt || a.created_at).getTime());

            setReferrals(allReferrals);
        } catch (error) {
            console.error("Failed to fetch referrals", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchReferrals();
    }, []);

    const filteredReferrals = useMemo(() => {
        const roleFilter = activeTab === 0 ? 'Ambassador' : 'Customer';
        return referrals.filter(ref =>
            ref.type === roleFilter &&
            (`${ref.firstName} ${ref.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ref.email?.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [referrals, searchQuery, activeTab]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredReferrals.length / ITEMS_PER_PAGE);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredReferrals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredReferrals, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeTab]);

    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage(`${label} copied!`, "success");
        } catch (err) {
            showMessage("Copy failed", "error");
        }
    };

    const handleCreationClose = () => {
        setCreationType(null);
        onClose();
        fetchReferrals();
    };

    return (
        <UserSideBar>
            <PageAnimation>
                <Box bg="#F9FAFB" minH="100vh" p={{ base: "4", md: "8" }} mt="120px">
                    {/* Header Section */}
                    <Flex justify="space-between" align="center" mb="8" direction={{ base: "column", md: "row" }} gap="4">
                        <Box>
                            <Heading size="lg" fontWeight="700" mb="1">Referrals</Heading>
                            <Text color="gray.600">Manage and track all your referrals</Text>
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
                            Create Ambassador/Customer
                        </Button>
                    </Flex>

                    {/* Tabs for Category */}
                    <Tabs variant='soft-rounded' colorScheme='blue' mb="8" index={activeTab} onChange={(index) => setActiveTab(index)}>
                        <TabList bg="white" p="2" borderRadius="full" display="inline-flex" shadow="sm" border="1px solid" borderColor="gray.100">
                            <Tab px="8" fontWeight="600" fontSize="sm">Ambassadors</Tab>
                            <Tab px="8" fontWeight="600" fontSize="sm">Customers</Tab>
                        </TabList>
                    </Tabs>

                    {/* Referral Code Card */}
                    <Box bg="white" p="6" borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100" mb="8">
                        <Heading size="sm" mb="6" fontWeight="600">Your {activeTab === 0 ? 'Ambassador' : 'Customer'} Referral Details</Heading>
                        <VStack spacing="4" align="stretch">
                            <InputGroup size="lg">
                                <Input
                                    readOnly
                                    value={referralCode}
                                    bg="gray.50"
                                    border="none"
                                    fontSize="md"
                                    fontWeight="600"
                                />
                                <InputRightElement h="full" pr="2">
                                    <IconButton
                                        aria-label="Copy code"
                                        icon={<Copy size={18} />}
                                        variant="ghost"
                                        onClick={() => copyToClipboard(referralCode, "Referral code")}
                                    />
                                </InputRightElement>
                            </InputGroup>

                            <InputGroup size="lg">
                                <Input
                                    readOnly
                                    value={referralLink}
                                    bg="gray.50"
                                    border="none"
                                    fontSize="sm"
                                    color="gray.600"
                                />
                                <InputRightElement h="full" pr="2">
                                    <IconButton
                                        aria-label="Copy link"
                                        icon={<Copy size={18} />}
                                        variant="ghost"
                                        onClick={() => copyToClipboard(referralLink, "Referral link")}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </VStack>
                        <Text mt="4" fontSize="xs" color="gray.500">
                            * Referrals via this link will be registered as {activeTab === 0 ? 'Ambassadors' : 'Customers'}.
                        </Text>
                    </Box>

                    {/* All Referrals Section */}
                    <Box bg="white" borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100" overflow="hidden">
                        <Flex p="6" justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap="4">
                            <Heading size="md" fontWeight="700">All {activeTab === 0 ? 'Ambassadors' : 'Customers'}</Heading>
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

                        {currentItems.length > 0 ? (
                            <>
                                <TableContainer px="2">
                                    <Table variant="simple" size="md">
                                        <Thead>
                                            <Tr>
                                                <Th color="gray.400" textTransform="none" fontWeight="500">ID</Th>
                                                <Th color="gray.400" textTransform="none" fontWeight="500">Name</Th>
                                                <Th color="gray.400" textTransform="none" fontWeight="500">Date Joined</Th>
                                                <Th color="gray.400" textTransform="none" fontWeight="500">Status</Th>
                                                <Th color="gray.400" textTransform="none" fontWeight="500" isNumeric>Revenue</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {currentItems.map((ref, idx) => (
                                                <Tr key={idx}>
                                                    <Td fontSize="sm" color="gray.600">REF-{(currentPage - 1) * ITEMS_PER_PAGE + idx + 101}</Td>
                                                    <Td>
                                                        <VStack align="start" spacing="0">
                                                            <Text fontWeight="600" fontSize="sm">{ref.firstName} {ref.lastName}</Text>
                                                            <Text fontSize="xs" color="gray.500">{ref.email}</Text>
                                                        </VStack>
                                                    </Td>
                                                    <Td fontSize="sm" color="gray.600">{formatDate(ref.createAt || ref.created_at)}</Td>
                                                    <Td>
                                                        <Badge
                                                            px="2"
                                                            py="1"
                                                            borderRadius="full"
                                                            colorScheme={ref.payment === 4 ? "green" : ref.payment === 1 ? "orange" : "gray"}
                                                            textTransform="lowercase"
                                                        >
                                                            {ref.payment === 4 ? "active" : "pending"}
                                                        </Badge>
                                                    </Td>
                                                    <Td fontSize="sm" fontWeight="700" isNumeric>₦0</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>

                                {/* Pagination Controls */}
                                <Flex p="6" justify="space-between" align="center" borderTop="1px solid" borderColor="gray.50">
                                    <Text fontSize="sm" color="gray.500">
                                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredReferrals.length)} of {filteredReferrals.length} referrals
                                    </Text>
                                    <HStack spacing="2">
                                        <IconButton
                                            aria-label="Previous page"
                                            icon={<ChevronLeft size={18} />}
                                            variant="outline"
                                            isDisabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                        />
                                        <Text fontSize="sm" fontWeight="600" px="4">Page {currentPage} of {totalPages}</Text>
                                        <IconButton
                                            aria-label="Next page"
                                            icon={<ChevronRight size={18} />}
                                            variant="outline"
                                            isDisabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                        />
                                    </HStack>
                                </Flex>
                            </>
                        ) : (
                            <Box py="10">
                                <EmptyState title={searchQuery ? 'No matching results' : `No ${activeTab === 0 ? 'ambassadors' : 'customers'} found`} />
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
                            {creationType === "partner" ? "Create New Ambassador" :
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
                                        <Text fontWeight="700" fontSize="lg" color="blue.800">Ambassador</Text>
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
                                        <Text fontSize="xs" color="green.600" textAlign="center">Register a new customer to the ABN platform</Text>
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
                                    <DownStep onClose={handleCreationClose} VerificationApi={fetchReferrals} />
                                ) : (
                                    <CustomerStep onClose={handleCreationClose} VerificationApi={fetchReferrals} />
                                )}
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </UserSideBar>
    );
}
