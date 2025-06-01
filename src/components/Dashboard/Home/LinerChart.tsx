import React, { useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { COLORS } from "@/layout/Theme";
import IndexArrow from "@/Asset/IndexArrow";
import { cashFormat, nFormatter, nFormatterNaira } from "@/utils/cashformat";

export default function LinerChart() {

    const [data, setData] = useState([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
    const [number, setNumber] = useState(100)
    function largest(arr: any) {
        let i;

        // Initialize maximum element 
        let max = arr[0];

        // Traverse array elements  
        // from second and compare 
        // every element with current max  
        for (i = 1; i < arr.length; i++) {
            if (arr[i] > max)
                max = arr[i];
        }

        return max;
    }
    useEffect(() => {
        const largestNumber = largest(data)
        setNumber(largestNumber)
    }, [data])
    return (
        <Box w="full">
            <div id="chart">

                <div>
                    <div id="point1"></div>
                    <div id="line1"></div>
                </div>
                <div>
                    <div id="point2"></div>
                    <div id="line2"></div>
                </div>
                <div>
                    <div id="point3"></div>
                    <div id="line3"></div>
                </div>
                <div>
                    <div id="point4"></div>
                    <div id="line4"></div>
                </div>
                <div>
                    <div id="point5"></div>
                </div>
            </div>
        </Box>
    )
}