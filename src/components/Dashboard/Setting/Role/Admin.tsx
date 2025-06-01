import { COLORS } from "@/layout/Theme";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface AdminProps {
  activeRole?: {
    role_id: string;
    role_name: string;
    permissions: any;
    capabilities: any[];
    created_at: string;
  };
  teamMembers?: string[]; // Add this if you have team members data
}

export default function Admin({ activeRole, teamMembers = [] }: AdminProps) {
  if (!activeRole) {
    return <Center>Please select a role</Center>;
  }

  // Define what permissions the role has access to
  const canAccessStatements = activeRole.permissions?.allow || [
    "View Business Performance Metrics",
    "View Transactions",
    "Manage Refunds & Disputes",
    "Manage & Update Customers",
    "View Customers",
    "Create New Customers",
    "Create and Manage Charges",
    "Manage and Invite Users",
    "View Users",
    "Invite Users"
  ];

  // Define what permissions the role doesn't have access to
  const cannotAccessStatements = activeRole.permissions?.deny || [];

  return (
    <Box ml="20px">
      <Box fontSize="18px" fontWeight="600">
        {activeRole.role_name}
      </Box>
      <Box color={COLORS.grey} fontSize="14px" fontWeight="400">
        {activeRole.role_name === "Admin" 
          ? "This role grants users the permissions to manage everything on the dashboard"
          : `This role has specific permissions defined for ${activeRole.role_name} users`}
      </Box>
      <Center 
        h="50px" 
        borderBottom={`1px solid #E7E7E7`} 
        borderTop={`1px solid #E7E7E7`} 
        mt="10px" 
        mb="20px" 
        justifyContent="start"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.3968 13.0498V11.8831C10.3968 11.2643 10.151 10.6708 9.71339 10.2332C9.27581 9.79564 8.68231 9.5498 8.06348 9.5498H3.39681C2.77797 9.5498 2.18448 9.79564 1.74689 10.2332C1.30931 10.6708 1.06348 11.2643 1.06348 11.8831V13.0498" stroke="#121212" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.73079 7.21647C7.01946 7.21647 8.06413 6.1718 8.06413 4.88314C8.06413 3.59447 7.01946 2.5498 5.73079 2.5498C4.44213 2.5498 3.39746 3.59447 3.39746 4.88314C3.39746 6.1718 4.44213 7.21647 5.73079 7.21647Z" stroke="#121212" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8975 13.0497V11.883C13.8971 11.366 13.725 10.8638 13.4083 10.4552C13.0915 10.0466 12.648 9.75474 12.1475 9.62549" stroke="#121212" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.81348 2.62549C10.3154 2.754 10.7602 3.0459 11.0779 3.45517C11.3956 3.86444 11.5681 4.36781 11.5681 4.8859C11.5681 5.404 11.3956 5.90737 11.0779 6.31664C10.7602 6.72591 10.3154 7.01781 9.81348 7.14632" stroke="#121212" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Box color={"#121212"} fontSize="14px" fontWeight="600">
          Team Members with this role ({teamMembers.length}): {teamMembers.join(", ")}
        </Box>
      </Center>
      <Flex w="full" flexDir={["column", "column", "row"]}>
        <Box w="full" mb="20px" border="1px solid #D3F9DB" h="auto" borderRadius="5px" mr="20px">
          <Center 
            w="full" 
            h="50px" 
            borderRadius="10px" 
            fontWeight="400" 
            fontSize="14px" 
            pl="20px" 
            color="#12872B" 
            justifyContent="start" 
            bg="#D3F9DB"
          >
            What this role can access
          </Center>
          {canAccessStatements.map((statement: string, index: number) => (
            <Center 
              key={index} 
              borderBottom={`1px solid ${COLORS.light_grey}`} 
              pl="20px" 
              justifyContent="start" 
              h="50px"
            >
              <Box mr="4px" fontWeight="400" fontSize="14px" color={COLORS.blue}>
                Can
              </Box>
              <Box fontWeight="400" fontSize="14px" color={COLORS.grey}>
                {statement}
              </Box>
            </Center>
          ))}
        </Box>
        <Box w="full" border="1px solid #FFD7D7" borderRadius="5px" h="auto">
          <Center 
            w="full" 
            h="50px" 
            borderRadius="10px" 
            fontWeight="400" 
            fontSize="14px" 
            pl="20px" 
            color="#A40000" 
            justifyContent="start" 
            bg="#FFD7D7"
          >
            What this role {"can't"} access
          </Center>
          {cannotAccessStatements.length > 0 ? (
            cannotAccessStatements.map((statement: string, index: number) => (
              <Center 
                key={index} 
                borderBottom={`1px solid ${COLORS.light_grey}`} 
                pl="20px" 
                justifyContent="start" 
                h="50px"
              >
                <Box mr="4px" fontWeight="400" fontSize="14px" color={COLORS.red}>
                  Cannot
                </Box>
                <Box fontWeight="400" fontSize="14px" color={COLORS.grey}>
                  {statement}
                </Box>
              </Center>
            ))
          ) : (
            <>
              <Box textAlign="center" mt="52px" fontWeight="600" fontSize="16px" color={COLORS.black}>
                This role has full access!
              </Box>
              <Box textAlign="center" pb="52px">
                Any team member with this role can
                access all the sections of the dashboard.
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}