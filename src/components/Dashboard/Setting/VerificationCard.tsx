import { COLORS } from "@/layout/Theme";
import { Box, Button, Card, Center, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AccountBank from "./AccountBank";

export default function VerificationCard() {

    const { isOpen, onOpen, onClose } = useDisclosure()

   
    function AccountModal() {

        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="359px" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="center" fontSize="20px" fontWeight="700"  alignItems="center">Change Password</ModalHeader>
                    <ModalBody w="full">
                        <AccountBank onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <>
        <Flex justifyContent="end">
        <Button colorScheme="blue" mb="20px" h="48px" bg={COLORS.blue} onClick={onOpen}>
            + Add Bank
        </Button>
        </Flex>
        <Card p="30px" w={["full","full","full", "450px"]}>
            <AccountModal />
            <Box  fontSize={["15px", "15px", "15px", "16px"]} fontWeight="600">
                Withdrawal Account
            </Box>
            <Box  color={COLORS.grey_stroke} fontSize={["11px", "11px", "11px", "12px"]} fontWeight="400">
                Add your withdrawal bank account details to help you get your funds
            </Box>
            <Box>
                <Center justifyContent="space-between"  alignItems="start" mt="10px">
                    <Box>
                        <Center w="auto">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_575_5659)">
                                    <path d="M12.0418 15.375V13.9583C12.0418 13.2069 11.7433 12.4862 11.212 11.9549C10.6806 11.4235 9.95994 11.125 9.2085 11.125H3.54183C2.79038 11.125 2.06971 11.4235 1.53836 11.9549C1.00701 12.4862 0.708496 13.2069 0.708496 13.9583V15.375" stroke="#121212" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.37484 8.29167C7.93964 8.29167 9.20817 7.02314 9.20817 5.45833C9.20817 3.89353 7.93964 2.625 6.37484 2.625C4.81003 2.625 3.5415 3.89353 3.5415 5.45833C3.5415 7.02314 4.81003 8.29167 6.37484 8.29167Z" stroke="#121212" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.2915 15.375V13.9584C16.291 13.3306 16.0821 12.7207 15.6975 12.2246C15.3129 11.7284 14.7743 11.374 14.1665 11.2171" stroke="#121212" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.3335 2.7171C11.943 2.87315 12.4831 3.2276 12.8689 3.72457C13.2547 4.22155 13.4641 4.83277 13.4641 5.46189C13.4641 6.09101 13.2547 6.70224 12.8689 7.19922C12.4831 7.69619 11.943 8.05064 11.3335 8.20669" stroke="#121212" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_575_5659">
                                        <rect width="17" height="17" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <Box ml="10px"   fontSize={["13px", "13px", "13px", "14px"]} fontWeight="400">
                                EVWIDONOR ALLEN EDOJA
                            </Box>
                        </Center>
                        <Center justifyContent="start">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1665 5.45831H2.83317C2.05077 5.45831 1.4165 6.09258 1.4165 6.87498V13.9583C1.4165 14.7407 2.05077 15.375 2.83317 15.375H14.1665C14.9489 15.375 15.5832 14.7407 15.5832 13.9583V6.87498C15.5832 6.09258 14.9489 5.45831 14.1665 5.45831Z" stroke="black" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.3332 15.375V4.04167C11.3332 3.66594 11.1839 3.30561 10.9182 3.03993C10.6526 2.77426 10.2922 2.625 9.9165 2.625H7.08317C6.70745 2.625 6.34711 2.77426 6.08144 3.03993C5.81576 3.30561 5.6665 3.66594 5.6665 4.04167V15.375" stroke="black" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Box ml="10px"   fontSize={["13px", "13px", "13px", "14px"]} fontWeight="400">
                                UBA Bank
                            </Box>
                        </Center>
                        <Center justifyContent="start">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1665 5.45831H2.83317C2.05077 5.45831 1.4165 6.09258 1.4165 6.87498V13.9583C1.4165 14.7407 2.05077 15.375 2.83317 15.375H14.1665C14.9489 15.375 15.5832 14.7407 15.5832 13.9583V6.87498C15.5832 6.09258 14.9489 5.45831 14.1665 5.45831Z" stroke="black" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.3332 15.375V4.04167C11.3332 3.66594 11.1839 3.30561 10.9182 3.03993C10.6526 2.77426 10.2922 2.625 9.9165 2.625H7.08317C6.70745 2.625 6.34711 2.77426 6.08144 3.03993C5.81576 3.30561 5.6665 3.66594 5.6665 4.04167V15.375" stroke="black" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Box ml="10px"   fontSize={["13px", "13px", "13px", "14px"]} fontWeight="400">
                                2083400230
                            </Box>
                        </Center>
                    </Box>
                    <Button onClick={onOpen}   fontSize={["15px", "15px", "15px", "16px"]} fontWeight="600">
                        Edit
                    </Button>
                </Center>
            </Box>
        </Card>
 </>
    )
}