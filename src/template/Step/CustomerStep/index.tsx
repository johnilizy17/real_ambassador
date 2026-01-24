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
            <Stepper index={wizardStep} size="xs" colorScheme="blue" mb="8">
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<Text fontSize="xs">{index + 1}</Text>}
                                active={<Text fontSize="xs">{index + 1}</Text>}
                            />
                        </StepIndicator>
                        <Box flexShrink='0'>
                            <Text fontSize="10px" fontWeight="700" color={wizardStep === index ? "blue.600" : "gray.400"}>
                                {step.title}
                            </Text>
                        </Box>
                    </Step>
                ))}
            </Stepper>

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
