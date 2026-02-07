import { COLORS } from '@/layout/Theme';
import { Box, Button, Flex, Step, StepIcon, StepIndicator, Stepper, StepStatus, Text, VStack } from '@chakra-ui/react';
import { ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';

export default function DownStep({ onClose, VerificationApi }: any) {
    const [wizardStep, setWizardStep] = useState(1)
    const steps = [
        { title: "Personal Details" },
        { title: "Contact Info" },
        { title: "Registration Fee" }
    ]
    const [data, setData] = useState({})

    return (
        <Box py="4">
            {/* Unified Progress Indicator */}
            <Box mb="8">
                <Flex justify="space-between" align="center" mb="3">
                    <VStack align="start" spacing={0}>
                        <Text fontSize="xs" fontWeight="700" color="blue.600" textTransform="uppercase" letterSpacing="wider">
                            Step {wizardStep} of {steps.length}
                        </Text>
                        <Text fontSize="lg" fontWeight="800" color="gray.900" mt={1}>
                            {steps[wizardStep - 1].title}
                        </Text>
                    </VStack>
                    <Text fontSize="sm" fontWeight="700" color="gray.400">
                        {Math.round((wizardStep / steps.length) * 100)}%
                    </Text>
                </Flex>
                <Box h="6px" w="full" bg="gray.100" borderRadius="full" overflow="hidden">
                    <Box
                        h="full"
                        w={`${(wizardStep / steps.length) * 100}%`}
                        bg="blue.500"
                        transition="all 0.3s ease-in-out"
                        borderRadius="full"
                    />
                </Box>
            </Box>

            <VStack align="stretch" spacing="6">
                {wizardStep === 1 ? (
                    <StepOne setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                ) : wizardStep === 2 ? (
                    <StepTwo setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                ) : (
                    <StepThree
                        disable={false}
                        onClose={onClose}
                        VerificationApi={VerificationApi}
                        setData={setData}
                        page={wizardStep}
                        setPage={setWizardStep}
                        data={data}
                    />
                )}
            </VStack>
        </Box>
    )
}