import { Box } from "@chakra-ui/react";
import React from "react";
import HomeHeader from "./HomeHeader";
import HomeCard from "./HomeCard";
import HomeChart from "./HomeChart";
import HomeTable from "./HomeTable";
import HomeTableUsage from "./HomeTableUsage";


export default function DashboardHome() {

    return (
        <Box pt={["0px", "0px", "0px", "40px"]}>
            <HomeHeader />
            <HomeCard />
            <HomeChart />
            <HomeTable />
            <HomeTableUsage />

            <Box h="100px" />
        </Box>
    )
}