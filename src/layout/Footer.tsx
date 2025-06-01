import { Box, Center, Link, Text, Img } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'
import { useRouter } from "next/router";
import { COLORS } from './Theme';

export default function Footer() {


    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register As</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button onClick={() => router.push("/auth/signup?user=generaluser")} justifyContent="start" bg="white" w="full">
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
            <footer>
                <section style={{ background: COLORS.blue }} className="container footer-cta">
                    <h4>
                        <Text mb="0px" textAlign="center">
                            Sign up today for the digital address verification experience.
                        </Text>
                    </h4>
                    <Center>
                        <Button h="50px" color="#fff" style={{ textDecoration: "none" }} onClick={onOpen} className="btn" id="whiteBtn">Join Us Now</Button>
                    </Center>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="brand-section">
                            <Img src="/assets/images/logo.png" width={25} alt="" />
                            <p>
                                Empowering businesses with verified digital addresses for seamless navigation, efficient service delivery, and enhanced security across the globe.
                            </p>
                        </div>
                        <div className="list">
                            <h4>Information</h4>
                            <ul style={{ display: "block" }}>
                                <li><Link className='link' color="#fff" href="/about">About Us</Link></li>
                                <li><Link className='link' color="#fff" href="/faq">Faq</Link></li>
                                <li><Link className='link' color="#fff" href="/terms">Terms</Link></li>
                                <li><Link className='link' color="#fff" href="/policy">Policy</Link></li>
                                <li><Link className='link' color="#fff" href="/support">Support</Link></li>
                            </ul>
                        </div>
                        <div className="list">
                            <h4>Product</h4>
                            <ul style={{ display: "block" }}>
                                <li><Link className='link' color="#fff" href="/address">Digital Address </Link></li>
                                <li><Link className='link' color="#fff" href="/digital-address">Validated Digital Address </Link></li>
                                <li><Link className='link' color="#fff" href="/plaque">Digital Plaque</Link></li>
                            </ul>
                        </div>
                        <div className="list">
                            <h4>Solutions</h4>
                            <ul style={{ display: "block" }}>
                                <li><Link className='/organisation?type=1' color="#fff" href="private">Private Institutions</Link></li>
                                <li><Link className='/organisation?type=2' color="#fff" href="public">Public Organisations</Link></li>
                                <li><Link className='/organisation?type=3' color="#fff" href="government">Government </Link></li>
                            </ul>
                        </div>
                        <div className="list">
                            <h4>Contact Us</h4>
                            <ul style={{ display: "block" }}>
                                <li><Box className='link' color="#fff">21, Professor Kuimi Akingbehin Street, <br /> Off Omorinre Johnson Street, <br />Lekki Phase 1 , Lagos</Box></li>
                                <li><Link className='link' color="#fff" href="mailto:info@gainnigeria.com">info@gainnigeria.com</Link></li>
                                <li><Link className='link' color="#fff" href="tel:08035355651">+ (234) 803 535 5651</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="container foot">
                    <Box mb="10px" className="socials">
                        <Img cursor="pointer" src="/assets/icons/social/twitter.svg" alt="" />
                        <Img cursor="pointer" src="/assets/icons/social/Instagram.svg" alt="" />
                        <Img cursor="pointer" src="/assets/icons/social/linkedIn.svg" alt="" />
                    </Box>
                    <Box>
                        <p>&copy; {new Date().getFullYear()} GAIN Ltd. –  <Link className='link' color="#fff" href="/policy.html">Privacy</Link> | <Link className='link' color="#fff" href="/terms.html">Terms of Service</Link></p>
                    </Box>
                </section>
            </footer>
        </>
    )
}