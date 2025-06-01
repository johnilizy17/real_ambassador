import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import PieChart from "./Piechart";
import { Box, Center, Card, CardHeader, CardBody, Flex, Text } from "@chakra-ui/react";
import { metrics as adminMetrics } from "@/url/api's/admin";
import { COLORS } from "@/layout/Theme";

Chart.register(CategoryScale);

export default function PieChartComponent() {
    const [chartData, setChartData] = useState({
        labels: ['Verified', 'Claimed', 'Unverified'],
        datasets: [
            {
                label: 'Verification Status',
                data: [0, 0, 0],
                backgroundColor: [
                    '#7ED31F',  // Green for Verified
                    '#2766AD',  // Blue for Claimed
                    '#667085'   // Grey for Unverified
                ],
                borderWidth: 1,
            }
        ]
    });

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const metricsData = await adminMetrics();
                
                // Calculate verification status
                const verifiedAddresses = metricsData.total_verified_addresses || 0;
                const claimedAddresses = metricsData.total_claimed_addresses || 0;
                const unverifiedAddresses = Math.max(0, claimedAddresses - verifiedAddresses);

                // Update chart data
                setChartData({
                    labels: ['Verified', 'Claimed', 'Unverified'],
                    datasets: [
                        {
                            label: 'Verification Status',
                            data: [
                                verifiedAddresses, 
                                claimedAddresses, 
                                unverifiedAddresses
                            ],
                            backgroundColor: [
                                '#7ED31F',  // Green for Verified
                                '#2766AD',  // Blue for Claimed
                                '#667085'   // Grey for Unverified
                            ],
                            borderWidth: 1,
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };

        fetchMetrics();
    }, []);

    // Check if data is empty
    const hasData = chartData.datasets[0].data.some(value => value > 0);

    if (!hasData) {
        return (
            <Card>
                <CardBody>
                    <Box textAlign="center" color="gray.500">
                        No data available
                    </Box>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card w="full">
            <CardBody>
                <Center w="full" h="full">
                    <PieChart chartData={chartData} />
                </Center>
            </CardBody>
        </Card>
    );
}