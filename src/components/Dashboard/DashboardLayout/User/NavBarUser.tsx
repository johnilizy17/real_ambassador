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
    MenuItem
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { COLORS } from "@/layout/Theme";
import { NavData } from "../NavData";
import Image from "next/image";

export default function NavBar() {

    const [stored, setStored] = useState()
    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const [active, setActive] = useState(0);

    useEffect(() => {
        NavData.map((a: any, b: number) => {
            if (router.pathname == `${a.nav}`) {
                setActive(b)
            }
        })
    }, [router.pathname]); // <-- Add router.pathname here


    return (
        <>
            <Center h="72px" p="30px" className="TopNavTab" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)" justifyContent="space-between" bg={COLORS.white} pos="fixed" zIndex={1000}>
                <Link href="/" >
                    <Box cursor="pointer">
                        <Img src="/assets/images/logo-icon.png" w="30px" />
                    </Box>
                </Link>
                <Center bg="#F9F9F9" borderRadius="16px" pl="5px" pr="5px" h="40px">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5763 9.54717H10.0343L9.8422 9.36192C10.5146 8.57976 10.9194 7.56432 10.9194 6.45969C10.9194 3.99657 8.92281 2 6.45969 2C3.99657 2 2 3.99657 2 6.45969C2 8.92281 3.99657 10.9194 6.45969 10.9194C7.56432 10.9194 8.57976 10.5146 9.36192 9.8422L9.54717 10.0343V10.5763L12.9777 14L14 12.9777L10.5763 9.54717ZM6.45969 9.54717C4.75129 9.54717 3.37221 8.1681 3.37221 6.45969C3.37221 4.75129 4.75129 3.37221 6.45969 3.37221C8.1681 3.37221 9.54717 4.75129 9.54717 6.45969C9.54717 8.1681 8.1681 9.54717 6.45969 9.54717Z" fill="#898989" />
                    </svg>
                    <Input focusBorderColor='transparent' w="150px" placeholder='Search…' ml="5px" borderColor="transparent" />
                </Center>
                <Center>
                    <Center ml="20px" zIndex={1000}>
                        <Flex
                            align="center"
                            justify="center"
                            cursor="pointer"
                        >
                            <Center>
                                <Flex
                                    bg={COLORS.blue}
                                    h="40px"
                                    w="40px"
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
                            </Center>
                        </Flex>
                    </Center>
                </Center>
            </Center>
            <Box>
                <Slide
                    direction="right"
                    in={isOpen}
                    style={isOpen ? { zIndex: 2000, height: "full", top: "0px" } : {}}
                >
                    <Flex justifyContent={"flex-end"}>
                        <Box
                            p="20px"
                            pt="40px"
                            color={COLORS.black}
                            mt="70px"
                            bg={COLORS.white}
                            w={"260px"}
                            h="100vh"
                        >
                            {NavData.map((a: any, b: number) => (
                                <Link href={a.nav} key={b}>
                                    <IconButton borderLeftWidth={3} mb="5px" borderLeftColor={router.pathname == `${a.nav}` ? "#7ED31F" : "transparent"} bg={router.pathname == `${a.nav}` ? "#E9F0F7" : "transparent"} h="50px" aria-label=''>
                                        <Flex alignItems="center" key={b} color={router.pathname == `${a.nav}` ? "#2766AD" : "#667085"} pl="10px" w="222px">
                                            <Box w="36px">
                                                {a.svg}
                                            </Box>
                                            <Box
                                                fontSize="14.56px"
                                                fontWeight="700"
                                                cursor="pointer"
                                                onClick={onToggle}
                                            >
                                                {a.item}
                                            </Box>
                                        </Flex>
                                    </IconButton>
                                </Link>
                            ))}
                            <Flex position="absolute" right="0px" bottom="0px">
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button} h="70px" w="260px" colorScheme='blue' bg={COLORS.blue}>
                                        <Center justifyContent="space-between">
                                            <Center justifyContent="flex-start">
                                                <Center borderRadius={"50px"} height="50px" w="50px" mr="20px" overflow="hidden">
                                                    <Img src="/assets/images/923190c9afedba2202f0c8bb9fe5a259.jpeg" alt="" w="80px" maxW="80px" />
                                                </Center>
                                                <Box w="50px">
                                                    <Box fontWeight="500" fontSize="14px" >
                                                        Allen Pere
                                                    </Box>
                                                    <Box textAlign="left" fontWeight="400" fontSize="12px" >
                                                        Admin
                                                    </Box>
                                                </Box>
                                            </Center>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            </svg>
                                        </Center>
                                    </MenuButton>

                                    <MenuList>
                                        <MenuItem>
                                            Notification
                                        </MenuItem>
                                        <MenuItem>
                                            Profile
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Box>
                    </Flex>
                </Slide>

            </Box >
        </>
    );
};
