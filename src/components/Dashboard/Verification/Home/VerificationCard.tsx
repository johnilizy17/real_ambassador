import { cashFormat, cashFormat2 } from '@/utils/cashformat'
import { COLORS } from "@/layout/Theme";
import { Box, Card, Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { referredBalance } from '@/url/api\'s/organization';

export default function VerificationCard() {

    const [amount, setAmount] = useState(0)

    async function Balance() {
        const result = await referredBalance()
        setAmount(result)
    }

    useEffect(() => {
        Balance()
    }, [])

    const cardData = [
        { amount: cashFormat(amount), title: "Balance", color: "#2766AD" },
        { amount: 0, title: "Customer", color: "#7ED31F" },
        { amount: 0, title: "Downline", color: "#F58E18" },
    ]

    return (
        <Flex mt="20px" justifyContent={["space-between"]} flexDir={["column", "column", "column", "row"]}>
            {cardData.map((a: { amount: any, title: string, color: string }, b: number) => (
                <Card key={b} w={["full"]} mb="22px" mr={["0px", "0px", "0px", "20px"]} borderRadius="12px" h="156px" p="32px">
                    <Center w="full" mb="6px" justifyContent="space-between">
                        <Box fontWeight="700" fontSize="24px">{a.amount}</Box>
                        {b > 2 ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 6H16V4L14 2H10L8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM10.5 17.5L7 14L8.41 12.59L10.5 14.68L15.68 9.5L17.09 10.91L10.5 17.5Z" fill="#93B3D6" />
                            </svg>
                            :
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 0.5C6.81276 0.50258 4.71584 1.3726 3.16922 2.91922C1.62261 4.46584 0.752586 6.56276 0.750005 8.75C0.747994 10.5373 1.33179 12.276 2.41201 13.7C2.41201 13.7 2.63701 13.9963 2.67376 14.039L9 21.5L15.3293 14.0353C15.3623 13.9955 15.588 13.7 15.588 13.7L15.5888 13.6978C16.6682 12.2743 17.2517 10.5365 17.25 8.75C17.2474 6.56276 16.3774 4.46584 14.8308 2.91922C13.2842 1.3726 11.1872 0.50258 9 0.5ZM9 11.75C8.40666 11.75 7.82664 11.5741 7.33329 11.2444C6.83995 10.9148 6.45543 10.4462 6.22837 9.89805C6.0013 9.34987 5.94189 8.74667 6.05765 8.16473C6.1734 7.58279 6.45913 7.04824 6.87868 6.62868C7.29824 6.20912 7.83279 5.9234 8.41473 5.80764C8.99668 5.69189 9.59988 5.7513 10.1481 5.97836C10.6962 6.20542 11.1648 6.58994 11.4944 7.08329C11.8241 7.57664 12 8.15666 12 8.75C11.999 9.54535 11.6826 10.3078 11.1202 10.8702C10.5578 11.4326 9.79535 11.749 9 11.75Z" fill={a.color} />
                            </svg>
                        }
                    </Center>
                    <Box color={COLORS.grey} fontWeight="400" fontSize="14px">{a.title}</Box>
                    <Box mt="29px" h="4px" bg={a.color} w="70%" color="#fff">
                        .
                    </Box>
                </Card>
            ))}
        </Flex>
    )
}