import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { COLORS } from "@/utils/Theme";
import NoAuthLayer from "@/contants/Rapper/NoAuthLayer";
import Header from "@/components/layout/Header";
import Banner from "@/components/landingPage/Banner";
import About from "@/components/landingPage/About";
import Plan from "@/components/landingPage/Plan";
import TrustMarkers from "@/components/landingPage/TrustMarkers";
import Transaction from "@/components/landingPage/Transaction";
import Testimonal from "@/components/landingPage/Testimonal";
import FAQ from "@/components/landingPage/FAQ";

export default function Home() {
  return (
    <NoAuthLayer seoTitle="Home">
      <Box bg="#fff">
        <Header />
        <Banner />
        <About />
        <Plan />
        <TrustMarkers />
      </Box>
    </NoAuthLayer>
  );
}
