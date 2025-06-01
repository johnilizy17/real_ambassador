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
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { COLORS } from "./Theme";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { getCookie } from "@/url/variable";

const Navbar = ({ isOpen, onToggle }: HeaderPackage) => {

    const [stored, setStored] = useState()
    const toast = useToast()
    const router = useRouter()
    const [active, setActive] = useState(false)
    const [role, setRole] = useState<any>()

    useEffect(() => {
        const user = getCookie("role")
        setRole(user)
    }, [])
    return (
        <>
            <Modal isCentered isOpen={active} onClose={() => setActive(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register As</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button onClick={() => router.push("/auth/signup?user=")} justifyContent="start" bg="white" w="full">
                            <Box>
                                General User
                            </Box>
                        </Button>
                        <Button onClick={() => router.push("/auth/signup?user=verification-officer")} justifyContent="start" bg="white" w="full">
                            <Box>
                                Verification Officer
                            </Box>
                        </Button>
                        <Button onClick={() => router.push("/auth/signup?user=organization")} justifyContent="start" bg="white" w="full">
                            <Box>
                                Organization
                            </Box>
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box>
                <Slide
                    direction="right"
                    in={isOpen}
                    style={isOpen ? { zIndex: 2000, height: "full", top: "0px" } : {}}
                >
                    <Flex justifyContent={"flex-end"}>
                        <Box
                            p="20px"
                            pt="60px"
                            color={COLORS.black}
                            mt="70px"
                            bg={COLORS.white}
                            w={"260px"}
                            h="100vh"
                        >
                            <Link href="/">
                                <Box
                                    mb="5px"
                                    fontSize="16px"
                                    color={COLORS.black}
                                    fontWeight="700"
                                    cursor="pointer"
                                    onClick={onToggle}
                                >
                                    Home
                                </Box>
                            </Link>
                            <Menu >
                                <MenuButton textAlign="start" fontWeight="700" p="0px" _hover={{ color: "#2766AD" }} colorScheme='white' color={router.pathname === "/Products" ? "#2766AD" : COLORS.black} bg="transparent" as={Button} rightIcon={<ChevronDownIcon />}>
                                    Address
                                </MenuButton>
                                <MenuList>
                                    <MenuItem  onClick={() => router.push("/address")} fontSize="16px" fontWeight="500" minH='48px'>
                                        <span>Instant Address</span>
                                    </MenuItem>
                                    <MenuItem _hover={{ color: "#2766AD" }}  fontSize="16px" fontWeight="500" minH='40px'>
                                        <span>Address Verification</span>
                                    </MenuItem>
                                    <MenuItem  fontSize="16px" fontWeight="500" minH='40px'>
                                        <Center>
                                            <Box>
                                                Developer
                                            </Box>
                                            <Center w="64px" ml="5px" color="#32A071" borderRadius="14.02px" fontSize="8px" fontWeight="500"  h="16px" bg="#a7f3d0">
                                                Coming soon
                                            </Center>
                                        </Center>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Box>
                                <Menu>
                                    <MenuButton textAlign="start" fontWeight="700" p="0px" _hover={{ color: "#2766AD" }} colorScheme='white' color={router.pathname === "/Products" ? "#2766AD" : COLORS.black} bg="transparent" as={Button} rightIcon={<ChevronDownIcon />}>
                                        Solutions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => router.push("/organisation?type=1")}  fontSize="16px" fontWeight="500" minH='48px'>
                                            <span>Private Institution</span>
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push("/organisation?type=2")} _hover={{ color: "#2766AD" }}  fontSize="16px" fontWeight="500" minH='40px'>
                                            <span>Public Organisation</span>
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push("/organisation?type=3")}  fontSize="16px" fontWeight="500" minH='40px'>
                                            <span>Government</span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                            <Flex position="absolute" bottom="10px">

                                {role ?
                                    <Link href={role == "5" ? "/corporate_dashboard" : role == "6" ? "/dashboard/dashboard" : "/dashboard"}> <Button id="cta-btn" bg={COLORS.blue} colorScheme='blue'>Dashboard</Button></Link>
                                    :
                                    <>
                                        <Button w="80px" mr="10px" onClick={() => Router.push("/auth/login")} colorScheme="black" color={COLORS.black} border="1px solid #000">
                                            Log in
                                        </Button>
                                        <Button onClick={() => {
                                            setActive(true)
                                            onToggle()
                                        }} colorScheme="blackAlpha" bg={COLORS.blue}>
                                            Register
                                        </Button>
                                    </>
                                }                            </Flex>
                        </Box>
                    </Flex>
                </Slide>
            </Box >
        </>
    );
};

export default Navbar;