import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import {
    Box, Button, Center, Flex, Input, Select, Switch, Modal, Image,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    useDisclosure,
    Spinner,
} from '@chakra-ui/react';
import { COLORS } from '@/layout/Theme';
import ChangePassword from './ChangePassword';
import { updateProfileVerification, getUserProfile, updateUserActive } from '@/url/api\'s/userProfile';
import { useSelector } from 'react-redux';
import CustomInput from '@/layout/utills/CustomInput';

import useCustomToast from '@/hooks/useCustomToast';

interface User {
    user_id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    // ... other properties as needed
}

export default function SettingForm() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useSelector((state: any) => state.auth);
    const [phoneNumber, setPhoneNumber] = useState("234")
    const [showPassword, setShowPassword] = useState(false);
    const showMessage = useCustomToast()
    const [images, setImage] = useState("");
    const [displayImage, setDisplayImage] = useState(false);
    const [loading, setLoading] = useState(false)

    const initiateProfile = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            const result = await updateUserActive({
                ...values,
                phone: phoneNumber,
                file:images
            })
            showMessage(
                "Profile successfully upload",
                "success"
            )
            setSubmitting(true)
        } catch (err: any) {

        } finally {
            setSubmitting(false)
        }
    }

    const initiateSpinner = async (e: boolean) => {
        setShowPassword(e)
        try {
            setLoading(true)
            // const spin = await activeFactorPassword(user.corp_id, !showPassword)
        } catch (err) {
            console.log(err, "Error")
        } finally {
            setLoading(false)
        }
    }

    function loadFile(event: any) {
        setImage(event.target.files[0]);
        setDisplayImage(true);
        const advert_file: any = document.getElementById("output");
        advert_file.src = URL.createObjectURL(event.target.files[0]);
    }

    useEffect(() => {
        if(user && user.phone){
             console.log(user.phone, "email")
        //   setPhoneNumber(user.phone)
        }
    }, [])
    return (
        <Box>
            <Formik
                initialValues={{
                    lastName: user?.lastName || '',
                    firstName: user?.firstName || '',
                    email: user?.email || '',
                    phoneNumber: user?.phone_number || "0000",
                }}
                onSubmit={initiateProfile}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form>
                        <Flex direction={['column', 'column']} alignItems="center" justifyContent="space-between" mb={4}>
                            <Box w={['100%', '100%', 'full']} display={"flex"} flexDir={["column", "column", "column"]} mr={['0', '0', '4']}>
                                <Center w="full" flexDir="column" mt="30px" >
                                    <Center borderWidth="thin" rounded="sm" w={["300px", "400px"]} h="64">
                                        {!displayImage && (
                                            <svg
                                                width="124"
                                                height="102"
                                                viewBox="0 0 124 102"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M110.714 0H13.2857C5.94821 0 0 6.85005 0 15.3V86.7C0 95.15 5.94821 102 13.2857 102H110.714C118.052 102 124 95.15 124 86.7V15.3C124 6.85005 118.052 0 110.714 0ZM115.143 59.0885L87.2739 26.9944C85.5446 25.0033 82.7411 25.0033 81.0119 26.9944L44.2858 69.2885L29.7024 52.494C27.9732 50.5029 25.1697 50.5029 23.4404 52.494L8.85705 69.2885V15.3C8.85705 12.4833 10.8398 10.1999 13.2857 10.1999H110.714C113.16 10.1999 115.143 12.4833 115.143 15.3V59.0885H115.143Z"
                                                    fill="#DADADA"
                                                />
                                            </svg>
                                        )}
                                        <img
                                            id="output"
                                            style={
                                                displayImage
                                                    ? {
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }
                                                    : { display: "none" }
                                            }
                                        />
                                    </Center>
                                    <Box display="none">
                                        <Field
                                            label="advert_file"
                                            type="file"
                                            id="advert_file"
                                            name="advert_file"
                                            className="advert_file"
                                            style={{ display: "none" }}
                                            onChange={(event: any) => {
                                                loadFile(event);
                                            }}
                                            multiple
                                            accept="image/*"
                                        />
                                    </Box>
                                    <label
                                        htmlFor="advert_file"
                                        style={{
                                            width: 123,
                                            color: "#fff",
                                            display: "flex",
                                            marginTop: "20px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: 45,
                                            borderRadius: 10,
                                            background: COLORS.blue,
                                            boxShadow: "2px 8px 45px rgba(233, 211, 255, 0.25)",
                                            cursor: "pointer", // Added cursor pointer for better UX
                                        }}
                                    >
                                        Select Profile
                                    </label>
                                </Center>
                                <Box>
                                    <Center flexDir={["column", "column", "row"]} alignItems={["start", "start", "center"]} justifyContent="start" pt="30px">
                                        <Box w="126px" mb={["10px", "10px", "0px"]} mr="21px" textAlign={["start", "start", "end"]} fontWeight="700" fontSize="14px" color={COLORS.grey}>Firt Name</Box>
                                        <Input
                                            id="firstName"
                                            name="Firt Name"
                                            placeholder='Enter First Name'
                                            type="text"
                                            w="300px"
                                            onChange={handleChange}
                                            value={values.firstName}
                                        />
                                    </Center>
                                    <Center flexDir={["column", "column", "row"]} alignItems={["start", "start", "center"]} justifyContent="start" pt="30px">
                                        <Box w="126px" mb={["10px", "10px", "0px"]} mr="21px" textAlign={["start", "start", "end"]} fontWeight="700" fontSize="14px" color={COLORS.grey}>Last Name</Box>
                                        <Input
                                            id="lastName"
                                            name="Last Name"
                                            placeholder='Enter Last Name'
                                            type="text"
                                            w="300px"
                                            onChange={handleChange}
                                            value={values.lastName}
                                        />
                                    </Center>
                                    <Center flexDir={["column", "column", "row"]} alignItems={["start", "start", "center"]} justifyContent="start" pt="30px">
                                        <Box w="126px" mb={["10px", "10px", "0px"]} mr="21px" textAlign={["start", "start", "end"]} fontWeight="700" fontSize="14px" color={COLORS.grey}>Email</Box>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="text"
                                            placeholder="example@domain.com"
                                            w="300px"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                    </Center>
                                    <Center flexDir={["column", "column", "row"]} alignItems={["start", "start", "center"]} justifyContent="start" pt="30px">
                                        <Box w="126px" mb={["10px", "10px", "0px"]} mr="21px" textAlign={["start", "start", "end"]} fontWeight="700" fontSize="14px" color={COLORS.grey}>Phone Number</Box>
                                        <Box w="300px" mt="0px">
                                            <CustomInput
                                                label=""
                                                name="phone"
                                                typeInput=""
                                                type="phone"
                                                value={phoneNumber}
                                                handleChange={setPhoneNumber}
                                                placeholder="Enter phone number"
                                                fieldProps={{ type: "phone" }}
                                            />
                                        </Box>
                                    </Center>
                                </Box>
                            </Box>

                        </Flex>
                        <Center pt="30px">
                            <Button bg={COLORS.blue} color={COLORS.white} type="submit">Save Changes</Button>
                        </Center>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

// AvatarImage component:
const AvatarImage = ({ onChange, src }: { onChange: any; src: string }) => {
    return (
        <Box>
            <Image src={src} alt="Profile Picture" borderRadius="full" w="150px" h="150px" />
            <Input type="file" onChange={onChange} />
        </Box>
    )
}