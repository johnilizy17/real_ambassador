import { cashFormat } from '@/utils/cashformat'
import { COLORS } from "@/layout/Theme";
import { Box, Card, Center, Flex, Text, CardHeader, CardBody } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import LinerChart from './LinerChart';
import { metrics as adminMetrics } from "@/url/api's/admin";

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

export default function HomeChart() {

    return (
        <Flex p={["20px", "20px", "20px", "30px"]} justifyContent={["space-between"]} flexDir={["column", "column", "column", "row"]}>
            <Card w={["full", "full", "full", "80%"]} mr={["0px", "0px", "0px", "20px"]} borderRadius="12px" h="auto" p="32px">
                <Box  mb="10px" fontWeight="400" fontSize="20px">Verification Data</Box>
                <Box  fontWeight="400" fontSize="14px" color={COLORS.grey}>{currentDate}</Box>
                <PieChartComponent />
            </Card>
            <Card w={["full"]} mb="22px" mr={["0px", "0px", "0px", "20px"]} borderRadius="12px" h="auto" p="32px">
                <Box fontWeight="400" fontSize="20px">Payout Analysis</Box>
                <BarChartComponent />
            </Card>
            <Card w={["full"]} mb="22px" mr={["0px", "0px", "0px", "20px"]} borderRadius="12px" h="auto" p="32px">
                <Box fontWeight="400" fontSize="20px">Total Revenue</Box>
                <LinerChart />
            </Card>
        </Flex>
    );
}