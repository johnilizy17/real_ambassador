import { 
    Box, 
    Button, 
    Center, 
    useToast, 
    IconButton, 
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Image
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';

export default function AddressCard({ label, address, phone, showClaimedAddresses, onVerify, onDelete }: any) {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isVerifyOpen, onOpen: onVerifyOpen, onClose: onVerifyClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();

    async function VerifyAddress() {
        try {
            setLoading(true);
            await onVerify();
            toast({
                position: "top-right",
                description: "Address successfully submit for verification",
                status: "success",
                isClosable: true,
            });
            setLoading(false);
            onVerifyClose();
        } catch (err: any) {
            setLoading(false);
            toast({
                position: "top-right",
                description: err.message || "Verification failed",
                status: "error",
                isClosable: true,
            });
        }
    }

    async function DeleteAddress() {
        try {
            setLoading(true);
            await onDelete();
            await showClaimedAddresses();
            toast({
                position: "top-right",
                description: "Successfully deleted address",
                status: "success",
                isClosable: true,
            });
            setLoading(false);
            onDeleteClose();
        } catch (err: any) {
            setLoading(false);
            toast({
                position: "top-right",
                description: err.message || "Deletion failed",
                status: "error",
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this address?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={DeleteAddress} isLoading={loading}>
                            Delete
                        </Button>
                        <Button variant='ghost' onClick={onDeleteClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isCentered isOpen={isVerifyOpen} onClose={onVerifyClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verify Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            We would like to inform you that one of our representatives will visit your location for address verification
                        </Box>
                        <Center mt="20px" justifyContent="space-between">
                            <Button 
                                onClick={VerifyAddress}
                                isLoading={loading}
                                isDisabled={loading}
                                colorScheme="green"
                            >
                                Verify
                            </Button>
                            <Button 
                                onClick={onVerifyClose}
                                isDisabled={loading}
                                colorScheme="red"
                            >
                                Cancel
                            </Button>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Box
                p={3}
                borderRadius="32px"
                w="full"
                maxW="xl"
                mb={5}
                position="relative"
                bg="#1e3a8a"
                overflow="hidden"
            >
            <Image
                        src="/assets/images/p-logo.png"
                        alt="Logo"
                        position="absolute"
                        top={8}
                        left={8}
                        w="32px"
                        h="40px"
                    />
                <Box
                    p={8}
                    borderRadius="29px"
                    border="2px solid"
                    borderColor="#90EE90"
                    position="relative"
                >
                    <IconButton
                        aria-label="Delete Address"
                        icon={<CloseIcon />}
                        position="absolute"
                        top={4}
                        right={4}
                        size="sm"
                        onClick={onDeleteOpen}
                        isLoading={loading}
                        isDisabled={loading}
                        color="#90EE90"
                        variant="ghost"
                        _hover={{ bg: "#2a4494" }}
                    />

                    <VStack mt={0} color="#90EE90" spacing={4} align="stretch" alignItems="center">
                        <Center mt={-4}>
                            {/* <Box w="120px" fontWeight="bold">Address:</Box> */}
                            <Box fontWeight="bold" fontSize="25px" justifyContent="center" display="flex" alignItems="center">{label}</Box>
                        </Center>
{/*                         <Center justifyContent="start" mb={4}>
                            <Box w="120px" fontWeight="bold">Date Created:</Box>
                            <Box>{address.substring(0, 10)}</Box>
                        </Center>
                        <Center justifyContent="start" mb={4}>
                            <Box w="120px" fontWeight="bold">Time Created:</Box>
                            <Box>{phone.slice(-9)}</Box>
                        </Center> */}
                    </VStack>

                    <Center mt={8}>
                        <Box
                            w="full"
                            maxW="2xl"
                            h="96px"
                            bg="#2a4494"
                            borderRadius="lg"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <QRCodeSVG
                                value={label}
                                size={80}
                                bgColor="transparent"
                                fgColor="#90EE90"
                                level="L"
                            />
                        </Box>
                    </Center>

                    <Center 
                        mt={8} 
                        flexDir={["column", "row"]} 
                        gap={4}
                    >
                        <Button
                            onClick={onVerifyOpen}
                            isLoading={loading}
                            bg="#90EE90"
                            color="#1e3a8a"
                            w={["full", "auto"]}
                            _hover={{ bg: "#7fcd7f" }}
                        >
                            Verify address
                        </Button>
                        <Button
                            onClick={() => router.push(`/dashboard/user/view_address?result=${label}`)}
                            isDisabled={loading}
                            bg="#90EE90"
                            color="#1e3a8a"
                            w={["full", "auto"]}
                            _hover={{ bg: "#7fcd7f" }}
                        >
                            View address
                        </Button>
                    </Center>
                </Box>
            </Box>
        </>
    );
}