import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import {
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Badge,
    HStack,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Center,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { COLORS } from '@/layout/Theme';
import { referredBalance, referredTransaction } from '@/url/api\'s/organization';
import { formatDate } from '@/utils/date';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmptyState } from '@/components/EmptyState';
import useCustomToast from '@/hooks/useCustomToast';
import { generateAccount } from '@/url/api\'s/userProfile';
import { cashFormat } from '@/utils/cashformat';
import Withdraw from '@/components/Dashboard/Verification/Home/Withdraw';
import TransferModel from '@/components/Dashboard/Verification/Home/TransferModel';
import { CopyCheckIcon } from 'lucide-react';
import PageAnimation from "@/components/PageAnimation";

export default function Dashboard() {
    const router = useRouter();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [history, setHistory] = useState([]);
    const [wallet, setWallet] = useState({ account_number: "", bank_name: "" });
    const [amount, setAmount] = useState(0);
    const showMessage = useCustomToast();

    const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onClose: onWithdrawClose } = useDisclosure();
    const { isOpen: isTransferOpen, onOpen: onTransferOpen, onClose: onTransferClose } = useDisclosure();
    const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
    const [transferType, setTransferType] = useState<"internal" | "normal" | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const tiers = [
        { name: "Bronze", rate: "5%", color: "orange.400", id: 2 },
        { name: "Silver", rate: "10%", color: "blue.400", active: true, id: 3 },
        { name: "Gold", rate: "15%", color: "yellow.400", id: 4 },
    ];

    async function Balance() {
        const result = await referredBalance();
        setAmount(result);
        const account = await generateAccount({ ...user, amount: 0, name: `${user.lastName},${user.firstName}` });
        setWallet(account.data || { account_number: "N/A", bank_name: "N/A" });
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage("Account number copied!", "success");
            onDepositClose(); // Close modal after copying
        } catch (err) {
            showMessage("Copy failed", "error");
        }
    };

    useEffect(() => {
        Balance();
        DashboardUser();
    }, []);

    async function DashboardUser() {
        const historyPeople = await referredTransaction();
        setHistory(historyPeople.transaction || []);
    }

    // Calculate Dynamic Chart Data
    const formattedChartData = useMemo(() => {
        const monthlyData: { [key: string]: number } = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        history.forEach((item: any) => {
            if (item.amount > 0) {
                const date = new Date(item.created_at);
                const monthName = months[date.getMonth()];
                monthlyData[monthName] = (monthlyData[monthName] || 0) + item.amount;
            }
        });

        return months.map(m => ({
            name: m,
            earnings: Math.round(monthlyData[m] || 0)
        })).filter((_, i) => i <= new Date().getMonth() || monthlyData[months[i]] > 0);
    }, [history]);

    // Calculate Total Earned from History
    const totalEarnedAmount = useMemo(() => {
        return history.reduce((acc, curr: any) => curr.amount > 0 ? acc + curr.amount : acc, 0);
    }, [history]);

    // Payout Logic: Due in X days (5-day cycle)
    const dueInDays = useMemo(() => {
        const today = new Date().getDate();
        const cycle = 5;
        const nextPayoutDate = Math.ceil(today / cycle) * cycle;
        const diff = nextPayoutDate - today;
        return diff === 0 ? 5 : diff;
    }, []);

    function renderName(item: any) {
        if (!item.user_id) return user.firstName;
        if (item.user_id === user.id) return user.lastName;
        try {
            const userData = JSON.parse(item.user_id);
            return `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'N/A';
        } catch (e) {
            return item.user_id === user.id ? user.lastName : "N/A";
        }
    }

    function formatAmount(amount: any) {
        const value = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(value).replace('NGN', '₦');
    }

    function normalizeType(type: string) {
        if (!type) return "Registration Fee";
        return type.replace(/Registeration/g, 'Registration');
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <UserSideBar>
            <PageAnimation>
                <Box bg="#F9FAFB" minH="100vh" p={{ base: "4", md: "8" }} mt="120px">
                    {/* Header Section */}
                    <Flex direction="column" mb="8">
                        <HStack mb="2">
                            <IconButton
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                aria-label="Back"
                                variant="ghost"
                                onClick={() => router.back()}
                            />
                            <Heading size="lg" fontWeight="700">Earnings</Heading>
                        </HStack>
                        <Text color="gray.600" fontSize="md">Track your commission earnings and payout history</Text>
                    </Flex>

                    {/* Primary Actions */}
                    <HStack spacing="4" mb="8">
                        <Button bg="#0047AB" color="white" _hover={{ bg: "#003580" }} px="8" onClick={onTransferOpen}>Transfer Funds</Button>
                        <Button variant="outline" borderColor="#0047AB" color="#0047AB" px="8" onClick={onDepositOpen}>Deposit Funds</Button>
                    </HStack>

                    {/* Stat Cards */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
                        <Box bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
                            <Stat>
                                <StatLabel color="gray.500" fontWeight="500">Total Earned</StatLabel>
                                <StatNumber fontSize="3xl" fontWeight="700">{cashFormat(amount)}</StatNumber>
                                <StatHelpText color="green.500" fontWeight="600">
                                    +{cashFormat(0)} this month
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
                            <Stat>
                                <StatLabel color="gray.500" fontWeight="500">Pending Payout</StatLabel>
                                <StatNumber fontSize="3xl" fontWeight="700">{cashFormat(totalEarnedAmount)}</StatNumber>
                                <StatHelpText color="gray.500">
                                    Due in {dueInDays} days
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
                            <Stat>
                                <StatLabel color="gray.500" fontWeight="500">Average Commission</StatLabel>
                                <StatNumber fontSize="3xl" fontWeight="700"> {tiers.map((a) => {
                                    if (user && user.payment == a.id) {
                                        return a.rate
                                    }
                                })}</StatNumber>
                                <StatHelpText color="gray.500">
                                    {tiers.map((a) => {
                                        if (user && user.payment == a.id) {
                                            return a.name
                                        }
                                    })} tier rate
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </SimpleGrid>

                    {/* Chart Section */}
                    <Box bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm" mb="8">
                        <Heading size="sm" mb="6" fontWeight="600">Earnings Over Time</Heading>
                        <Box h="300px">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formattedChartData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="earnings" stroke="#4A90E2" strokeWidth={3} dot={{ r: 4, fill: '#4A90E2', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>

                    {/* table Section */}
                    <Box bg="white" p="6" borderRadius="xl" border="1px solid" borderColor="gray.100" shadow="sm">
                        <Heading size="sm" mb="6" fontWeight="600">Payout History</Heading>

                        {history.length > 0 ? (
                            <TableContainer>
                                <Table variant="simple" size="md">
                                    <Thead>
                                        <Tr>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">ID</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Date</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Amount</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Method</Th>
                                            <Th color="gray.400" textTransform="none" fontWeight="500">Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {currentItems.map((item: any, idx: number) => (
                                            <Tr key={idx}>
                                                <Td fontSize="sm" color="gray.600">PAY-{idx + 100}</Td>
                                                <Td fontSize="sm" color="gray.600">{formatDate(item.created_at)}</Td>
                                                <Td fontSize="sm" fontWeight="600">{formatAmount(item.amount)}</Td>
                                                <Td fontSize="sm" color="gray.600">Bank Transfer</Td>
                                                <Td>
                                                    <Badge
                                                        px="2"
                                                        py="1"
                                                        borderRadius="lg"
                                                        colorScheme={item.amount > 0 ? "green" : "orange"}
                                                        textTransform="lowercase"
                                                    >
                                                        {item.amount > 0 ? "paid" : "withdraw"}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <EmptyState title='No Payout History' />
                        )}

                        {/* Pagination Controls */}
                        {history.length > ITEMS_PER_PAGE && (
                            <Flex justify="flex-end" align="center" mt="4" gap="4">
                                <Button
                                    size="sm"
                                    onClick={handlePrevPage}
                                    isDisabled={currentPage === 1}
                                    variant="outline"
                                >
                                    Previous
                                </Button>
                                <Text fontSize="sm" color="gray.600">
                                    Page {currentPage} of {totalPages}
                                </Text>
                                <Button
                                    size="sm"
                                    onClick={handleNextPage}
                                    isDisabled={currentPage === totalPages}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </Flex>
                        )}
                    </Box>
                </Box>
            </PageAnimation>

            {/* Modals */}
            <Modal isOpen={isTransferOpen} onClose={() => { onTransferClose(); setTransferType(null); Balance(); DashboardUser(); }} isCentered>
                <ModalOverlay />
                <ModalContent p="6" borderRadius="xl" maxW="lg">
                    <ModalHeader textAlign="center" fontSize="xl" fontWeight="700">Transfer Funds</ModalHeader>
                    <ModalBody>
                        {!transferType ? (
                            <VStack spacing="4">
                                <Button
                                    w="full"
                                    h="60px"
                                    variant="outline"
                                    borderColor="gray.200"
                                    onClick={() => setTransferType("internal")}
                                    _hover={{ bg: "gray.50", borderColor: "blue.400" }}
                                >
                                    Internal Transfer (To ABN Account)
                                </Button>
                                <Button
                                    w="full"
                                    h="60px"
                                    variant="outline"
                                    borderColor="gray.200"
                                    onClick={() => setTransferType("normal")}
                                    _hover={{ bg: "gray.50", borderColor: "blue.400" }}
                                >
                                    Normal Transfer (Withdraw to Bank)
                                </Button>
                            </VStack>
                        ) : transferType === "internal" ? (
                            <Box w="full">
                                <IconButton
                                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    aria-label="Back"
                                    variant="ghost"
                                    onClick={() => setTransferType(null)}
                                    size="sm"
                                    mb="4"
                                />
                                <TransferModel onClose={() => { onTransferClose(); setTransferType(null); Balance(); DashboardUser(); }} />
                            </Box>
                        ) : (
                            <Box w="full">
                                <IconButton
                                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    aria-label="Back"
                                    variant="ghost"
                                    onClick={() => setTransferType(null)}
                                    size="sm"
                                    mb="4"
                                />
                                <Withdraw onClose={() => { onTransferClose(); setTransferType(null); Balance(); DashboardUser(); }} />
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDepositOpen} onClose={onDepositClose} isCentered>
                <ModalOverlay />
                <ModalContent p="6" borderRadius="xl" maxW="md">
                    <ModalHeader textAlign="center" fontSize="xl" fontWeight="700">Account Details</ModalHeader>
                    <ModalBody>
                        <VStack spacing="6" p="4" bg="gray.50" borderRadius="lg" position="relative">
                            <VStack spacing="1" w="full" align="center">
                                <Text color="gray.500" fontSize="xs" fontWeight="600" textTransform="uppercase">Bank Name</Text>
                                <Text fontWeight="700" fontSize="lg">{wallet.bank_name}</Text>
                            </VStack>
                            <VStack spacing="1" w="full" align="center">
                                <Text color="gray.500" fontSize="xs" fontWeight="600" textTransform="uppercase">Account Number</Text>
                                <Text fontWeight="700" fontSize="2xl" color="blue.600">{wallet.account_number}</Text>
                            </VStack>
                            <VStack spacing="1" w="full" align="center">
                                <Text color="gray.500" fontSize="xs" fontWeight="600" textTransform="uppercase">Account Name</Text>
                                <Text fontWeight="700" fontSize="md">{user && user.firstName} {user && user.lastName}</Text>
                            </VStack>
                            <Button
                                leftIcon={<CopyCheckIcon size={18} />}
                                colorScheme="blue"
                                w="full"
                                mt="4"
                                onClick={() => copyToClipboard(wallet.account_number)}
                            >
                                Copy Account Number
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </UserSideBar>
    );
}
