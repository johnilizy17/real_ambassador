// components/BalanceCard.tsx
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import CreateAccount from '@/components/Dashboard/Verification/Home/CreateAccount';
import Withdraw from '@/components/Dashboard/Verification/Home/Withdraw';
import { referredBalance } from '@/url/api\'s/organization';
import { generateAccount } from '@/url/api\'s/userProfile';
import { cashFormat } from '@/utils/cashformat';
import {
    Box,
    Text,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    Icon,
    HStack,
    VStack,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';
import { CopyCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
    { value: 100 },
    { value: 115 },
    { value: 90 },
    { value: 130 },
    { value: 70 },
    { value: 140 },
    { value: 110 },
    { value: 130 },
];

export default function AccountNumber() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [wallet, setWallet] = useState({account_number:"", bank_name:""})
    const { user } = useSelector((a: any) => a.auth)
    const [amount, setAmount] = useState(0)

    async function Balance() {
        const result = await referredBalance()
        setAmount(result)
        const account = await generateAccount({ ...user, amount:0, name:`${user.lastName},${user.firstName}` })
        setWallet(account.data)
    }

    useEffect(() => {
        Balance()
    }, [])


    function AccountComponent() {

        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="auto" pb="20px" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="500" alignItems="center">Withdraw Money</ModalHeader>
                    <ModalBody w="full">
                        <Withdraw onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <UserSideBar>
            <Box
                p={["20px", "20px", "20px"]}
                mt="100px"
                borderRadius="xl"
                bg="white"
                boxShadow="md"
                w="full"
            >
                <Stat>
                    <StatLabel fontSize="sm" color="gray.500">
                        Total balance from all accounts
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="bold">
                        {cashFormat(amount)}
                    </StatNumber>
                </Stat>

                <Box height="120px" mt={4}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="value" stroke="#3182ce" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

                <Flex mt={6} p={4} borderRadius="lg" bg="gray.50" align="center" justify="space-between">
                    <HStack>
                        {/* <Icon as={FaFlagUsa} color="red.500" boxSize={5} /> */}
                        <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{wallet.account_number}</Text>
                            <Text fontSize="sm" color="gray.500">{wallet.bank_name}</Text>
                        </VStack>
                    </HStack>
                    <CopyCheckIcon />
                </Flex>
                <Box mt="20px">
                    <Button onClick={onOpen} colorScheme='green' w={["full", "full", "full", "300px"]}>
                        Withdraw
                    </Button>
                </Box>
            </Box>
            <AccountComponent />
        </UserSideBar>
    );
}
