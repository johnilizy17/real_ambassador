import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Box, Center, Text } from "@chakra-ui/react";
import { COLORS } from "@/utils/Theme";
import NoAuthLayer from "@/contants/Rapper/NoAuthLayer";
import Header from "@/components/layout/Header";
import Banner from "@/components/landingPage/Banner";
import About from "@/components/landingPage/About";
import Plan from "@/components/landingPage/Plan";
import Transaction from "@/components/landingPage/Transaction";
import Testimonal from "@/components/landingPage/Testimonal";
import FAQ from "@/components/landingPage/FAQ";

export default function Home() {
  return (
    <NoAuthLayer seoTitle="Home">
      <Box color={COLORS.brand_grey} bg={COLORS.white}>
        <Header />
        <Box h="100px" />
        <Banner />
        <About />
        <Plan />
        <div className="btm_investment_wrapper float_left">
          <div className="investment_overlay"></div>
        </div>
        <Transaction />
        <Testimonal />
        <FAQ />
      </Box>
    </NoAuthLayer>
  );
}
