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
import { ArrowForwardIcon, HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { COLORS } from "@/layout/Theme";
import { NavData } from "../DashboardLayout/NavData";
import Image from "next/image";

const CoporateNavBar = () => {

    const [stored, setStored] = useState()
    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Stop animation after 3 seconds
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 6000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    return (
        <>
            <Center h="72px" pl={["20px", "20px", "20px", "120px"]} pr={["20px", "20px", "20px", "120px"]} w="100vw" boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)" justifyContent="space-between" bg={COLORS.white} top="0px" pos="fixed" zIndex={1000}>
                <Center>
                    <Link href="/" >
                        <Box h="40px" w="40px" className="logo">
                            <Img src="/assets/images/logo.png" alt="Logo" className={isAnimating ? "animate-image" : ""} />
                        </Box>
                    </Link>
                    {/*                     <Center ml={["19px", "19px", "19px", "69px"]} bg="#F9F9F9" borderRadius="10px" pl="10px" pr="10px" h="40px">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5763 9.54717H10.0343L9.8422 9.36192C10.5146 8.57976 10.9194 7.56432 10.9194 6.45969C10.9194 3.99657 8.92281 2 6.45969 2C3.99657 2 2 3.99657 2 6.45969C2 8.92281 3.99657 10.9194 6.45969 10.9194C7.56432 10.9194 8.57976 10.5146 9.36192 9.8422L9.54717 10.0343V10.5763L12.9777 14L14 12.9777L10.5763 9.54717ZM6.45969 9.54717C4.75129 9.54717 3.37221 8.1681 3.37221 6.45969C3.37221 4.75129 4.75129 3.37221 6.45969 3.37221C8.1681 3.37221 9.54717 4.75129 9.54717 6.45969C9.54717 8.1681 8.1681 9.54717 6.45969 9.54717Z" fill="#898989" />
                        </svg>
                        <Input focusBorderColor='transparent' w={["150px", "150px", "150px", "300px"]} placeholder='Search…' ml="5px" borderColor="transparent" />
                    </Center> */}
                </Center>
                <Center>
                    <Button display={["none", "none", "none", "flex"]} fontWeight="700" borderRadius="30px" fontSize="12px" color="#f05050" border={`1px solid ${COLORS.brand_grey}`} bg="white" h="29.6px" w="94.6px" >
                        Test Mode
                    </Button>
                    <IconButton display={["none", "none", "none", "flex"]} bg="white" mr="20px" aria-label="" ml="10px" w="26px" h="26px">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.1001 23.5295C14.2001 23.5295 15.1001 22.6295 15.1001 21.5295H11.1001C11.1001 22.6295 12.0001 23.5295 13.1001 23.5295ZM19.6001 17.5295V12.0295C19.6001 8.95954 17.4701 6.38954 14.6001 5.70954V5.02954C14.6001 4.19954 13.9301 3.52954 13.1001 3.52954C12.2701 3.52954 11.6001 4.19954 11.6001 5.02954V5.70954C8.7301 6.38954 6.6001 8.95954 6.6001 12.0295V17.5295L4.6001 19.5295V20.5295H21.6001V19.5295L19.6001 17.5295Z" fill="#898989" />
                            <circle cx="20.6001" cy="5.52954" r="4" fill="#F9837C" stroke="white" strokeWidth="2" />
                        </svg>
                    </IconButton>
                    <Menu>
                        <MenuButton textAlign="start" fontWeight="700" p="0px" _hover={{ color: "#7ed31f" }} colorScheme='white' color={router.pathname === "/Products" ? "#7ed31f" : COLORS.black} bg="transparent" as={Button} rightIcon={<ChevronDownIcon />}>
                            <Center overflow="hidden" borderRadius="32px" w="32px" h="32px">
                                <Img src="/payout/profile.png" objectFit="contain" w="50px" h="50px" />
                            </Center>
                        </MenuButton>
                        <MenuList>
                            <MenuItem fontSize="16px" fontWeight="500" minH='48px'>
                                <span>Profile</span>
                            </MenuItem>
                            <Link href="/corporate_dashboard/key">
                                <MenuItem _hover={{ color: "#7ed31f" }} fontSize="16px" fontWeight="500" minH='40px'>
                                    <span>Setting</span>
                                </MenuItem>
                            </Link>
                            <MenuItem display={["flex", "flex", "flex", "none"]} _hover={{ color: "#7ed31f" }} fontSize="16px" fontWeight="500" minH='40px'>
                                <span>Notification</span>
                            </MenuItem>
                            <MenuItem display={["flex", "flex", "flex", "none"]} color="#f05050" _hover={{ color: "#7ed31f" }} fontSize="16px" fontWeight="500" minH='40px'>
                                <span>Test Mode</span>
                            </MenuItem>
                        </MenuList>
                    </Menu>

                </Center>
            </Center>

        </>
    );
};

export default CoporateNavBar;