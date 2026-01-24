import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    VStack,
    Icon,
    Heading,
} from '@chakra-ui/react';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function LogoutModal({ isOpen, onClose, onConfirm, isLoading }: LogoutModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
            <ModalOverlay backdropFilter="blur(4px)" />
            <ModalContent borderRadius="2xl" p="4">
                <ModalHeader textAlign="center" pt="8">
                    <VStack spacing="4">
                        <Box p="4" bg="red.50" borderRadius="full">
                            <Icon as={LogOut} color="red.500" boxSize={8} />
                        </Box>
                        <Heading size="md" fontWeight="700">Logout Confirmation</Heading>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign="center">
                    <Text color="gray.600">
                        Are you sure you want to logout? You will need to sign in again to access your account.
                    </Text>
                </ModalBody>
                <ModalFooter gap="3" pt="8">
                    <Button variant="ghost" onClick={onClose} w="full" borderRadius="xl" fontWeight="600">
                        Cancel
                    </Button>
                    <Button
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        w="full"
                        borderRadius="xl"
                        fontWeight="600"
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        Yes, Logout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

import { Box } from '@chakra-ui/react';
