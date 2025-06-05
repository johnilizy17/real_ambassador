
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SettingsAdmin from "@/components/Dashboard/Setting/SettingsAdmin";
import UserSideBar from "@/components/Dashboard/DashboardLayout/UserSideBar";
import SettingsBar from "@/components/Dashboard/Setting/SettingsBar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

interface PageItem {
    id: number;
    title: string;
    component: React.ReactNode;
    slug: string;
}

function SettingsPage() {
    const router = useRouter();
    const [activeComponent, setActiveComponent] = useState<React.ReactNode | null>(null);
    const [activeComponent2, setActiveComponent2] = useState<number>(1);

    const pages: PageItem[] = [
        {
            id: 1,
            title: "Security and login access",
            component: <SettingsBar />,
            slug: "security"
        }
    ];

    // Set the active tab based on URL param
    useEffect(() => {
        const { tab } = router.query;
        if (tab) {
            const foundPage = pages.find(page => page.slug === tab);
            if (foundPage) {
                setActiveComponent2(foundPage.id);
                setActiveComponent(foundPage.component);
            }
        } else {
            // Default to first tab if no param
            setActiveComponent2(pages[0].id);
            setActiveComponent(pages[0].component);
        }
    }, [router.query]);

    // Update URL when tab changes
    const handleTabChange = (page: PageItem) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, tab: page.slug }
            },
            undefined,
            { shallow: true }
        );

        setActiveComponent2(page.id);
        setActiveComponent(page.component);
    };

    return (
        <UserSideBar>
            <DashboardHeader title="Organization Settings" />
            <Flex bg="white" rounded="md" h="full" >
                <>
                    <Box
                        borderRightWidth={["none", "none", "thin"]}
                        w={["full", "full", "80"]}
                        display={[
                            activeComponent ? "none" : "block",
                            activeComponent ? "none" : "block",
                            "block",
                        ]}
                    >
                        <VStack
                            w="full"
                            align="stretch"
                            py="8"
                            px={["4", "4", "8"]}
                            spacing="4"
                        >
                            {pages.map((page) => {
                                return (
                                    <Flex
                                        key={page.id}
                                        alignItems="center"
                                        color={page.id === activeComponent2 ? "blue.500" : "gray.500"}
                                        role="navigation"
                                        cursor="pointer"
                                        h="30px"
                                        onClick={() => handleTabChange(page)}
                                    >
                                        <Text
                                            fontWeight={page.id === activeComponent2 ? "semibold" : "normal"}
                                            fontSize="md"
                                            w="full"
                                            mb="0px"
                                        >
                                            {page.title}
                                        </Text>
                                        <ChevronRightIcon fontWeight="normal" fontSize="2xl" />
                                    </Flex>
                                );
                            })}
                        </VStack>
                    </Box>
                    <Box flex="1" w="full">
                        {activeComponent}
                    </Box>
                </>
            </Flex>
        </UserSideBar>
    );
}

export default SettingsPage;