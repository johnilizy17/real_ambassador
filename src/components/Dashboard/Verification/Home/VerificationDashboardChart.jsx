import { cashFormat } from '@/utils/cashformat'
import { COLORS } from "@/layout/Theme";
import { Box, Center, Flex, Select } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis } from "recharts";

const data = [
    {
        name: "Page A",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page B",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page C",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page D",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page E",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page F",
        uv: 0,
        pv: 0,
        amt: 0,
    },
    {
        name: "Page G",
        uv: 0,
        pv: 0,
        amt: 0,
    },
];



export default function VerificationDashboardChart() {

    const { wallet, history } = useSelector((a) => a.user)

    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            // only execute all the code below in client side
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }


    const size = useWindowSize();

    //console.log(size)

    return (
        <Box p="20px">
            <Flex justifyContent={"space-between"} mb="30px">
                <Box>
                    <Box fontWeight="700" fontSize={["24px", "32px"]}>
                        {cashFormat(wallet.amount)}
                    </Box>
                    <Box fontWeight="700" color={COLORS.grey} fontSize={["12px", "14px"]}>
                        Total Amount Made
                    </Box>
                </Box>
                <Select w="100px" placeholder='June 8 224'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
            <LineChart width={size.width > 600 ? size.width - 540 : size.width - 60} height={size.width > 600 ? 500 : 300} data={history.length > 0.1 ? history : data}>
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                <XAxis />
            </LineChart>
        </Box>

    );
}
