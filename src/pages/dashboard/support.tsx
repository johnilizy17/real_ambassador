import UserSideBar from '@/components/Dashboard/DashboardLayout/UserSideBar';
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Icon,
    Input,
    Textarea,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import React from 'react';
import PageAnimation from "@/components/PageAnimation";

const SupportPage = () => {
    const faqs = [
        {
            question: "How do I track my referrals?",
            answer: "You can track your referrals in real-time through the 'Referrals' tab in your dashboard. It displays a list of everyone you've referred and their current status."
        },
        {
            question: "When do I receive my commission?",
            answer: "Commissions are processed according to our 5-day payout cycle. Once a referred user's payment is confirmed, your commission will appear in your 'Pending Payout' and will be available for withdrawal after the verification period."
        },
        {
            question: "How do I advance to the next tier?",
            answer: "Advancing to the next tier depends on the number of successful referrals and total volume. You can check your current progress and requirements in the 'Tier Progress' section on your Dashboard."
        },
        {
            question: "What payment methods are available?",
            answer: "We support bank transfers for all payouts. You can also perform internal transfers to other ABN accounts or use your balance for deposits."
        },
        {
            question: "Can I refer businesses from any industry?",
            answer: "Yes, our program is open to referrals across various industries. However, specific partner categories may have different commission structures."
        },
        {
            question: "How do I share my referral link?",
            answer: "Your unique referral link is available on the Dashboard home page. Simply click the 'Copy Link' button to share it with your network via social media, email, or messaging apps."
        }
    ];

    return (
        <UserSideBar>
            <PageAnimation>
                <Box bg="#F9FAFB" minH="100vh" p={{ base: "4", md: "8" }} mt="120px">
                    {/* Header */}
                    <Box mb="8">
                        <Heading size="lg" fontWeight="700" mb="1">Support</Heading>
                        <Text color="gray.600">Get help and answers to your questions</Text>
                    </Box>

                    {/* Contact Cards */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
                        <Box
                            bg="white"
                            p="6"
                            borderRadius="xl"
                            shadow="sm"
                            border="1px solid"
                            borderColor="gray.100"
                            cursor="pointer"
                            _hover={{ shadow: "md", borderColor: "blue.200" }}
                            onClick={() => window.location.href = "mailto:abnarinohsrealty@gmail.com"}
                        >
                            <Icon as={Mail} color="blue.600" boxSize={6} mb="4" />
                            <Heading size="sm" mb="4">Email Support</Heading>
                            <Text fontSize="sm" color="gray.600" mb="1">abnarinohsrealty@gmail.com</Text>
                            <Text fontSize="xs" color="gray.400">Response within 24 hours</Text>
                        </Box>

                        <Box
                            bg="white"
                            p="6"
                            borderRadius="xl"
                            shadow="sm"
                            border="1px solid"
                            borderColor="gray.100"
                            cursor="pointer"
                            _hover={{ shadow: "md", borderColor: "blue.200" }}
                            onClick={() => window.location.href = "tel:08151175414"}
                        >
                            <Icon as={Phone} color="blue.600" boxSize={6} mb="4" />
                            <Heading size="sm" mb="4">Phone Support</Heading>
                            <Text fontSize="sm" color="gray.600" mb="1">08151175414</Text>
                            <Text fontSize="xs" color="gray.400">Mon-Fri, 9am-5pm EST</Text>
                        </Box>

                        <Box
                            bg="white"
                            p="6"
                            borderRadius="xl"
                            shadow="sm"
                            border="1px solid"
                            borderColor="gray.100"
                            cursor="pointer"
                            _hover={{ shadow: "md", borderColor: "blue.200" }}
                            onClick={() => window.open("https://wa.me/2348151175414", "_blank")}
                        >
                            <Icon as={MessageCircle} color="blue.600" boxSize={6} mb="4" />
                            <Heading size="sm" mb="4">Live Chat</Heading>
                            <Text fontSize="sm" color="gray.600" mb="1">Chat with our team</Text>
                            <Text fontSize="xs" color="gray.400">Available 9am-9pm EST</Text>
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="8">
                        {/* Contact Form */}
                        <Box bg="white" p="8" borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100">
                            <Heading size="md" mb="2">Contact Form</Heading>
                            <Text color="gray.500" fontSize="sm" mb="6">Send us a message and we'll respond shortly</Text>

                            <VStack spacing="4">
                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="600">Name</FormLabel>
                                    <Input placeholder="Your name" bg="gray.50" border="none" _focus={{ bg: "white", ring: 2, ringColor: "blue.400" }} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="600">Email</FormLabel>
                                    <Input type="email" placeholder="your@email.com" bg="gray.50" border="none" _focus={{ bg: "white", ring: 2, ringColor: "blue.400" }} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="600">Subject</FormLabel>
                                    <Input placeholder="How can we help?" bg="gray.50" border="none" _focus={{ bg: "white", ring: 2, ringColor: "blue.400" }} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="sm" fontWeight="600">Message</FormLabel>
                                    <Textarea placeholder="Describe your issue or question" bg="gray.50" border="none" rows={5} _focus={{ bg: "white", ring: 2, ringColor: "blue.400" }} />
                                </FormControl>

                                <Button colorScheme="blue" w="full" bg="#0047AB" _hover={{ bg: "#003580" }} h="50px" mt="4">
                                    Send Message
                                </Button>
                            </VStack>
                        </Box>

                        {/* FAQ Accordion */}
                        <Box bg="white" p="8" borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100">
                            <HStack mb="6">
                                <Icon as={HelpCircle} color="blue.600" boxSize={5} />
                                <Heading size="md">Frequently Asked Questions</Heading>
                            </HStack>

                            <Accordion allowMultiple variant="unstyled">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} borderBottom="1px solid" borderColor="gray.100" py="2">
                                        <AccordionButton px="0" _hover={{ bg: "transparent" }}>
                                            <Box flex="1" textAlign="left" fontWeight="600" fontSize="sm" color="gray.700">
                                                {faq.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4} px="0" color="gray.500" fontSize="sm">
                                            {faq.answer}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Box>
                    </SimpleGrid>
                </Box>
            </PageAnimation>
        </UserSideBar>
    );
};

export default SupportPage;
