import { COLORS } from '@/layout/Theme';
import { Box, Button, Modal, ModalFooter, Step, StepIndicator, Stepper, StepStatus } from '@chakra-ui/react';
import { ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import StepFour from './Step4';
import StepFive from './Step5';

export default function CustomerStepEdit({ onClose, VerificationApi, tx }: any) {

    const [wizardStep, setWizardStep] = useState(1)
    const steps = [
        { title: "Registeration Fee" },
        { title: "Subscribe" },
        { title: "Payment Method" },
    ]
    const [data, setData] = useState({ plan: "Asa Plan", duration: 365, type: "daily", ...tx })

    return (
        <>
            <Stepper index={wizardStep - 1}>
                {
                    steps.map((a: { title: string }, b: number) => (
                        <Step key={b}>
                            <StepIndicator>
                                <StepStatus complete={<ShieldCheckIcon />}
                                    incomplete={<span>{b + 1}</span>}
                                    active={<span>{b + 1}</span>}
                                />
                            </StepIndicator>
                        </Step>
                    ))
                }
            </Stepper>
            <Box mt="10px">
                <h1>{steps[wizardStep - 1].title}</h1>
            </Box>
            {
                wizardStep === 1 ?
                    <StepThree onClose={onClose} VerificationApi={VerificationApi} disable={true} setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                    : wizardStep === 2 ?
                        <StepFour setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                        :
                        <StepFive setData={setData} page={wizardStep} setPage={setWizardStep} data={data} onClose={onClose} />
            }
        </>
    )
}