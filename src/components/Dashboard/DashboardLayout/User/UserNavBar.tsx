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
    MenuItem
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { NavDataUser } from './NavDataUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLORS } from '@/layout/Theme';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import authLogout from "@/url/axios/logout";

// Define interfaces for type safety
interface NavItem {
    nav: string;
    item: string;
    svg: React.ReactNode;
    subNav?: SubNavItem[];
}

interface SubNavItem {
    name: string;
    link: string;
}

export default function UserNavBar() {
    const router = useRouter()
    const [active, setActive] = useState<number | undefined>()
    const { isOpen, onToggle } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const auth = useSelector((a: { user: { auth: any } }) => a)
    const toast = useToast()
    const dispatch = useDispatch()

    useEffect(() => {
        NavDataUser.forEach((a: NavItem, b: number) => {
            if (router.pathname.includes(a.nav)) {
                setActive(b);
            }
        });
    }, [router.pathname]);

    const logout = () => {
        router.push("/auth/login")
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
            await authLogout()
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
        <Box display={["none", "none", "none", "block"]} overflow="hidden" w="279px" h="100vh" pl="30px" bg="#fff" pos="relative" pt="16px" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)">
            <Link href="/" >
                <Box cursor="pointer">
                    <Img h="56.12px" mb="27px" src="/logo/logo_blue.png" />
                </Box>
            </Link>
            <Box overflow="scroll" className="SibeBar">
                {NavDataUser.map((item, index) => (
                    <Box key={index}>
                        <IconButton
                            onClick={() => {
                                if (item.subNav) {
                                    setActive(active === index ? -1 : index); // Toggle submenu
                                } else {
                                    router.push(item.nav);
                                    setActive(-1); // Close submenu after navigation
                                }
                            }}
                            borderLeftWidth={3}
                            mb="8px"
                            borderLeftColor={index === active ? "#7ED31F" : "transparent"}
                            bg={index === active ? "#E9F0F7" : "transparent"}
                            h="50px"
                            aria-label=""
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                pr="20px"
                                color={index === active ? "#2766AD" : "#667085"}
                                pl="10px"
                                w="222px"
                            >
                                <Center>
                                    <Box w="36px">{item.svg}</Box>
                                    <Box>{item.item}</Box>
                                </Center>
                                {item.subNav && ( // Show chevron only if subNav exists
                                    <IconButton
                                        aria-label="Submenu"
                                        bg="transparent"
                                        transform={active === index ? "rotate(0deg)" : "rotate(180deg)"}
                                    >
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 12.6235L10 7.62353L5 12.6235" stroke={active === index ? "#2766AD" : COLORS.grey} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </IconButton>
                                )}
                            </Flex>
                        </IconButton>
                        {/* Conditionally render submenu */}
                        {active === index && item.subNav && (
                            <Box mt="-20px"> {/* Adjust top margin to overlap */}
                                {item.subNav.map((subItem, subIndex) => (
                                    <Link href={subItem.link} key={subIndex}>
                                        <IconButton
                                            aria-label={subItem.name}
                                            bg="transparent"
                                            w="full"
                                            h="50px"
                                            mb="2px"
                                        >
                                            <Center justifyContent="start" fontSize="14px" color={COLORS.grey} w="full">
                                                <Box w="50px" />
                                                {subItem.name}
                                            </Center>
                                        </IconButton>
                                    </Link>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
                <Button
                    onClick={logout}

                    w={'full'}
                    justifyContent='space-between'
                    position='absolute'
                    left='-1px'
                    bottom='0px'
                    h='70px'
                    colorScheme="gray"
                    bg="gray.100"
                    color="gray.700"
                    _hover={{ bg: "gray.200" }}
                >
                    <Center justifyContent='flex-start'>
                        <Box textAlign='left' fontWeight='400' fontSize='18px'>
                            Log Out
                        </Box>
                    </Center>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z'
                        />
                        <path
                            fillRule='evenodd'
                            d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z'
                        />
                    </svg>
                </Button>
                <Box h="70px" />
            </Box>
        </Box >
    )
}