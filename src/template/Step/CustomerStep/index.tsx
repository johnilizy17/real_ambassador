import { COLORS } from '@/layout/Theme';
import { Box, Button, Modal, ModalFooter, Step, StepIndicator, Stepper, StepStatus } from '@chakra-ui/react';
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
        { title: "Account Type" },
        { title: "Personal details" },
        { title: "Contact Info" },
        { title: "Registeration Fee" },
        { title: "Subscribe" },
        { title: "Payment Method" },
    ]
    const [data, setData] = useState({ plan: "", duration: 365, type: "" })

    return (
        <>
            <Stepper index={wizardStep}>
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
                <h1>{steps[wizardStep].title}</h1>
            </Box>
            {wizardStep === 0 ? <StepStarter setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                :
                wizardStep === 1 ? <StepOne setData={setData} page={wizardStep} setPage={setWizardStep} data={data} /> :
                    wizardStep === 2 ?
                        <StepTwo setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                        : wizardStep === 3 ?
                            <StepThree disable={false} onClose={onClose} VerificationApi={VerificationApi} setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                            : wizardStep === 4 ?
                                <StepFour setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                                :
                                <StepFive setData={setData} page={wizardStep} setPage={setWizardStep} data={data} onClose={onClose} />
            }
        </>
    )
}