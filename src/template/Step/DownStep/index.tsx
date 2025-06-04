import { COLORS } from '@/layout/Theme';
import { Button, Modal, ModalFooter, Step, StepIndicator, Stepper, StepStatus } from '@chakra-ui/react';
import { ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';

export default function DownStep() {

    const [wizardStep, setWizardStep] = useState(1)
    const steps = [
        { title: "Personal details" },
        { title: "Contact Info" },
        { title: "Registeration Fee" },
        { title: "Subscription(Optioinal)" }
    ]
    const [data, setData] = useState({})
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
            {
                wizardStep === 1 ? <StepOne setData={setData} page={wizardStep} setPage={setWizardStep} data={data} /> :
                    wizardStep === 2 ?
                        <StepTwo setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
                        :
                        <StepTwo setData={setData} page={wizardStep} setPage={setWizardStep} data={data} />
            }
        </>
    )
}