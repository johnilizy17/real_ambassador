import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Circle
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UserSideBar from "@/components/Dashboard/DashboardLayout/UserSideBar";
import { useRouter } from "next/router";
import { COLORS } from "@/layout/Theme";
import { EmptyState } from "@/components/EmptyState";
import AccountBanner from "@/components/Dashboard/AccountBanner";

const transactions: any = [
];

export default function TokenTransactions() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [path, setPath] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (router.asPath) {
      const replacePath = router.asPath.replace("/dashboard/address/", "")
      setPath(replacePath)
    }
  }, [router.asPath])


  return (
    <UserSideBar>
      <Box mt="100px" p="20px">
        <Box w="full" mx="auto">
          <AccountBanner VerificationApi={[]} list={[]} name={path === "/dashboard/register/downline" ? "Referrals" : "Customer"} />

          <VStack spacing={4} align="stretch">
            {transactions.length > 0.1 ? transactions.map((tx: any, index: number) => (
              <Box
                key={index}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                px={4}
                py={3}
              >
                <Flex justify="space-between" align="center">
                  <HStack spacing={4}>
                    <Circle size="10px" bg={path === "rejected" ? "red" : path === "validated" ? "green" : "yellow"} />
                    <Box>
                      <Text fontWeight="bold" color={COLORS.blue}>{tx.id}</Text>
                      <Text fontSize="sm" color="black.400"> {tx.address}</Text>
                      <Text fontSize="sm" color="black.400"> {tx.address}</Text>
                      <Text fontSize="sm" color="black.400"> {tx.address}</Text>
                      <Text fontSize="sm" color="black.400"> {tx.address}</Text>
                    </Box>
                  </HStack>
                </Flex>
              </Box>
            )) :
              <EmptyState title={`No ${path === "/dashboard/register/downline" ? "Referrals" : "Customer"} exist`} />
            }
          </VStack>
        </Box>
      </Box>
    </UserSideBar>
  );
}
