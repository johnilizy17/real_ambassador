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
            <Stepper index={wizardStep - 1} size="sm" colorScheme="blue" mb="8">
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<Text fontSize="xs">{index + 1}</Text>}
                                active={<Text fontSize="xs">{index + 1}</Text>}
                            />
                        </StepIndicator>
                        <Box flexShrink='0' ml="2">
                            <Text fontSize="xs" fontWeight="700" color={wizardStep === index + 1 ? "blue.600" : "gray.400"}>
                                {step.title}
                            </Text>
                        </Box>
                    </Step>
                ))}
            </Stepper>

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