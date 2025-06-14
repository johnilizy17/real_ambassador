import { organizationProfile } from '@/url/api\'s/organization'
import { getVerificationOfficer } from '@/url/api\'s/verification'
import { getCookie } from '@/url/variable'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import animationData from './loading.json';
import { Button, Center, Img, useDisclosure } from '@chakra-ui/react'
import LottieLoader from "@/utils/LottieLoader";
import Head from 'next/head'
import RegistrationPopUp from '@/components/Dashboard/payment/PopPlan'
import { getUserProfile } from '@/redux/slices/auth/authSlice'

export default function UserDashboardAuth({ children }: any) {
    const { user, setOnboarded } = useSelector((a: { auth: { user: any, setOnboarded: any } }) => a.auth)
    const wallet = useSelector((a: { user: { wallet: any } }) => a)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true); // Track overall loading state
    const router = useRouter();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    useEffect(() => {
        dispatch(getUserProfile("") as any)
        const fetchProfileAndOnboard = async () => {
            try {

                let profileData = await getVerificationOfficer("");

                console.log(profileData.data, "profileData")
            } catch (error) {
                console.error("Error fetching profile or onboarding:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchProfileAndOnboard();
        setTimeout(() => {
            setReload(!reload)
        }, 3000)
    }, [reload]); // Run only once on mount

    return (
        <>
            <Head>
                <title>AB NARINOHS Estate - Dashboard</title>
                <link rel="stylesheet" type="text/css" href="css/animate.css" />
                <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="css/fonts.css" />
                <link rel="stylesheet" type="text/css" href="css/flaticon.css" />
                <link rel="stylesheet" type="text/css" href="css/font-awesome.css" />
                <link rel="stylesheet" type="text/css" href="css/owl.carousel.css" />
                <link rel="stylesheet" type="text/css" href="css/owl.theme.default.css" />
                <link rel="stylesheet" type="text/css" href="css/nice-select.css" />
                <link rel="stylesheet" type="text/css" href="css/datatables.css" />
                <link rel="stylesheet" type="text/css" href="css/dropify.min.css" />
                <link rel="stylesheet" type="text/css" href="css/reset.css" />
                <link rel="stylesheet" type="text/css" href="css/magnific-popup.css" />
                <link rel="stylesheet" type="text/css" href="css/style.css" />
                <link rel="stylesheet" type="text/css" href="css/responsive.css" />
                {/* Owl Carousel CSS */}

            </Head>
            <RegistrationPopUp isOpen={user && user.payment && user.payment > 1.5 ? isOpen : !isOpen} onOpen={onOpen} onClose={onClose} />
            {/* Show loading screen only while loading is true */}
            {loading && (
                <Center w="full" background="white" zIndex={1000} pos="fixed" top="0px" flexDir="column" h="100vh">
                    <Img src="/logo/logo_blue.png" className='animate-image' h="100px" mb="10px" alt="logo Icon" />
                </Center>
            )}
            {children}
        </>
    );
}
