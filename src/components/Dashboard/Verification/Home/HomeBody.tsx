import { COLORS } from '@/layout/Theme';
import { Avatar, Box, Button, Card, Center, Flex, Img, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import VerificationBanner from './VerificationBanner';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { deleteCookies } from "@/url/variable";
import { getNotifications } from "@/url/api's/userProfile";
import authLogout from "@/url/axios/logout";
import animationData from '@/Asset/notification.json';

export default function VerificationBody() {
    const [stored, setStored] = useState()
    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(false)
    const { user } = useSelector((a: { auth: any }) => a.auth)    //const [notificationsData, setNotifictionData] = useState([{ uniqueID: "1", header: "created account", text: "You're now part of the G-AIM community, where we’re committed to helping you achieve your goals with ease and efficiency. Whether you’re here to track progress, stay organized, or explore new opportunities, we're excited to have you on board.", createAt:"10:00am" }]);
    const [notificationsData, setNotificationsData] = useState<Notification[]>([]); // Type the state
    const dispatch = useDispatch()
    const [error, setError] = useState<null | string>(null); // Add error state


    const logout = () => {
        router.push("/auth/login")
        toast({
            position: "top-right",
            description: "successfully Logged out",
            status: "success",
            isClosable: true,
        })
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            setError(null);
            try {
                if (user?.user_id) {
                    const response: any = await getNotifications(user.user_id);

                    // Check if the response is already a JSON object
                    if (response && typeof response === 'object' && 'notifications' in response) {
                        setNotificationsData(response.notifications);
                    } else {
                        throw new Error("Invalid response format");
                    }
                } else {
                    setError("User not logged in.");
                }
            } catch (error) {
                setError("Error fetching notifications: " + (error instanceof Error ? error.message : String(error)));
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.user_id) {
            fetchNotifications();
        }
    }, [user]);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

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
    console.log(user)
    // Show loading state if user data isn't available yet
    if (!user) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return (
        <Flex flexDir={["column"]} >
            <Box display={"flex"} flexDir={["column", "column", "column", "row"]} justifyContent="space-between" mr={["0px", "0px", "0px", "45px"]} mb="20px">
                <Card h="243px" pt="20px" w={["full", "full", "full", "400px"]}>
                    <Box pl="20px" fontWeight="600" fontSize={["24px", "24px", "24px", "36px"]}>
                        Hi {user.firstName || 'there'},
                    </Box>
                    <Box pl="20px" marginTop="8px" fontWeight="400" color={COLORS.grey} fontSize={["13px", "13px", "13px", "14px"]}>
                        Enjoy becoming a millionaire with ABN
                    </Box>
                    <Center justifyContent="start" p="20px" pt="10px">
                        <Avatar
                            name={user?.firstName || "User"}
                            size="md"
                            borderRadius="full"
                        />
                        <Box ml="5px">
                            <Box fontWeight="500" fontSize={["15px", "15px", "15px", "16px"]}>
                                {`${user.firstName || ''} ${user.lastName || ''}`}
                            </Box>
                            <Box color={COLORS.grey} marginTop="2px" fontWeight="400" fontSize={["13px", "13px", "13px", "14px"]}>
                                {user.email || 'No email provided'}
                            </Box>
                        </Box>
                    </Center>
                    <Center pl="20px" h="55px" borderTop={`1px solid ${COLORS.light_grey}`} justifyContent="start" w="full" marginTop="2px" fontWeight="400" fontSize={["13px", "13px", "13px", "14px"]}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.00016 1.3335C5.42016 1.3335 3.3335 3.42016 3.3335 6.00016C3.3335 9.50016 8.00016 14.6668 8.00016 14.6668C8.00016 14.6668 12.6668 9.50016 12.6668 6.00016C12.6668 3.42016 10.5802 1.3335 8.00016 1.3335ZM8.00016 7.66683C7.08016 7.66683 6.3335 6.92016 6.3335 6.00016C6.3335 5.08016 7.08016 4.3335 8.00016 4.3335C8.92016 4.3335 9.66683 5.08016 9.66683 6.00016C9.66683 6.92016 8.92016 7.66683 8.00016 7.66683Z" fill="#667085" />
                        </svg>
                        <Box ml="5px">
                            {user.location || 'Lagos, Nigeria'}
                        </Box>
                    </Center>
                </Card>
                <Flex mt="20px" mb="20px" display={["flex", "flex", "flex", "none"]} justifyContent={"flex-end"}>
                    <a href="https://www.abn.com.ng/">
                        <Button colorScheme='blue' mr="10px" bg={COLORS.blue}
                        >
                            <Box>
                                <Box>
                                    Buy and Sell
                                </Box>
                                <Box fontSize={"7px"} textDecor={"underline"}>
                                    properties
                                </Box>
                            </Box>
                        </Button>
                    </a>
                    <a href="https://www.pay.abn.com.ng/">
                        <Button colorScheme='green' bg={COLORS.green}>
                            <Box>
                                <Box>
                                    Land Dey
                                </Box>
                                <Box fontSize={"7px"} textDecor={"underline"}>
                                    Pay small small
                                </Box>
                            </Box></Button>
                    </a>
                </Flex>

                <Card mt="16px" p="10px" w={["full", "full", "full", "263px"]}>
                    <Img src="/images/Illustration.png" />
                    <Box p="16px">
                        <Box marginTop="8px" fontWeight="400" color={COLORS.grey} fontSize={["13px", "13px", "13px", "14px"]}>
                            I’m eager to represent the brand, connect with others, and make a positive impact as a partner.
                        </Box>
                        <Center mt="24px" justifyContent="space-between">
                            <Flex>
                                <svg style={{ marginLeft: 5 }} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#DCDCDC" />
                                </svg>
                                <svg style={{ marginLeft: 5 }} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#DCDCDC" />
                                </svg>
                                <svg style={{ marginLeft: 5 }} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#DCDCDC" />
                                </svg>
                            </Flex>
                        </Center>
                    </Box>
                </Card>
            </Box>
            <VerificationBanner />
        </Flex>
    );
}