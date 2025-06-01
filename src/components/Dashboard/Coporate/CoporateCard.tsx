import { cashFormat } from '@/utils/cashformat'
import { COLORS } from "@/layout/Theme";
import { Box, Card, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function CoporateCard() {

    const cardData = [
        {
            amount: 650000, title: "Total API Consumption", color: "#2766AD",
            svg: (<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0L14 0Z" fill="#898989" />
            </svg>
            )
        },
        {
            amount: 1096.30, title: "Available credit", color: "#7ED31F",
            svg: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM10 13C8.34 13 7 11.66 7 10C7 8.34 8.34 7 10 7C11.66 7 13 8.34 13 10C13 11.66 11.66 13 10 13ZM23 7V18C23 19.1 22.1 20 21 20H4V18H21V7H23Z" fill="#898989" />
                </svg>
            )
        },
        {
            amount: 1, amount2: "API Doc", title: "View Now", color: "#F58E18", svg: (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14 2.5H6C4.9 2.5 4.01 3.4 4.01 4.5L4 20.5C4 21.6 4.89 22.5 5.99 22.5H18C19.1 22.5 20 21.6 20 20.5V8.5L14 2.5ZM16 18.5H8V16.5H16V18.5ZM16 14.5H8V12.5H16V14.5ZM13 9.5V4L18.5 9.5H13Z" fill="#898989" />
                </svg>
            )
        },
        { amount: 18, title: "Verification Officer", color: "#93B3D6" },
    ]

    return (
        <Flex pt="30px" justifyContent={["space-between"]} flexDir={["column", "column", "column", "row"]}>
            {cardData.map((a: any, b: number) => (
                <Card key={b} w={["full"]} mb="22px" mr={["0px", "0px", "0px", "20px"]} borderRadius="12px" h="126px" p="32px">
                    <Center w="full" mb="6px" justifyContent="space-between">
                        <Box  fontWeight="700" fontSize="24px">{a.amount}</Box>
                        {a.svg}
                    </Center>
                    <Center mt="10px" justifyContent="start">
                        <Box mr="10px" color={b > 1 ?COLORS.blue:COLORS.grey} fontWeight="400"  fontSize="14px">{a.title}</Box>
                        {b > 1 && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.29608 0.748921L4.771 0.274003C4.98687 0.0797185 5.31067 0.0797185 5.50496 0.274003L9.71446 4.46191C9.90874 4.67779 9.90874 5.00159 9.71446 5.19588L5.50496 9.40538C5.31067 9.59966 4.98687 9.59966 4.771 9.40538L4.29608 8.93046C4.10179 8.71459 4.10179 8.39078 4.29608 8.17491L6.90813 5.69238H0.712607C0.410387 5.69238 0.194515 5.47651 0.194515 5.17429V4.4835C0.194515 4.20287 0.410387 3.96541 0.712607 3.96541H6.90813L4.29608 1.50447C4.10179 1.2886 4.08021 0.964792 4.29608 0.748921Z" fill="#2766AD" />
                        </svg>}
                    </Center>
                </Card>
            ))}
        </Flex>
    )
}