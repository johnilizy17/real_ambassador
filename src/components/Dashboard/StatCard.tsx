import { Box, Flex, Icon, Text, VStack, HStack } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    changeType?: "increase" | "decrease" | "neutral";
    icon: LucideIcon;
    helperText?: string;
}

export default function StatCard({ label, value, change, changeType, icon, helperText }: StatCardProps) {
    const changeColor = changeType === "increase" ? "green.500" : changeType === "decrease" ? "red.500" : "gray.500";

    return (
        <Box
            bg="white"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            shadow="sm"
        >
            <Flex justify="space-between" align="start" mb={4}>
                <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="500" color="gray.500">
                        {label}
                    </Text>
                    <Text fontSize="3xl" fontWeight="700" color="gray.900">
                        {value}
                    </Text>
                </VStack>
                <Flex
                    w="40px"
                    h="40px"
                    bg="gray.50"
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    color="gray.400"
                >
                    <Icon as={icon} boxSize={5} />
                </Flex>
            </Flex>

            <HStack spacing={1}>
                {change && (
                    <Text fontSize="sm" fontWeight="600" color={changeColor}>
                        {change}
                    </Text>
                )}
                {helperText && (
                    <Text fontSize="sm" color="gray.400">
                        {helperText}
                    </Text>
                )}
            </HStack>
        </Box>
    );
}
