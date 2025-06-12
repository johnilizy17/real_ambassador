import { COLORS } from '@/layout/Theme'
import { Box, Button, Center, Flex, IconButton, Img, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import VerificationCard from './VerificationCard'
import VerificationDashboardTable from './VerificationDashboardTable'
import VerificationDashboardChart from './VerificationDashboardChart'
import { useRouter } from 'next/router'
import Withdraw from './Withdraw'
import Image from "next/image";
import { cashFormat } from '@/utils/cashformat'
import { useSelector } from 'react-redux'
import { referredBalance } from '@/url/api\'s/organization'

export default function VerificationBanner() {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { wallet } = useSelector((a: any) => a.user)
    const [amount, setAmount] = useState(0)

    async function Balance() {
        const result = await referredBalance()
        setAmount(result)
    }

    useEffect(() => {
        Balance()
    }, [])

    function WithdrawComponent() {

        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="auto" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="500" alignItems="center">Withdraw Money</ModalHeader>
                    <ModalBody w="full">
                        <Withdraw onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <>
            <Box pr="20px" pl="20px">
                <Center justifyContent="space-between" w="full" h={["auto", "auto", "auto", "129px"]} mt="16px" bg={COLORS.blue} borderRadius="8px" flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]} pl="10px" pr="20px">
                    <Center>
                        <Img src="/images/money.png" />
                        <Box>
                            <Box fontWeight="700" fontSize={["18px", "18px", "18px", "26px"]} color="#fff">
                                {cashFormat(amount)}
                            </Box>
                            <Box fontSize={["10px", "10px", "10px", "11px"]} color="#fff" opacity={0.8}>
                                AVAILABLE WALLET AMOUUNT
                            </Box>
                        </Box>
                    </Center>
                    <Flex flexDir="column" mt={["20px", "20px", "20px", "0px"]}>
                        <Button onClick={onOpen} borderRadius="4.81px" bg={COLORS.green} color={COLORS.white}>
                            <Box mr="5px">Withdraw</Box>
                            <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.86919 0.897135L4.23538 0.530951C4.40183 0.381149 4.6515 0.381149 4.8013 0.530951L8.04702 3.76003C8.19682 3.92647 8.19682 4.17614 8.04702 4.32595L4.8013 7.57166C4.6515 7.72147 4.40183 7.72147 4.23538 7.57166L3.86919 7.20548C3.71939 7.03903 3.71939 6.78936 3.86919 6.62292L5.8832 4.70877H1.10617C0.873147 4.70877 0.7067 4.54233 0.7067 4.3093V3.77667C0.7067 3.56029 0.873147 3.3772 1.10617 3.3772H5.8832L3.86919 1.4797C3.71939 1.31325 3.70275 1.06358 3.86919 0.897135Z" fill="white" />
                            </svg>
                        </Button>
                        <Box
                            onClick={() => router.push("/dashboard/transaction")}
                            textDecoration="underline"
                            cursor="pointer"
                            fontSize={["13px", "13px", "13px", "14px"]} color="#fff" opacity={0.8}>
                            View all transactions
                        </Box>
                    </Flex>
                </Center>
                <VerificationCard />
                <VerificationDashboardTable />
                <WithdrawComponent />
            </Box>
        </>
    )
}