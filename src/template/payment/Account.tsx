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

const AccountGeneration = ({ paymentApi, closingApi, data }: { paymentApi: any, closingApi: any, data: any }) => {

    const [payment, setPayment] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [accountDetails, setAccountDetails] = useState({ bank_name: "", account_name: "", account_number: "" })
    const showMessage = useCustomToast()
    async function AccountNumber() {
        try {
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
                    <DrawerHeader display={"flex"}>Payment Account</DrawerHeader>
                    <DrawerBody>
                        <Center>
                            {accountDetails.account_number === "" ?
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
                                        <p>Your account will be automatically approved when your payment is received</p>
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
                                                <Text fontWeight="medium">Amount</Text>
                                                <Text fontWeight="medium">{cashFormat(data.amount)}</Text>
                                            </Flex>

                                            <Flex justify="space-between">
                                                <Text fontWeight="medium">Bank Name</Text>
                                                <Text color="green.500" fontWeight="semibold">{accountDetails.bank_name}</Text>
                                            </Flex>

                                            <Flex justify="space-between">
                                                <Text fontWeight="medium">Account Name</Text>
                                                <Text  fontWeight="semibold">{accountDetails.account_name}</Text>
                                            </Flex>
                                            <Flex onClick={() => copyToClipboard(accountDetails.account_number)} justify="space-between">
                                                <Text fontWeight="medium">Account Number</Text>
                                                <Text>{accountDetails.account_number} <CopyIcon /></Text>
                                            </Flex>
                                            <Divider />

                                            <Button onClick={() => setPayment(true)} colorScheme="blue" bg={COLORS.blue}>
                                                Have made Payment
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

export default AccountGeneration;