import React, { useEffect, useState } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Text,
    Box,
    Stack,
    Flex,
    Divider,
    Center,
    Spinner,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { cashFormat } from "@/utils/cashformat";
import { COLORS } from "@/layout/Theme";
import { generateAccount } from "@/url/api's/userProfile";
import useCustomToast from "@/hooks/useCustomToast";
import { CopyIcon } from "@chakra-ui/icons";
import { referredBalance, walletPayment } from "@/url/api's/organization";

const WalletSelection = ({ paymentApi, closingApi, data, setNext }: { paymentApi: any, closingApi: any, data: any, setNext: any }) => {

    const [payment, setPayment] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [accountDetails, setAccountDetails] = useState({ bank_name: "", account_name: "", account_number: "" })
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const showMessage = useCustomToast()

    async function AccountNumber() {
        try {
            setLoading(true)
            const result = await referredBalance()
            setAmount(result)
            setLoading(false)
            const account = await generateAccount(data)
            setAccountDetails(account.data)
        } catch (err: any) {
            showMessage(err.message, "error")
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage("copy successful", "success")
        } catch (err) {
            console.error("Failed to copy:", err);
            showMessage("Failed to copy", "error")
        }
    };

    async function PayByWallet() {
        try {
            setLoading2(true)
            await walletPayment({ amount: data.amount, email: data.email })
            setPayment(true)
            showMessage("User has successfully been registered", "success")
        } catch (error: any) {
            showMessage(error.response.data.message, "error")
        }finally{
            setLoading2(false)
        }
    }

    useEffect(() => {
        AccountNumber()
        onOpen()
    }, ["error"])


    return (
        <>
            <Drawer placement="bottom" onClose={() => {
                onClose()
                closingApi()
            }} isOpen={true}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader display={"flex"}>Select Form of Payment</DrawerHeader>
                    <DrawerBody>
                        <Center>
                            {loading ?
                                <Spinner size={"xl"} />
                                :
                                payment ?
                                    <Box maxW="500px"
                                        w="full"
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        p={5}
                                        boxShadow="md"
                                        bg="white">
                                        <p>Transaction successfully completed your referral can enjoy his account with easy</p>
                                        <Divider />
                                        <Button w="full" onClick={() => paymentApi()} colorScheme="blue" bg={COLORS.blue}>
                                            Complete
                                        </Button>

                                    </Box>
                                    :
                                    <Box
                                        maxW="500px"
                                        w="full"
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        p={5}
                                        boxShadow="md"
                                        bg="white"
                                    >
                                        <Stack spacing={4}>
                                            <Flex justify="space-between">
                                                <Text fontWeight="medium">Wallet Balance</Text>
                                                <Text fontWeight="medium">{cashFormat(amount)}</Text>
                                            </Flex>

                                            <Flex justify="space-between">
                                                <Text fontWeight="medium">Payment Amount</Text>
                                                <Text color="green.500" fontWeight="semibold">{cashFormat(data.amount)}</Text>
                                            </Flex>
                                            <Divider />

                                            <Button onClick={() => setNext(false)} colorScheme="blue" bg={COLORS.blue}>
                                                Generate Account
                                            </Button>
                                            <Button isLoading={loading2} onClick={() => PayByWallet()} colorScheme="green" bg={COLORS.green}>
                                                Payment from Wallet
                                            </Button>
                                        </Stack>
                                    </Box>
                            }
                        </Center>
                    </DrawerBody>
                </DrawerContent>
            </Drawer >
        </>
    );
};

export default WalletSelection;