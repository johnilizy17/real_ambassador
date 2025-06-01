import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import PieChart from "./Piechart";
import { Data } from "../Constaint";
import { Box, Center } from "@chakra-ui/react";
import BarChart from "./Barchart";

Chart.register(CategoryScale);

export default function BarChartComponent() {


    const [chartData, setChartData] = useState({});

    const data = {
        labels: ['Verified', 'Claimed', 'Unverified'],
        datasets: [
            {
                label: '',
                data: [10, 11, 12, 13, 14, 15, 45, 45],
                backgroundColor: [
                    '#7ED31F',
                    '#2766AD',
                    '#667085'
                ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <Center>
            <BarChart/>
        </Center>
    );

}