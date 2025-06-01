import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Center,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { COLORS } from "@/layout/Theme";
export default function Navtab() {

    const [active, setActive] = useState(1)

    const data = [{
        date: "23 Mar, 2024 - 8:03 am",
        title: "evwidonor initiated a transfer"
    },
    {
        date: "23 Mar, 2024 - 8:03 am",
        title: "evwidonor initiated a transfer"
    },
    {
        date: "23 Mar, 2024 - 8:03 am",
        title: "evwidonor initiated a transfer"
    }]

    return (
        <Box w={["full", "full", "full", "65%"]} color={COLORS.white} borderRadius="10px">
            {data.map((a: any, b: number) => (
                <Center key={b} justifyContent="space-between" borderBottomColor="" cursor="pointer" p="15px" h="50px" bg={b === active ? COLORS.blue : "white"} onClick={() => setActive(b)}>
                    <Center>
                        <Box mr="19px" color={COLORS.black} fontWeight="400" fontSize="14px" >
                            {a.date}
                        </Box>
                        <Box color={COLORS.black} fontWeight="400" fontSize="14px" >
                            {a.title}
                        </Box>
                    </Center>
                    <svg width="7" height="19" viewBox="0 0 7 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_665_26308)">
                            <path d="M6.12665 9.80717C6.19212 9.87265 6.22486 9.94795 6.22486 10.0331C6.22486 10.1182 6.19212 10.1935 6.12665 10.259L1.54986 14.8357C1.48438 14.9012 1.40909 14.934 1.32397 14.934C1.23885 14.934 1.16355 14.9012 1.09807 14.8357L0.607003 14.3447C0.541527 14.2792 0.508789 14.2039 0.508789 14.1188C0.508789 14.0337 0.541527 13.9584 0.607003 13.8929L4.46683 10.0331L0.607003 6.17325C0.541527 6.10777 0.508789 6.03247 0.508789 5.94735C0.508789 5.86223 0.541527 5.78694 0.607003 5.72146L1.09807 5.23039C1.16355 5.16491 1.23885 5.13217 1.32397 5.13217C1.40909 5.13217 1.48438 5.16491 1.54986 5.23039L6.12665 9.80717Z" fill="#667085" />
                        </g>
                        <defs>
                            <clipPath id="clip0_665_26308">
                                <rect width="6.44" height="17.6" fill="white" transform="matrix(1 0 0 -1 0.303711 18.2045)" />
                            </clipPath>
                        </defs>
                    </svg>

                </Center>))
            }
        </Box >
    )
}