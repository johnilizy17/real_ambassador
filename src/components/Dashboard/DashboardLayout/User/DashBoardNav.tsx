import React, { useState, useEffect } from "react";
import {
    Box,
    Img,
    Flex,
    Text,
    Center,
    HStack,
    Slide,
    useDisclosure,
    Button,
    useToast,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    MenuItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Avatar
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { COLORS } from "@/layout/Theme";
import { NavDataUser } from "./NavDataUser";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookies } from "@/url/variable";
import authLogout from "@/url/axios/logout";
import animationData from '@/Asset/notification.json';
import Lottie from "react-lottie";
import NotificationVendDisplay from '../Notification';
import { getNotifications } from "@/url/api's/userProfile";
import LottieLoader from "@/utils/LottieLoader";
import { logoutUser } from "@/redux/slices/auth/authSlice";

interface Notification {
    id: string;
    user_id: string;
    title: string;
    body: string;
    type: string;
    timestamp: string;
    read: boolean;
}

interface SubNavItem {
    name: string;
    link: string;
}

interface NavItem {
    item: string;
    nav: string;
    svg: React.ReactNode;
    subNav?: SubNavItem[];
}

const DashboardNavUser = () => {

    const [stored, setStored] = useState()
    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(false)
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const isNavActive = (item: NavItem) => {
        const isMainPathActive = router.pathname === item.nav;
        const isSubPathActive = item.subNav?.some(sub => router.pathname === sub.link);
        return isMainPathActive || isSubPathActive;
    };
    const handleNavigation = (e: React.MouseEvent<HTMLElement>, path: string) => {
        e.preventDefault();
        router.push(path);
    };
    const [notificationsData, setNotificationsData] = useState<Notification[]>([]); // Type the state
    const dispatch = useDispatch()
    const [error, setError] = useState<null | string>(null); // Add error state


    const logout = () => {
        router.push("/auth/login")
        dispatch(logoutUser("") as any)
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
            <Center h="72px" p="30px" className="TopNavTab" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)" justifyContent="space-between" bg={COLORS.white} pos="fixed" zIndex={1000}>
                <Center>
                    <Flex
                        bg={COLORS.blue}
                        h="40px"
                        w="40px"
                        mr="20px"
                        align="center"
                        justify="center"
                        borderRadius="50%"
                        display={isOpen ? "none" : "flex"}
                        onClick={onToggle}
                    >
                        <Center>
                            {!isOpen ? (
                                <HamburgerIcon w="20px" h="20px" color="#fff" transition="1s" />
                            ) : (
                                <CloseIcon w="20px" h="20px" color="#fff" transition="1s" />
                            )}
                        </Center>
                    </Flex>
                    <Link href="/" >
                        <Box cursor="pointer">
                            <Img src="/logo/logo_blue.png" w="130px" />
                        </Box>
                    </Link>
                </Center>
                <Center>
                    <Popover>
                        <PopoverTrigger>
                            <Center ml="20px">
                                <Center borderRadius={"50px"} height="40px" w="40px" mr="10px" overflow="hidden">
                                    <Avatar
                                        name={user?.firstname || "User"}
                                        size="xl"
                                        borderRadius="full"
                                    />
                                </Center>
                                <Box>
                                    <Box fontWeight="500" fontSize="14px">
                                        {user && user.lastname && user.lastname || ""}
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

                </Center >
            </Center>
            <Box>
                <Slide
                    direction="right"
                    in={notification}
                    style={notification ? { zIndex: 2000, height: "full", top: "0px" } : {}}
                >

                    <Flex justifyContent={"flex-end"}>
                        <Box
                            color={COLORS.black}
                            bg={COLORS.white}
                            w={["90%", "300px"]}
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
                                {notificationsData.length < 1 ?
                                    <Center textAlign={"center"} h="80vh" fontSize="18px" flexDirection={"column"}>

                                        <Box w={"300px"} mb="20px">
                                            <LottieLoader
                                                defaultOptions={defaultOptions}
                                                height={320}
                                                width={320} />
                                        </Box>
                                        <Text color="#fff">
                                            No Notification
                                        </Text>
                                    </Center>
                                    :
                                    notificationsData.map((item) => ( // No need for the index 'i'
                                        <NotificationVendDisplay item={item} key={item.id} id={item.id} /> // Use item.id as key
                                    ))
                                }
                            </Box>
                        </Box>
                    </Flex>
                </Slide>
                <Slide
                    direction="left"
                    in={isOpen}
                    style={isOpen ? { zIndex: 2000, height: "full", top: "0px" } : {}}
                >

                    <Flex justifyContent={"flex-start"}>
                        <Box
                            p="20px"
                            color={COLORS.black}
                            bg={COLORS.white}
                            w={"260px"}
                            h="100vh"
                        >
                            <Flex
                                bg={COLORS.blue}
                                h="40px"
                                w="40px"
                                mb="40px"
                                pos="relative"
                                align="center"
                                justify="center"
                                borderRadius="50%"
                                onClick={onToggle}
                            >
                                <Center>
                                    {!isOpen ? (
                                        <HamburgerIcon w="20px" h="20px" color="#fff" transition="1s" />
                                    ) : (
                                        <CloseIcon w="20px" h="20px" color="#fff" transition="1s" />
                                    )}
                                </Center>
                            </Flex>
                            {NavDataUser.map((item, index) => {
                                const isActive = isNavActive(item);
                                const isExpanded = expandedIndex === index;

                                return (
                                    <Box key={index}>
                                        {item.subNav ? (
                                            <IconButton
                                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                                borderLeftWidth={3}
                                                borderLeftColor={isActive ? "#7ED31F" : "transparent"}
                                                bg={isActive ? "#E9F0F7" : "transparent"}
                                                h="50px"
                                                mb="8px"
                                                w="full"
                                                aria-label={item.item}
                                                _hover={{ bg: "#F5F8FA" }}
                                            >
                                                <Flex
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    pr="20px"
                                                    color={isActive ? "#2766AD" : "#667085"}
                                                    pl="10px"
                                                    w="222px"
                                                >
                                                    <Center>
                                                        <Box w="36px">{item.svg}</Box>
                                                        <Box>{item.item}</Box>
                                                    </Center>
                                                    <Box
                                                        as="svg"
                                                        w="20px"
                                                        h="20px"
                                                        viewBox="0 0 20 21"
                                                        transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                                                        transition="transform 0.2s"
                                                    >
                                                        <path
                                                            d="M5 8.62353L10 13.6235L15 8.62353"
                                                            stroke={isActive ? "#2766AD" : COLORS.grey}
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </Box>
                                                </Flex>
                                            </IconButton>
                                        ) : (
                                            <Box>
                                                <IconButton
                                                    onClick={(e) => handleNavigation(e, item.nav)}
                                                    borderLeftWidth={3}
                                                    borderLeftColor={isActive ? "#7ED31F" : "transparent"}
                                                    bg={isActive ? "#E9F0F7" : "transparent"}
                                                    h="50px"
                                                    mb="8px"
                                                    w="full"
                                                    aria-label={item.item}
                                                    _hover={{ bg: "#F5F8FA" }}
                                                >
                                                    <Flex
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                        pr="20px"
                                                        color={isActive ? "#2766AD" : "#667085"}
                                                        pl="10px"
                                                        w="222px"
                                                        as="span"
                                                    >
                                                        <Center as="span">
                                                            <Box as="span" w="36px">{item.svg}</Box>
                                                            <Box as="span">{item.item}</Box>
                                                        </Center>
                                                    </Flex>
                                                </IconButton>
                                            </Box>
                                        )}

                                        {isExpanded && item.subNav && (
                                            <Box pl="46px" display="flex" flexDirection="column" gap="4px">
                                                {item.subNav.map((subItem, subIndex) => (
                                                    <Box
                                                        key={subIndex}
                                                        py="12px"
                                                        px="4"
                                                        fontSize="14px"
                                                        color={router.pathname === subItem.link ? "#2766AD" : COLORS.grey}
                                                        cursor="pointer"
                                                        _hover={{ bg: "#F5F8FA" }}
                                                        bg={router.pathname === subItem.link ? "#E9F0F7" : "transparent"}
                                                        onClick={(e) => handleNavigation(e, subItem.link)}
                                                    >
                                                        {subItem.name}
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                            <Box h="100px" />
                            <Button onClick={() => {
                                ApiLogout()
                            }}
                                isLoading={loading}
                                isDisabled={loading}
                                w={"260px"} justifyContent="space-between" position="absolute" left="-1px" bottom="0px" h="70px" colorScheme='gray'>
                                <Center justifyContent="flex-start">
                                    <Box textAlign="left" fontWeight="400" fontSize="18px" >
                                        Log Out
                                    </Box>
                                </Center>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                            </Button>
                        </Box>
                    </Flex>
                </Slide>
            </Box >
        </>
    );
};

export default DashboardNavUser;