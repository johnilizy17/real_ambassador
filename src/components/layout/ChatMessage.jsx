import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Cancel/close icon
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { COLORS } from "../utils/theme";
import { createChatMassages, createKnowledgeBase, createKnowledgeBaseAnonymous, getAllMassages } from "@/url/api's/userProfile";
import { useSelector } from "react-redux";
import { extractEmail } from "@/utils/constants";

export default function ChatMessage({ setDisplay, display }) {
    const [isOpen, setIsOpen] = useState(true);
    const [unKnow, setUnknow] = useState(false)
    const [email, setEmail] = useState("")
    const { user } = useSelector((a) => a.auth)
    const [messages, setMessages] = useState([
        // {
        //     message: "Hey Joe! How are you?",
        //     sentTime: "just now",
        //     sender: "Me",
        //     direction: "outgoing",
        // },
    ]);

    async function GetAllMessage() {

        const data = await getAllMassages()

        console.log(data)
    }

    useEffect(() => {
        if (email) {
            if (user && user.email) {
                createKnowledgeBase()
            } else {
                createKnowledgeBaseAnonymous(email)
            }
        }
    }, [email])

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
            GetAllMessage()
            setEmail(user.email)
        } else {
            setUnknow(false)
            setMessages([
                {
                    message: "Hi welcome to abn customer care kindly enter your email to start chatting or login to have access to your account",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming",
                }
                // {
                //     message: "Hey Joe! How are you?",
                //     sentTime: "just now",
                //     sender: "Me",
                //     direction: "outgoing",
                // },
            ])
        }
    }, [])

    const handleSend = async (text) => {
        const newMessage = {
            message: text,
            sentTime: "just now",
            sender: "Me",
            direction: "outgoing",
        };
        if (unKnow) {
            if (!text.trim()) return;

            setMessages((prev) => [
                ...prev, newMessage,
                {
                    message: "typing....",
                    sentTime: "just now",
                    sender: "abn",
                    direction: "incoming",
                },
            ]);
            const massages = await createChatMassages({ id: email, chat: text })
            const massageData = massages.data
            if (massages && massages.data) {
                const filteredMassage = massageData.map((a) => {
                    if (a.role === "assistant") {
                        return {
                            message: a.content,
                            sentTime: a.created_at,
                            sender: "abn",
                            direction: "incoming",
                        }
                    } else {
                        return {
                            message: a.content,
                            sentTime: a.created_at,
                            sender: "Me",
                            direction: "outgoing",
                        }
                    }
                })

                setMessages(filteredMassage)
            }

        } else {
            setMessages((prev) => [...prev, newMessage]);
            const emailData = extractEmail(text)
            if (emailData) {
                setUnknow(true)
                setMessages((prev) => [
                    ...prev,
                    {
                        message: `typing...`,
                        sentTime: "just now",
                        sender: "abn",
                        direction: "incoming",
                    },
                ]);
                const massages = await createChatMassages({ id: emailData, chat: text })
                const massageData = massages.data
                if (massages && massages.data) {
                    const filteredMassage = massageData.map((a) => {
                        if (a.role === "assistant") {
                            return {
                                message: a.content,
                                sentTime: a.created_at,
                                sender: "abn",
                                direction: "incoming",
                            }
                        } else {
                            return {
                                message: a.content,
                                sentTime: a.created_at,
                                sender: "Me",
                                direction: "outgoing",
                            }
                        }
                    })

                    setMessages(filteredMassage)
                }
                setEmail(emailData)
            } else {
                setMessages((prev) => [
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        width: "310px",
                        height: "400px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        background: "white",
                        zIndex: 200,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Chat Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 15px",
                            background: COLORS.blue,
                            color: "white",
                            fontWeight: "600",
                        }}
                    >
                        <span>ABN Assitant <span style={{ color: COLORS.blue }}>(Online)</span></span>
                        <X
                            onClick={() => setDisplay(!display)}
                            style={{ cursor: "pointer" }}
                            size={20}
                        />
                    </div>

                    {/* Chat Body */}
                    <div style={{ flex: 1, height: 350 }}>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList>
                                    {messages.map((msg, i) => (
                                        <Message key={i} model={msg} />
                                    ))}
                                </MessageList>
                                <MessageInput
                                    placeholder="Type message here"
                                    attachButton={false}
                                    onSend={handleSend}
                                />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
