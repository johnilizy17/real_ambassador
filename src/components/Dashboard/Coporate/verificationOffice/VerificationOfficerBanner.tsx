import { COLORS } from "@/layout/Theme";
import { Box, Button, Center, Flex, Img, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import { Form, Formik } from "formik";
import CustomInput from "@/layout/utills/CustomInput";
import * as Yup from "yup";

export default function VerificationOfficerBanner() {
    const [data, setData] = useState({ otp: "" })
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleShowPasswordChange = (show: boolean) => {
        setShowPassword(show);
    };
    const validationSchema = Yup.object({
        amount: Yup.string()
            .required("amount is required"),
        token: Yup.string()
            .required("token is required")
    });
    const initiateLogin = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {


    }
    const { isOpen, onOpen, onClose } = useDisclosure()


    function WithdrawComponent() {

        return (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="auto" pb="20px" w={["300px", "300px", "300px", "504px"]}>
                    <ModalHeader justifyContent="flex-start" fontSize="20px" fontWeight="500" alignItems="center">Registeration</ModalHeader>
                    <ModalBody w="full">
                        <Formik
                            initialValues={data}
                            onSubmit={initiateLogin}
                            validationSchema={validationSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Box w="full" mt="20px">
                                        <CustomInput
                                            label="Full Name"
                                            name="name"
                                            placeholder=""
                                            fieldProps={{ type: "text" }}
                                            typeInput=""
                                            value=""
                                            showPassword={showPassword} // Pass showPassword prop
                                            onChangeShowPassword={handleShowPasswordChange} // Pass handler function

                                        />
                                    </Box>
                                    <Box w="full" mt="40px">
                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            placeholder=""
                                            fieldProps={{ type: "text" }}
                                            typeInput=""
                                            value=""
                                            showPassword={showPassword} // Pass showPassword prop
                                            onChangeShowPassword={handleShowPasswordChange} // Pass handler function
                                        />
                                    </Box>
                                    <Box w="full" mt="44px">
                                        <CustomInput
                                            label="Phone Number"
                                            name="phone_number"
                                            typeInput=""
                                            type="phone"
                                            value={phoneNumber}
                                            handleChange={setPhoneNumber}
                                            placeholder="Enter phone number"
                                            fieldProps={{ type: "phone" }}
                                            showPassword={showPassword} // Pass showPassword prop
                                            onChangeShowPassword={handleShowPasswordChange} // Pass handler function
                                        />
                                    </Box>
                                    <Flex mt="20px" justifyContent="space-between">
                                        <Button onClick={onClose} borderWidth={1} borderRadius="10px" borderColor={"gray"} background="transparent">
                                            Cancel
                                        </Button>

                                        <Button colorScheme="blue" onClick={onClose} bg={COLORS.blue} >
                                            Submit
                                        </Button>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }


    return (
        <>
            {WithdrawComponent()}
            <Center justifyContent={["space-between"]} alignItems={["center"]} w="full" h="129px" mt="16px" bg={COLORS.blue} borderRadius="8px" pl="10px" pr="20px">
                <Center>
                    <Img style={{ height: 60 }} mr="20px" src="/image/profile.jpeg" />
                    <Box>
                        <Box fontWeight="700" fontSize={["18px", "18px", "18px", "26px"]} color="#fff">
                            Verification Officer
                        </Box>
                        <Box fontSize={["10px", "10px", "10px", "11px"]} color="#fff" opacity={0.8}>
                            AVAILABLE OFFICER
                        </Box>
                    </Box>
                </Center>
                <Flex flexDir="column">
                    <Button onClick={onOpen} borderRadius="4.81px" bg={COLORS.green} color={COLORS.white}>
                        <Box mr="5px">Add Officer</Box>
                        <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86919 0.897135L4.23538 0.530951C4.40183 0.381149 4.6515 0.381149 4.8013 0.530951L8.04702 3.76003C8.19682 3.92647 8.19682 4.17614 8.04702 4.32595L4.8013 7.57166C4.6515 7.72147 4.40183 7.72147 4.23538 7.57166L3.86919 7.20548C3.71939 7.03903 3.71939 6.78936 3.86919 6.62292L5.8832 4.70877H1.10617C0.873147 4.70877 0.7067 4.54233 0.7067 4.3093V3.77667C0.7067 3.56029 0.873147 3.3772 1.10617 3.3772H5.8832L3.86919 1.4797C3.71939 1.31325 3.70275 1.06358 3.86919 0.897135Z" fill="white" />
                        </svg>
                    </Button>
                </Flex>
            </Center>
        </>
    )
}