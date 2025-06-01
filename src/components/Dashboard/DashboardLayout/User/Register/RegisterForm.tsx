import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    Marker,
} from "@vis.gl/react-google-maps";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Button,
    Box,
    Flex,
    Text,
    Link as ChakraLink,
    VStack,
    Heading,
    useToast,
    Center,
    Img,
    Spinner,
    IconButton,
} from '@chakra-ui/react'
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomInput from "@/layout/utills/CustomInput";
import { COLORS } from "@/layout/Theme";
import Image from "next/image";
import { createAddressData, getAddressData } from "@/url/api's/claimAddress";
import { useSelector } from "react-redux";

export default function MainMap({ data }: any) {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState({ addressData: { address: {} } });
    const [rememberMe, setRememberMe] = useState(false);
    const [display, setDisplay] = useState(false)
    const [userAddress, setUserAddress] = useState(data)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [position, setPosition] = useState({
        lat: 9.0820,
        lng: 8.6753
    });
    const validationSchema = Yup.object({

    });

    const claimAddress = async () => {
        try {
            setLoading2(true)
            const userAddressID = userAddress.address
            let claimingAddress = await createAddressData({ user_id: user.user_id, address: userAddressID, data: {} })
            toast({
                position: "top-right",
                description: "Address successfully claimed",
                status: "success",
                isClosable: true,
            });
            router.push({ pathname: "/dashboard/user/claim/2", query: position })
        } catch (error: any) {
            toast({
                position: "top-right",
                description: error.response.data.message,
                status: "error",
                isClosable: true,
            });
            setLoading2(false)
        }
    };

    function getLocation() {
        setLoading(true)
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((permissionStatus) => {
                    if (permissionStatus.state === "denied") {
                        toast({
                            position: "top-right",
                            description: "Please allow location access.",
                            status: "error",
                            isClosable: true,
                        });
                        window.location.href = "app-settings:location";
                    } else {
                        navigator.geolocation.getCurrentPosition(success, error);
                    }
                });
        } else {
            toast({
                position: "top-right",
                description: "Geolocation is not supported in your browser.",
                status: "error",
                isClosable: true,
            });
        }
        setLoading(false)
    }

    async function success(position: any) {
        setLoading(true)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({ lat: latitude, lng: longitude })
        setLoading(false)
    }

    function error(err: any) {
        toast({
            position: "top-right",
            description: "Unable to retrieve your location",
            status: "error",
            isClosable: true,
        });
    }

    async function FetchAddressClaim() {
        const { data } = await getAddressData({ lat: position.lat, lng: position.lng })
        setShowPassword(data)
        const address = data.gainCode
        setUserAddress({ ...data.address, address: address })
    }

    const handleMarkerDragEnd = (e: any) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setPosition(newPosition);
    };

    useEffect(() => {
        FetchAddressClaim()
    }, [position.lat])
    useEffect(() => {
        getLocation()
    }, [])


    const copy = (url: string) => {
        toast({
            title: "copied successfully",
            position: "top-right",
            status: "success",
            isClosable: true,
        })
        navigator.clipboard.writeText(url)
    }

    return (
        <>
            {loading ?
                <Center w="full" h="500px">
                    <Spinner size="xl" />
                </Center>
                :
                <>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Claim Your Address</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Center
                                    left="0px"
                                    w={"full"}
                                    mt="10px"
                                    mb="20px"
                                    justifyContent="space-between"
                                >
                                    <Box fontWeight="800">
                                        Digital Address:
                                    </Box>
                                    <Center>
                                        <Box mr="10px">
                                            {userAddress.address}
                                        </Box>
                                        <IconButton onClick={() => copy(userAddress.address)} aria-label="">
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                                            </svg>
                                        </IconButton>
                                    </Center>
                                </Center>
                                <Center
                                    left="0px"
                                    w={"full"}
                                    justifyContent="center"
                                >
                                    <Button
                                        colorScheme="blue"
                                        bg={COLORS.blue}
                                        h="50"
                                        isLoading={loading2}
                                        isDisabled={loading2}
                                        onClick={() => { claimAddress() }}
                                        w={["125px", "175px"]}
                                        borderRadius="6px"
                                        type="submit"
                                        color={COLORS.white}
                                    >
                                        Claim Address
                                    </Button>
                                </Center>

                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <APIProvider apiKey="AIzaSyDL_NHLL9smjZB3ux8jvqvqE8jIdtPRWVM">
                        <Box h={["400px", "400px", "600px", "500px"]} w="full">
                            <Map center={position} defaultCenter={position} defaultZoom={18} mapTypeId="hybrid" gestureHandling="greedy">
                                <Marker draggable={true} onDragEnd={handleMarkerDragEnd} onClick={onOpen} position={position} icon={{ url: "/assets/images/mapmarker.png"}}/>
                            </Map>
                        </Box>
                    </APIProvider>
                </>
            }
        </>);
}
