import React, { useEffect, useState } from 'react';
import Navbar from './moblieNav';
import { Box, Button, Center, Collapse, Flex, Input, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Img } from '@chakra-ui/react';
import { ArrowForwardIcon, HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import Link from 'next/link';
import { COLORS } from './Theme';
import { useRouter } from 'next/router';
import Image from "next/image";
import { getCookie } from '@/url/variable';

export default function LandingPageHeaderComponent() {
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isSearchOpen, onToggle: toggleSearch } = useDisclosure(); // State to manage search bar visibility
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState<any>()

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            // Perform search functionality here, such as routing to the results page
            console.log("Searching for:", searchQuery);
            router.push(`/search?query=${searchQuery}`);
        }
    };

    useEffect(() => {
        const user = getCookie("role")
        setRole(user)
    }, [])

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
            <Navbar isOpen={isOpen} onToggle={onToggle} />
            <Box paddingLeft={["0px", "0px", "10px", "20px"]} paddingRight={["0px", "0px", "10px", "20px"]} className="header">
                <header className="container">
                    <Link href="/about">
                        <div className="logo">
                            <Img src="/assets/images/logo.png" alt="Logo" className={isAnimating ? "animate-image" : ""} />
                        </div>
                    </Link>
                    <nav>
                        <ul>
                            <Menu>
                                <Link href="/about">
                                    <MenuButton _hover={{ color: "#2766AD" }} colorScheme='white' fontWeight="400" color={router.pathname === "/about" ? "#2766AD" : COLORS.black} bg="transparent" as={Button}>
                                        About
                                    </MenuButton>
                                </Link>
                                <Link href="/verification">
                                    <MenuButton _hover={{ color: "#2766AD" }} colorScheme='white' fontWeight="400" color={router.pathname === "/Products" ? "#2766AD" : COLORS.black} bg="transparent" as={Button} rightIcon={<ChevronDownIcon />}>
                                        Products
                                    </MenuButton>
                                </Link>
                                <MenuList>
                                    <Link href="/address">
                                        <MenuItem fontSize="16px" fontWeight="500" minH='48px'>
                                            <span>Instant Address</span>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/verification">
                                        <MenuItem fontSize="16px" fontWeight="500" minH='48px'>
                                            <span>Address Verification</span>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/organisation?type=1">
                                        <MenuItem fontSize="16px" fontWeight="500" minH='40px'>
                                            <Center>
                                                <Box>Digital Address Plaque</Box>
                                                <Center w="64px" ml="5px" color="#32A071" borderRadius="14.02px" fontSize="8px" fontWeight="500" h="16px" bg="#a7f3d0">
                                                    New
                                                </Center>
                                            </Center>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/dcc">
                                        <MenuItem fontSize="16px" fontWeight="500" minH='40px'>
                                            <Center>
                                                <Box>Digital Contact Card</Box>
                                                <Center w="64px" ml="5px" color="#32A071" borderRadius="14.02px" fontSize="8px" fontWeight="500" h="16px" bg="#a7f3d0">
                                                    New
                                                </Center>
                                            </Center>
                                        </MenuItem>
                                    </Link>
                                    <Link href="/organisation?type=1">
                                        <MenuItem fontSize="16px" fontWeight="500" minH='40px'>
                                            <Center>
                                                <Box>Developer API</Box>
                                                <Center w="64px" ml="5px" color="#32A071" borderRadius="14.02px" fontSize="8px" fontWeight="500" h="16px" bg="#a7f3d0">
                                                    New
                                                </Center>
                                            </Center>
                                        </MenuItem>
                                    </Link>
                                </MenuList>
                            </Menu>
                            <li>
                                <Menu>
                                    <Link href="/organisation">
                                        <MenuButton _hover={{ color: "#2766AD" }} colorScheme='white' fontWeight="400" color={router.pathname === "/dashboard" ? "#2766AD" : COLORS.black} bg="transparent" as={Button} rightIcon={<ChevronDownIcon />}>
                                            Solution
                                        </MenuButton>
                                    </Link>
                                    <MenuList>
                                        <Link href="/corporate">
                                            <MenuItem fontSize="16px" fontWeight="500" minH='48px'>
                                                <span>Corporate Organizations</span>
                                            </MenuItem>
                                        </Link>
                                        <Link href="/organisation?type=2">
                                            <MenuItem fontSize="16px" fontWeight="500" minH='48px'>
                                                <span>Non Governmental Organisations </span>
                                            </MenuItem>
                                        </Link>
                                        <Link href="/organisation?type=3">
                                            <MenuItem fontSize="16px" fontWeight="500" minH='40px'>
                                                <Center>
                                                    <Box>Government</Box>
                                                </Center>
                                            </MenuItem>
                                        </Link>
                                    </MenuList>
                                </Menu>
                            </li>
                        </ul>

                        {/* Button to toggle search bar visibility */}
                        {/*                         <Button onClick={toggleSearch} ml="20px" colorScheme="blue" size="sm" padding="25px" leftIcon={<SearchIcon />}>
                            Search <br />
                            Address
                        </Button>
 */}
                        {role ?
                            <Box display={["none", "none", "none", "flex"]}>
                                <Link href={role == "5" ? "/corporate_dashboard" : role == "6" ? "/dashboard/dashboard" : "/dashboard"}> <Button id="cta-btn" bg={COLORS.blue} colorScheme='blue'>Dashboard</Button></Link>
                            </Box>
                            :
                            <div className="cta">
                                <Link href="/auth/login">Log in</Link>
                                {/* Registration Popover */}
                                <Popover>
                                    <PopoverTrigger>
                                        <Button colorScheme='blue' id="cta-btn">Register</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Link href="/auth/signup?user">
                                                <Button colorScheme="blue" variant="link" width="100%">General User</Button>
                                            </Link>
                                            <Link href="/auth/signup?user=verification-officer">
                                                <Button colorScheme="blue" variant="link" width="100%">Verification Officer</Button>
                                            </Link>
                                            <Link href="/auth/signup?user=organization">
                                                <Button colorScheme="blue" variant="link" width="100%">Organization</Button>
                                            </Link>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        }
                        <div className="nav_hamburger">
                            <Flex
                                align="center"
                                justify="center"
                                display={{ md: "none", base: "inherit" }}
                                cursor="pointer"
                            >
                                <Center>
                                    <Flex
                                        bg={COLORS.blue}
                                        h="50px"
                                        w="50px"
                                        align="center"
                                        justify="center"
                                        borderRadius="50%"
                                        onClick={onToggle}
                                    >
                                        <Center>
                                            {!isOpen ? (
                                                <HamburgerIcon w="30px" h="30px" color="#fff" transition="1s" />
                                            ) : (
                                                <CloseIcon w="30px" h="30px" color="#fff" transition="1s" />
                                            )}
                                        </Center>
                                    </Flex>
                                </Center>
                            </Flex>
                        </div>
                    </nav>
                </header>

                {/* Collapsible Search Bar */}
                <Collapse in={isSearchOpen} animateOpacity>
                    <Flex mt="10px" p="20px" bg="gray.50" justify="center" align="center" shadow="md">
                        <Input
                            placeholder="Search digital address"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="md"
                            width="300px"
                            mr="10px"
                        />
                        <Button onClick={handleSearch} bg={COLORS.blue} colorScheme="blue" size="md">
                            Search
                        </Button>
                    </Flex>
                </Collapse>
            </Box>
        </>
    );
}
