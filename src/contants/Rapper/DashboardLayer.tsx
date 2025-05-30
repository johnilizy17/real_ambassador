import React, { useEffect } from "react";
import LoadingScreen from "../LoadingScreen";
import Head from "next/head";
import { Box, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { COLORS } from "@/utils/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import KYCForm from "@/template/auth/kyc/KYCForm";
import { getKYC } from "@/redux/slices/userSlice";
import { getOrders, getUserAsset } from "@/redux/slices/assetSlice";

export default function DashboardLayer({ children, seoTitle }: { children: any, seoTitle?: string }) {
    const { user, wallet } = useSelector((a: any) => a.auth)
    const { isLoading, kycData } = useSelector((a: { user: { isLoading: boolean, kycData: any } }) => a.user)
    const dispatch = useDispatch()
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        if (!user) {
            router.push("/auth/login")
        }
        if (isLoading && !kycData) {
            onOpen()
        }
    }, [isLoading])

    useEffect(() => {
        dispatch(getKYC("") as any).unwrap().catch(() => {
            router.push("/auth/login")
        })
        dispatch(getOrders("") as any)
    }, [])

    useEffect(() => {
        dispatch(getUserAsset({ page: 1, type: 3 }) as any)
    }, [])

    function KYCVerification() {
        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent w={['300px', '300px', '300px', '504px']}>
                    <ModalHeader
                        justifyContent='center'
                        fontSize='20px'
                        fontWeight='500'
                        alignItems='center'
                    >
                        Complete your KYC
                    </ModalHeader>
                    <ModalBody w='full'>
                        <KYCForm onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }
    return (
        <>
            <Head>
                <title>AB NARINOHS Estate - {seoTitle}</title>
                <meta name="description" content="Buy, Rent and Invest in real estate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <KYCVerification />
            <LoadingScreen />
            <Box bg={COLORS.black} overflow={"hidden"} h="100vh">
                {children}
            </Box>
        </>
    )
}