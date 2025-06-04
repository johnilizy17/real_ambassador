import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Form, Formik } from "formik";
import CustomInput from "@/layout/utills/CustomInput";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { fetchAddressData, getAddressData } from "@/url/api's/claimAddress";
import DownStep from "@/template/Step/DownStep";


export default function AccountBanner({ list, name, VerificationApi }: { list: any, name: string, VerificationApi: any }) {
    const [data, setData] = useState([])
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state: any) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [bulk, setBulk] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState({
        lat: 9.0820,
        lng: 8.6753
    });


    const handleShowPasswordChange = (show: boolean) => {
        setShowPassword(show);
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Kindly provide a valid email address")
            .required("Email address is required")
    });


    async function showClaimedAddresses() {
        const { data } = await getAddressData({ lat: position.lat, lng: position.lng });
        setData(data.gainCode)
    }

    const closingEnumeration = () => {
        setBulk(false)
        onClose()
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {name === "Referrals" ?
                            <DownStep />
                            :
                            <>
                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Center justifyContent={["space-between"]} flexDir={["column", "column", "column", "row"]} alignItems={["center"]} gap={2} w="full" h={["auto", "auto", "auto", "129px"]} mt="16px" bg={COLORS.blue} borderRadius="8px" p={["20px", "20px", "20px", "10px"]}>
                <Center>
                    <Img style={{ height: 60 }} mr="20px" src="/images/enumeration.jpg" />
                    <Box>
                        <Box fontWeight="700" fontSize={["18px", "18px", "18px", "26px"]} color="#fff">
                            {name}
                        </Box>
                        <Box fontSize={["10px", "10px", "10px", "11px"]} color="#fff" opacity={0.8}>
                            {list.totalItems} {name}
                        </Box>
                    </Box>
                </Center>
                <Flex gap={2}>
                    <Button onClick={() => {
                        onOpen()
                        setBulk(false)
                    }} borderRadius="4.81px" bg={COLORS.green} color={COLORS.white}>
                        <Box mr="5px">Add {name}</Box>
                        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86919 0.897135L4.23538 0.530951C4.40183 0.381149 4.6515 0.381149 4.8013 0.530951L8.04702 3.76003C8.19682 3.92647 8.19682 4.17614 8.04702 4.32595L4.8013 7.57166C4.6515 7.72147 4.40183 7.72147 4.23538 7.57166L3.86919 7.20548C3.71939 7.03903 3.71939 6.78936 3.86919 6.62292L5.8832 4.70877H1.10617C0.873147 4.70877 0.7067 4.54233 0.7067 4.3093V3.77667C0.7067 3.56029 0.873147 3.3772 1.10617 3.3772H5.8832L3.86919 1.4797C3.71939 1.31325 3.70275 1.06358 3.86919 0.897135Z" fill="white" />
                        </svg>
                    </Button>
                </Flex>
            </Center>
        </>
    )
}