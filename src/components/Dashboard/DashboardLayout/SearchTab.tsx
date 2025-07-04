import {
    Box, Center, Flex, IconButton, Img, Input, Slide, Text, Spinner,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Button,
    useToast,
    Avatar
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import animationData from '@/Asset/notification.json';
import Lottie from "react-lottie";
import NotificationVendDisplay from './Notification';
import { CloseIcon } from '@chakra-ui/icons';
import { COLORS } from '@/layout/Theme';
import { getNotifications } from "@/url/api's/userProfile"; // Adjust import path as needed
import authLogout from '@/url/axios/logout';
import { deleteCookies } from '@/url/variable';
import { useRouter } from 'next/router';
import LottieLoader from '@/utils/LottieLoader';



interface Notification {
    id: string;
    user_id: string;
    title: string;
    body: string;
    type: string;
    timestamp: string;
    read: boolean;
}

interface RootState {
    auth: {
        user: { user_id: string } | null; //Improved type for user.
    };
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export default function SearchTab() {
    const [notification, setNotification] = useState(false);
    const { user } = useSelector((state: { auth: { user: { user_id: string, lastName?: string, firstName?: string } } }) => state.auth);
    const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            setError(null);
            try {
                if (user?.user_id) {
                    const response = await getNotifications(user.user_id);

                    if (response instanceof Response) {
                        if (!response.ok) {  // Check for HTTP errors
                            const errorData: any = await response.json().catch(() => ({ message: response.statusText })); // Try to get JSON error, fallback to statusText
                            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
                        }
                        const data: any = await response.json();
                        setNotificationsData(data);  // The response is already an array of notifications
                    } else if (Array.isArray(response)) { // Check if response is already an array
                        setNotificationsData(response)
                    } else if (typeof response === 'string') {
                        try { // Try parsing if it is a string
                            const parsedResponse = JSON.parse(response)
                            setNotificationsData(parsedResponse)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    else {
                        throw new Error("Invalid response format - not a Response object or a valid JSON string"); // Throw error for unexpected type
                    }
                } else {
                    setError("User not logged in.");
                }
            } catch (error) {
                setError("Error fetching notifications: " + (error instanceof Error ? error.message : String(error)));
                console.error("Error fetching notifications:", error);
                setNotificationsData([]); // Clear notifications on error
            } finally {
                setLoading(false);
            }
        };

        if (user?.user_id) {
            fetchNotifications();
        }
    }, [user]);

    const logout = () => {
        router.push("/")

        toast({
            position: "top-right",
            description: "successfully Logged out",
            status: "success",
            isClosable: true,
        })
    }

    async function ApiLogout() {
        try {
            setLoading(true)
            const user = await authLogout()
            deleteCookies()
            deleteCookies()
            deleteCookies()
            logout()
            setLoading(false)
        } catch {
            setLoading(false)
            toast({
                position: "top-right",
                description: "Log out error",
                status: "error",
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Slide
                direction="right"
                in={notification}
                style={notification ? { zIndex: 2000, height: "full", top: "0px" } : {}}
            >
                <Flex justifyContent={"flex-end"}>
                    <Box
                        color={COLORS.black}
                        bg={COLORS.white}
                        w={["90%", "400px"]}
                        borderLeftRadius={"18px"}
                        h="100vh"
                    >
                        <Center p="10px" pt="20px" mb="40px" h="40px" justifyContent="space-between">
                            <Flex
                                bg={COLORS.blue}
                                h="40px"
                                w="40px"
                                pos="relative"
                                align="center"
                                justify="center"
                                borderRadius="50%"
                                onClick={() => setNotification(false)}
                            >
                                <Center>
                                    <CloseIcon w="20px" h="20px" color="#fff" transition="1s" />
                                </Center>
                            </Flex>
                            <Box fontWeight="900" color="black">
                                Notification
                            </Box>
                        </Center>
                        <Box p="10px" position="relative" w="full" h="full" bg="whitesmoke">
                            {loading ? (
                                <Center h="80vh">
                                    <Spinner size="lg" />
                                </Center>
                            ) : error ? (
                                <Text color="red">{error}</Text>
                            ) : notificationsData.length === 0 ? (
                                <Center textAlign={"center"} h="80vh" fontSize="18px" flexDirection={"column"}>
                                    <Box w={"300px"} mb="20px">
                                        <LottieLoader defaultOptions={defaultOptions} height={320} width={320} />
                                    </Box>
                                    <Text color="#fff">No Notification</Text>
                                </Center>
                            ) : (
                                notificationsData.map((item: Notification, index) => (
                                    <NotificationVendDisplay key={item.id} id={item.id} item={item} />
                                ))
                            )}
                        </Box>
                    </Box>
                </Flex>
            </Slide>

            <Center h="72px"  p="30px" bg="#fff" className="TopNavTab" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)" justifyContent="space-between">
                <Box />
                <Center>
                    <IconButton onClick={() => setNotification(true)} ml="10px" aria-label='' colorScheme="white">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C13.6 23 14.5 22.1 14.5 21H10.5C10.5 22.1 11.4 23 12.5 23ZM19 17V11.5C19 8.43 16.87 5.86 14 5.18V4.5C14 3.67 13.33 3 12.5 3C11.67 3 11 3.67 11 4.5V5.18C8.13 5.86 6 8.43 6 11.5V17L4 19V20H21V19L19 17Z" fill="#898989" />
                            <circle cx="20" cy="5" r="4" fill="#F9837C" stroke="white" strokeWidth="2" />
                        </svg>
                    </IconButton>
                    <Center ml="20px">
                        <Popover>
                            <PopoverTrigger>
                                <Center ml="20px">
                                    <Center borderRadius={"50px"} height="40px" w="40px" mr="10px" overflow="hidden">
                                        <Avatar
                                            name={user?.firstName || "User"}
                                            size="xl" // 'xl' roughly corresponds to 60px
                                            borderRadius="full"
                                        />
                                    </Center>
                                    <Box>
                                        <Box fontWeight="500" fontSize="14px">
                                            {user?.lastName}
                                        </Box>
                                        <Box fontWeight="800" color="green" fontSize="12px">
                                            Profiles
                                        </Box>
                                    </Box>
                                </Center>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Click the button to logout!</PopoverHeader>
                                <PopoverBody><Button
                                    onClick={() => {
                                        ApiLogout()
                                    }}

                                    isLoading={loading}
                                    isDisabled={loading}
                                    colorScheme='gray'> <Center justifyContent="flex-start">
                                        <Box textAlign="left" fontWeight="400" mr='20px' fontSize="18px" >
                                            Log Out
                                        </Box>
                                    </Center>
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg></Button></PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </Center>
                </Center>
            </Center>
        </>
    )
}
