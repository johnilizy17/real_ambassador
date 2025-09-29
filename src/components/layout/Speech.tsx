import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Img,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { COLORS } from "../utils/theme";
import { createChatMassages, createKnowledgeBase, createKnowledgeBaseAnonymous } from "@/url/api's/userProfile";
import { useSelector } from "react-redux";
import { extractEmail, extractEmailFromSpeech } from "@/utils/constants";

interface ChatMessage {
    message: string;
    sentTime: string;
    sender: "Me" | "abn";
    direction: "outgoing" | "incoming";
}

interface ApiMessage {
    role: "assistant" | "user";
    content: string;
    created_at: string;
}

export default function Speech({ setDisplay }: any) {
    const [text, setText] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);
    const toast = useToast();
    const { user } = useSelector((a: any) => a.auth)
    const [email, setEmail] = useState("")
    const [messages, setMessages] = useState<any>([]);
    const [unKnow, setUnknow] = useState(false)


    let recognition: any = null;

    if (typeof window !== "undefined") {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.interimResults = false;

            recognition.onresult = (event: any) => {
                setText(event.results[0][0].transcript);
                handleSend(event.results[0][0].transcript);
                setIsListening(false);
            };

            recognition.onerror = () => {
                setIsListening(false);
                toast({
                    title: "Speech recognition failed",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            };
        }
    }

    const startListening = () => {
        if (recognition) {
            setIsListening(true);
            recognition.start();
        } else {
            toast({
                title: "Speech recognition not supported in this browser.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const speakText = () => {
        if (!text.trim()) return;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    const speakText2 = (speech: string) => {
        if (!speech.trim()) return;
        const utterance = new SpeechSynthesisUtterance(speech);
        speechSynthesis.speak(utterance);
    };

    const handleSend = async (text: string): Promise<void> => {
        const newMessage: ChatMessage = {
            message: text,
            sentTime: "just now",
            sender: "Me",
            direction: "outgoing",
        };

        if (unKnow) {
            if (!text.trim()) return;

            setMessages((prev: ChatMessage[]) => [
                ...prev,
                newMessage,
                {
                    message: "typing....",
                    sentTime: "just now",
                    sender: "abn",
                    direction: "incoming",
                },
            ]);

            const massages = await createChatMassages({ id: email, chat: text });
            const massageData: ApiMessage[] = massages.data;

            if (massages && massages.data) {
                if (massageData[massageData.length - 1].role === "assistant") {
                    speakText2(massageData[massageData.length - 1].content)
                }

                const filteredMassage: ChatMessage[] = massageData.map((a) =>
                    a.role === "assistant"
                        ? {
                            message: a.content,
                            sentTime: a.created_at,
                            sender: "abn",
                            direction: "incoming",
                        }
                        : {
                            message: a.content,
                            sentTime: a.created_at,
                            sender: "Me",
                            direction: "outgoing",
                        }
                );

                setMessages(filteredMassage);
            }
        } else {
            setMessages((prev: ChatMessage[]) => [...prev, newMessage]);
            const emailData = extractEmailFromSpeech(text);

            if (emailData) {
                setUnknow(true);
                setMessages((prev: ChatMessage[]) => [
                    ...prev,
                    {
                        message: `typing...`,
                        sentTime: "just now",
                        sender: "abn",
                        direction: "incoming",
                    },
                ]);

                const massages = await createChatMassages({ id: emailData, chat: text });
                const massageData: ApiMessage[] = massages.data;

                if (massages && massages.data) {
                    if (massageData[massageData.length - 1].role === "assistant") {
                        speakText2(massageData[massageData.length - 1].content)
                    }

                    const filteredMassage: ChatMessage[] = massageData.map((a) =>
                        a.role === "assistant"
                            ? {
                                message: a.content,
                                sentTime: a.created_at,
                                sender: "abn",
                                direction: "incoming",
                            }
                            : {
                                message: a.content,
                                sentTime: a.created_at,
                                sender: "Me",
                                direction: "outgoing",
                            }
                    );
                    setMessages(filteredMassage);
                }

                setEmail(emailData);
            } else {
                speakText2("please enter a valid email")
                setMessages((prev: ChatMessage[]) => [
                    ...prev,
                    {
                        message: "please enter a valid email",
                        sentTime: "just now",
                        sender: "abn",
                        direction: "incoming",
                    },
                ]);
            }
        }
    };


    useEffect(() => {
        if (email) {
            if (user && user.email) {
                createKnowledgeBase()
            } else {
                createKnowledgeBaseAnonymous(email)
            }
        }
    }, [email, text])

    useEffect(() => {
        if (user && user.id) {
            setUnknow(true)
            setMessages([
                {
                    message: "Hi welcome to abn customer care",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming",
                }])
            speakText2("Hi welcome to abn customer care")

            setEmail(user.email)
        } else {
            setUnknow(false)
            speakText2("Hi welcome to abn customer care kindly enter your email to start chatting or login to have access to your account")
        }
    }, [])



    return (
        <Container bg={COLORS.blue} borderRadius={"15px"} zIndex="200" position="fixed" bottom={"10px"} right={["0px", "20px"]} maxW={["300px", "lg"]} py={10}>
            <VStack spacing={6}>
                <Flex justifyContent={"start"} w="full">
                    <Img h="50px" src="/logo/logo_white.png" />

                </Flex>
                <Box display="flex" gap={3}>
                    <Button
                        colorScheme="green"
                        onClick={startListening}
                        isLoading={isListening}
                        loadingText="Listening..."
                    >
                        Start Speaking
                    </Button>

                    <Button colorScheme="red" onClick={() => setDisplay(false)}>
                        Cancel
                    </Button>
                </Box>

                <Textarea
                    placeholder="Recognized text will appear here..."
                    value={text}
                    disabled={true}
                    style={{ color: "#fff" }}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                />
            </VStack>
        </Container>
    );
}
