import { COLORS } from '@/layout/Theme';
import { Box, Button, Modal, ModalFooter, Step, StepIndicator, Stepper, StepStatus } from '@chakra-ui/react';
import { ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';

export default function DownStepEdit({ onClose, VerificationApi, tx }: any) {

    const [wizardStep, setWizardStep] = useState(1)
    const steps = [
        { title: "Registeration Fee" }
    ]
    const [data, setData] = useState({...tx})
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
            <StepThree onClose={onClose} VerificationApi={VerificationApi} disable={true} setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
        </>
    )
}