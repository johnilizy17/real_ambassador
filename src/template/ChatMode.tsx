import { COLORS } from "@/layout/Theme";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    Text,
    useColorModeValue,
    Center,
} from "@chakra-ui/react";

interface ChatModeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (mode: "conversation" | "messaging") => void;
}

export default function ChatModeModal({
    isOpen,
    onClose,
    onSelect,
}: ChatModeModalProps) {
    const btnBgConversation = useColorModeValue("blue.500", "blue.400");
    const btnBgMessaging = useColorModeValue("green.500", "green.400");

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select Chat Mode</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Text fontSize="sm" color="gray.500">
                            Choose how you want to chat with the assistant
                        </Text>
                        <Center gap={"10px"} w="full" justifyContent={"space-between"}>
                            <Button
                                w="100px"
                                bg={COLORS.blue}
                                color="white"
                                _hover={{ opacity: 0.9 }}
                                fontSize={"12px"}
                                onClick={() => {
                                    onSelect("conversation");
                                    onClose();
                                }}
                            >
                                Conversation
                            </Button>

                            <Button
                                w="100px"
                                bg={COLORS.bold_black}
                                fontSize={"12px"}
                                color="white"
                                _hover={{ opacity: 0.9 }}
                                onClick={() => {
                                    onSelect("messaging");
                                    onClose();
                                }}
                            >
                                Messaging
                            </Button>
                        </Center>
                    </VStack>
                </ModalBody>

            </ModalContent>
        </Modal>
    );
}
