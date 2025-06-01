import { COLORS } from "@/layout/Theme";
import { Box, Center, IconButton, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authVerifyEmail } from "@/url/api's/auth";

interface emailDto {
    email: string;
    phone: string;
}

export default function VerificationAlert() {
    const [display, setDisplay] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((a: { auth: any }) => a.auth);
    const router = useRouter();
    const toast = useToast();

    const handleDismiss = () => {
        setDisplay(false);
    };

    const handleResendVerification = async () => {
        try {
            setLoading(true);
            const payload: emailDto = {
                email: user.email_address,
                phone: user.phone_number
            };
            
            const response = await authVerifyEmail(payload);
            
            toast({
                title: "Success",
                description: response.message || "Verification email sent successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to send verification email",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            setLoading(false);
        }
    };

    if (user.email_verified === 0 && user.phone_verified === 0) {
        return (
            <Box display={display ? "flex" : "none"} bottom="1px" pl={["20px", "20px", "20px", "30px"]} pr={["20px", "20px", "20px", "30px"]} pb="0px">
                <Center justifyContent="space-between" w="full" bg="#FBE6EA" borderRadius="12px" p="10px" color="#fff">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#D90429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <Box w="full" color={COLORS.red} cursor="pointer" onClick={() => router.push("/auth/otp")}>
                        {user.email_verified === 0 ? " Your email is yet to be verified" : user.phone_verified === 0 ? " Your phone number is yet to be verified" : "Kindly Verify your address"}
                    
                    <Button 
                        onClick={handleResendVerification} 
                        mt={["20px", "20px", "20px", "0px"]} 
                        bg="#fff" 
                        ml="20px"
                        isLoading={loading}
                        loadingText="Sending..."
                    >
                        Resend Verification
                    </Button>
                    </Box>
                    <IconButton 
                        pos={["absolute", "absolute", "absolute", "relative"]} 
                        top="0px" 
                        right="10px" 
                        aria-label='Close notification'
                        bg="transparent"
                        onClick={handleDismiss}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1664 1.8335L1.83301 10.1668M1.83301 1.8335L10.1664 10.1668" stroke="#222D37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </IconButton>
                </Center>
            </Box>
        );
    }
    return null;
}