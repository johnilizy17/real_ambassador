import { Center, Img, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import LottieLoader from '@/contants/LottieLoader';
import Robot from '@/Asset/robot.json';
import Speech from './Speech';
import ChatModeModal from '@/template/ChatMode';

export default function AIChat() {

    const [display, setDisplay] = useState(true)
    const [type, setType] = useState<any>(null)
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ChatModeModal
                isOpen={isOpen}
                onClose={onClose}
                onSelect={(selectedMode) => {
                    setType(selectedMode)
                    onClose()
                    setDisplay(!display)
                }} />
            {display ?
                <Center onClick={onOpen} cursor={"pointer"} zIndex="200" position="fixed" bottom={"10px"} right="20px" h="100px" w="100px">
                    <LottieLoader animationData={Robot} width={"100px"} height={"100px"} />
                </Center>
                : type === "messaging" ?
                    <ChatMessage setDisplay={() => {
                        setDisplay(true)
                        setType(null)
                    }} display={display} />
                    :
                    <Speech setDisplay={() => {
                        setDisplay(true)
                        setType(null)
                    }} />
            }

        </>
    )
}