import { COLORS } from '@/layout/Theme';
import { Box, Button, Flex, Step, StepIcon, StepIndicator, Stepper, StepStatus, Text, VStack } from '@chakra-ui/react';
import { ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import StepFour from './Step4';
import StepFive from './Step5';
import StepStarter from './Step';

export default function CustomerStep({ onClose, VerificationApi }: any) {
    const [wizardStep, setWizardStep] = useState(0)
    const steps = [
        { title: "Method" },
        { title: "Personal" },
        { title: "Contact" },
        { title: "Auth" },
        { title: "Plan" },
        { title: "Payment" },
    ]
    const [data, setData] = useState({ plan: "", duration: 365, type: "" })

    return (
        <Box py="4">
            {/* Unified Progress Indicator */}
            <Box mb="8">
                <Flex justify="space-between" align="center" mb="3">
                    <VStack align="start" spacing={0}>
                        <Text fontSize="xs" fontWeight="700" color="blue.600" textTransform="uppercase" letterSpacing="wider">
                            Step {wizardStep + 1} of {steps.length}
                        </Text>
                        <Text fontSize="lg" fontWeight="800" color="gray.900" mt={1}>
                            {steps[wizardStep].title}
                        </Text>
                    </VStack>
                    <Text fontSize="sm" fontWeight="700" color="gray.400">
                        {Math.round(((wizardStep + 1) / steps.length) * 100)}%
                    </Text>
                </Flex>
                <Box h="6px" w="full" bg="gray.100" borderRadius="full" overflow="hidden">
                    <Box
                        h="full"
                        w={`${((wizardStep + 1) / steps.length) * 100}%`}
                        bg="blue.500"
                        transition="all 0.3s ease-in-out"
                        borderRadius="full"
                    />
                </Box>
            </Box>

            <VStack align="stretch" spacing="6">
                {wizardStep === 0 ? <StepStarter setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                    : wizardStep === 1 ? <StepOne setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                        : wizardStep === 2 ? <StepTwo setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                            : wizardStep === 3 ? <StepThree disable={false} onClose={onClose} VerificationApi={VerificationApi} setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                                : wizardStep === 4 ? <StepFour setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                                    : <StepFive setData={setData} page={wizardStep} setPage={setWizardStep} data={data} onClose={onClose} />
                }
            </VStack>
        </Box>
    )
}
