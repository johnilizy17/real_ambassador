import {
    Box,
    Button,
    Flex,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    IconButton,
    Icon, Container,
    AspectRatio
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff, User, Building2, Users } from 'lucide-react';

export default function Banner({ isOpen, onOpen, onClose }: any) {
    const router = useRouter();
    const [showText, setShowText] = useState(false);
    const [playButton, setPlayButton] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 100); // Trigger animation after 100ms

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    const registrationOptions = [
        {
            title: "General User",
            icon: User,
            path: "/auth/signup"
        },
        {
            title: "Verification Officer",
            icon: Building2,
            path: "/auth/signup?user=verification-officer"
        },
        {
            title: "Organization",
            icon: Users,
            path: "/auth/signup?user=organization"
        }
    ];

    const getVideoId = (url: string) => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|vi|u\/\w+\/|embed\/|watch\?v=|.+\?v=)))([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    };

    return (
        <>
            <Modal isCentered isOpen={playButton} onClose={() => setPlayButton(false)}>
                <ModalOverlay />
                <ModalContent background="transparent">
                    <AspectRatio>
                       <Container centerContent>
                            <Box display={["none", "block"]}>
                                <iframe
                                    width="700"
                                    height="500"
                                    src={getVideoId("https://www.youtube.com/watch?v=zd32latbONI")} frameBorder="0"
                                    allowFullScreen
                                    title="YouTube Video"
                                ></iframe>
                            </Box>
                            <Box display={["block", "none"]}>
                                <iframe
                                    width="700"
                                    height="500"
                                    src={getVideoId("https://www.youtube.com/watch?v=zd32latbONI")} frameBorder="0"
                                    allowFullScreen
                                    title="YouTube Video"
                                ></iframe>
                            </Box>
                        </Container>
                    </AspectRatio>
                </ModalContent>
            </Modal>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Register As</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex gap={4} justifyContent="center">
                            {registrationOptions.map((option: any) => (
                                <VStack key={option.title} spacing={2}>
                                    <IconButton
                                        aria-label={option.title}
                                        icon={<Icon as={option.icon} boxSize={8} />}
                                        onClick={() => {
                                            router.push(option.path);
                                            onClose();
                                        }}
                                        size="lg"
                                        variant="outline"
                                        borderRadius="xl"
                                        p={8}
                                    />
                                    <Text fontSize="sm" textAlign="center">
                                        {option.title}
                                    </Text>
                                </VStack>
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box
                h={["100vh"]}
                paddingBottom={"30px"}
                mt={["20px", "70px"]}
                className="hero"
            >
                <Box
                    className="hero-contents container"
                    alignItems={"space-between"}
                    gap={["0px", "20px", "20px", "70px"]}
                    ml={["20px", "20px", "20px", "75px"]}
                    mr={["20px", "20px", "20px", "75px"]}
                    flexDirection={["column", "column", "row"]}
                >
                    <Box className="content">
                        <Text
                            fontSize={["34px", "34px", "34px", "44px", "65px"]}
                            lineHeight={["38px", "38px", "38px", "48px", "72px"]}
                            letterSpacing={["0.002", "-0.02em"]}
                            className="leading"
                            opacity={showText ? 1 : 0}
                            transform={showText ? "translateY(0)" : "translateY(20px)"}
                            transition="opacity 1.5s ease, transform 1.5s ease"
                        >
                            Grassroots Addressing and Identity Network
                        </Text>
                        <Text
                            fontSize={["16px", "16px", "20px"]}
                            marginTop={["14px", "14px", "14px", "24px"]}
                            lineHeight={["22px", "25px", "25px", "30px"]}
                            className="leadingText"
                            opacity={showText ? 1 : 0}
                            transform={showText ? "translateY(0)" : "translateY(20px)"}
                            transition="opacity 1.5s ease, transform 1.5s ease"
                        >
                            Precise addressing system for Nigeria, which has enabled it to map
                            and identify any location in Nigeria. GAIN Ltd, unlike GPS
                            coordinates, indicates a region and not a single spot.
                        </Text>
                        <Flex
                            opacity={showText ? 1 : 0}
                            transform={showText ? "translateY(0)" : "translateY(20px)"}
                            className="btn-group">
                            <Button
                                onClick={() => setPlayButton(true)}
                                h="45px" className="btn" id="whiteBtn">
                                <img src="/assets/icons/play-circle.svg" className="animate-image" alt="" /> Learn More
                            </Button>
                        </Flex>
                        <Flex
                            opacity={showText ? 1 : 0}
                            transform={showText ? "translateY(0)" : "translateY(20px)"}
                        >
                            <br />
                            <Button
                                className="btn"
                                id="secondaryBtnHero"
                                onClick={onOpen}
                                h="45px"
                            >
                                Get Address Now
                            </Button>
                            <br />
                        </Flex>
                    </Box>
                    {showText ?
                        <Box className="hero-img">
                            <img
                                src="./assets/images/Address-card.png"
                                alt=""
                                className="disp-img-1"
                            />
                            <img
                                src="./assets/images/Address-card.png"
                                alt=""
                                className="disp-img-2"
                            />
                            <img
                                src="./assets/images/Address-card.png"
                                alt=""
                                className="disp-img-3"
                            />
                            <Box className="img-effect">
                                <img
                                    src="./assets/images/town-arieal-view.jpeg"
                                    className="img-rounded-lg responsive"
                                    alt=""
                                />
                            </Box>
                        </Box>
                        :

                        <Box w="100%" />
                    }
                </Box>
                <Box className="custom-shape-divider-bottom-1718067276">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M600,112.77C268.63,112.77,0,0,0,7.23V120H1200V7.23C1200,0,931.37,112.77,600,112.77Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </Box>
            </Box>
        </>
    );
}
