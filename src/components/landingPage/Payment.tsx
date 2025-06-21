import { Box, Circle, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { COLORS } from '../utils/theme';
import DownStep from '@/template/Step/DownStep';
import CustomerStep from '@/template/Step/CustomerStep';
import DownStepEdit from '@/template/Step/DownStep/DownStepEdit';
import CustomerStepEdit from '@/template/Step/CustomerStep/CustomerStepEdit';

export default function PaymentDetails({ cardBg, borderColor, tx, name, VerificationApi }: { cardBg: string, borderColor: string, tx: any, name: string, VerificationApi: any }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {name === "Referrals" ?
                            <DownStepEdit tx={tx} onClose={onClose} VerificationApi={VerificationApi} />
                            :
                            <CustomerStepEdit tx={tx} onClose={onClose} VerificationApi={VerificationApi} />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                px={4}
                py={3}
                onClick={() => {
                    tx.payment && tx.payment != 1 ?
                        console.log("alert")
                        :
                        onOpen()
                }}
            >
                <Flex justify="space-between" align="center">
                    <HStack spacing={4}>
                        <Circle size="10px" bg={tx.payment && tx.payment != 1 ? "green" : "yellow"} />
                        <Box>
                            <Text fontWeight="bold" color="black.400">{tx.firstName}</Text>
                            <Text fontSize="sm" color="black.400"> {tx.lastName}</Text>
                            <Text fontSize="sm" color={COLORS.blue}> {tx.email}</Text>
                        </Box>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}