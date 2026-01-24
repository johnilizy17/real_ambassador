import React from 'react';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Icon,
    Button,
    Badge,
    Link as ChakraLink,
    Flex,
    Divider,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import {
    Download,
    ExternalLink,
    Image as ImageIcon,
    FileText,
    File,
    FolderArchive,
    HelpCircle,
    Globe,
    Code,
    CheckCircle
} from 'lucide-react';

const MARKETING_MATERIALS = [
    {
        title: "Partner Banner 1200x628",
        type: "Image",
        description: "High-res banner for social media and websites",
        icon: ImageIcon,
        iconColor: "blue.500",
        bg: "blue.50"
    },
    {
        title: "Email Template",
        type: "Document",
        description: "Pre-written email to introduce ABN Pay to prospects",
        icon: FileText,
        iconColor: "blue.500",
        bg: "blue.50"
    },
    {
        title: "Product Brochure",
        type: "PDF",
        description: "Detailed overview of ABN Pay's features and benefits",
        icon: File,
        iconColor: "blue.500",
        bg: "blue.50"
    },
    {
        title: "Social Media Pack",
        type: "ZIP",
        description: "Collection of images for Instagram, Facebook, and LinkedIn",
        icon: FolderArchive,
        iconColor: "blue.500",
        bg: "blue.50"
    }
];

const USEFUL_LINKS = [
    {
        title: "ABN Pay Website",
        description: "Direct your prospects to our main site",
        url: "https://pay.abn.com.ng",
        icon: Globe
    },
    {
        title: "Partner Portal Help",
        description: "Documentation and tutorials for partners",
        url: "/dashboard/support",
        icon: HelpCircle
    },
    {
        title: "API Documentation",
        description: "Technical details for integration partners",
        url: "https://pay.abn.com.ng",
        icon: Code
    }
];

const TIPS = [
    "Personalize your outreach - mention specific benefits for each prospect's business",
    "Share success stories from your existing referrals to build trust",
    "Follow up consistently - most conversions happen after multiple touchpoints"
];

export default function Marketing() {
    return (
        <UserSideBar>
            <Box bg="#F9FAFB" minH="100vh" p={{ base: "4", md: "8" }} mt="120px">
                {/* Header */}
                <Box mb="10">
                    <Heading size="lg" fontWeight="700" mb="2" color="gray.800">Resources</Heading>
                    <Text color="gray.600">Marketing materials and helpful links for partners</Text>
                </Box>

                {/* Marketing Materials Section */}
                <Box mb="12">
                    <Heading size="md" fontWeight="700" mb="6" color="gray.800">Marketing Materials</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
                        {MARKETING_MATERIALS.map((item, idx) => (
                            <Box
                                key={idx}
                                bg="white"
                                p="6"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="gray.100"
                                shadow="sm"
                                transition="all 0.2s"
                                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                            >
                                <Flex justify="space-between" align="start">
                                    <HStack spacing="4" align="start">
                                        <Flex
                                            bg={item.bg}
                                            p="3"
                                            borderRadius="lg"
                                            align="center"
                                            justify="center"
                                        >
                                            <Icon as={item.icon} color={item.iconColor} boxSize={6} />
                                        </Flex>
                                        <VStack align="start" spacing="1">
                                            <Heading size="sm" fontWeight="700" color="gray.800">{item.title}</Heading>
                                            <Badge colorScheme="gray" fontSize="xs" fontWeight="500">{item.type}</Badge>
                                            <Text fontSize="sm" color="gray.500" pt="1">
                                                {item.description}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        color="gray.400"
                                        _hover={{ color: "blue.600", bg: "blue.50" }}
                                    >
                                        <Icon as={Download} boxSize={5} />
                                    </Button>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Useful Links Section */}
                <Box mb="12">
                    <Heading size="md" fontWeight="700" mb="6" color="gray.800">Useful Links</Heading>
                    <VStack spacing="4" align="stretch">
                        {USEFUL_LINKS.map((link, idx) => (
                            <Box
                                key={idx}
                                as="a"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                bg="white"
                                p="6"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="gray.100"
                                shadow="sm"
                                transition="all 0.2s"
                                _hover={{ shadow: "md", borderColor: "blue.100" }}
                            >
                                <Flex justify="space-between" align="center">
                                    <VStack align="start" spacing="1">
                                        <Heading size="sm" fontWeight="700" color="gray.800">{link.title}</Heading>
                                        <Text fontSize="sm" color="gray.500">{link.description}</Text>
                                    </VStack>
                                    <Icon as={ExternalLink} color="gray.400" boxSize={5} />
                                </Flex>
                            </Box>
                        ))}
                    </VStack>
                </Box>

                {/* Partner Tips Section */}
                <Box bg="gray.100" p="8" borderRadius="2xl">
                    <Heading size="md" fontWeight="700" mb="6" color="gray.800">Partner Tips</Heading>
                    <VStack spacing="4" align="stretch">
                        {TIPS.map((tip, idx) => (
                            <HStack key={idx} align="start" spacing="4">
                                <Flex
                                    bg="blue.600"
                                    color="white"
                                    w="6"
                                    h="6"
                                    borderRadius="full"
                                    align="center"
                                    justify="center"
                                    fontSize="xs"
                                    fontWeight="bold"
                                    flexShrink={0}
                                >
                                    {idx + 1}
                                </Flex>
                                <Text fontSize="sm" color="gray.700" fontWeight="500">
                                    {tip}
                                </Text>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            </Box>
        </UserSideBar>
    );
}
