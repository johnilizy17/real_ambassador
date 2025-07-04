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
import { referredProfile } from "@/url/api's/organization";
import PaymentDetails from "@/components/landingPage/Payment";



export default function TokenTransactions() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [transactions, setTransactions] = useState([]);
  const [path, setPath] = useState("")
  const router = useRouter()

  async function registeredUsers(e: string) {
    const users = await referredProfile(e)
    setTransactions(users.data)
  }

  useEffect(() => {
    if (router.asPath) {
      const replacePath = router.asPath.replace("/dashboard/register/", "")
      if (replacePath == "downline") {
        registeredUsers("USERAMBASSADOR")
      } else {
        registeredUsers("USER")
      }
      setPath(replacePath)
    }
  }, [router.asPath])


  return (
    <UserSideBar>
      <Box mt="100px" p="20px">
        <Box w="full" mx="auto">
          <AccountBanner VerificationApi={() => {
            if (path == "downline") {
              registeredUsers("USERAMBASSADOR")
            } else {
              registeredUsers("USER")
            }
          }} list={[]} name={path === "downline" ? "Referrals" : "Customer"} />
          <VStack mt={"30px"} spacing={4} align="stretch">
            {transactions.length > 0.1 ?
              <>
                <h2>
                  Total people {transactions.length}
                </h2>
                {transactions.map((tx: any, index: number) => (
                  <PaymentDetails VerificationApi={() => {
                    if (path == "downline") {
                      registeredUsers("USERAMBASSADOR")
                    } else {
                      registeredUsers("USER")
                    }
                  }} name={path === "downline" ? "Referrals" : "Customer"} key={index} borderColor={borderColor} cardBg={cardBg} tx={tx} />
                ))}
              </>
              :
              <EmptyState title={`No ${path === "/dashboard/register/downline" ? "Referrals" : "Customer"} exist`} />
            }
          </VStack>
        </Box>
      </Box>
    </UserSideBar>
  );
}
