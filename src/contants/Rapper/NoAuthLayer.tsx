import React, { useEffect } from "react";
import LoadingScreen from "../LoadingScreen";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { getBanner, getSavings } from "@/redux/slices/userSlice";
import Script from "next/script";
import { useHydration } from "@/utils/hydrate";
import { Box } from "@chakra-ui/react";
import { COLORS } from "@/utils/Theme";
import Footer from "@/components/layout/Footer";

export default function NoAuthLayer({ children, seoTitle }: { children: any, seoTitle?: string }) {

    const dispatch = useDispatch()

    const hydrated = useHydration();

    async function BannerFetch() {
        dispatch(getBanner("") as any)
        dispatch(getSavings("") as any)
    }

    useEffect(() => {
        BannerFetch()
    }, [])

    return (
        <>
            <Head>
                <title>AB NARINOHS Estate - {seoTitle}</title>
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
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
                strategy="beforeInteractive"
            />



            {/* Owl Carousel JS */}
            <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" strategy="afterInteractive" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" strategy="afterInteractive" />

            <LoadingScreen />
            <Box bg={COLORS.black} letterSpacing={"2px"} fontFamily={"Emoji"}>
                {hydrated && children}
                <Footer />
            </Box>

            {/* <!-- all plugins here --> */}
            <Script
                src="https://code.jquery.com/jquery-3.3.1.min.js"
                strategy="beforeInteractive" // or "afterInteractive" based on your need
            />
            <Script src="js/owl.carousel.js" />

            <Script src="js/bootstrap.min.js" />
            <Script src="js/modernizr.js" />
            <Script src="js/jquery.menu-aim.js" />
            <Script src="js/plugin.js" />
            <Script src="js/jquery.countTo.js" />
            <Script src="js/dropify.min.js" />
            <Script src="js/datatables.js" />
            <Script src="js/jquery.nice-select.min.js" />
            <Script src="js/jquery.inview.min.js" />
            <Script src="js/jquery.magnific-popup.js" />
            <Script src="js/calculator.js" />
            <Script src="js/custom.js" />

        </>
    )
}