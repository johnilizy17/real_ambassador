import { Center, Img } from '@chakra-ui/react';
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import LottieLoader from '@/contants/LottieLoader';
import Robot from '@/Asset/robot.json';

export default function AIChat() {

    const [display, setDisplay] = useState(true)

    return (
        <>
            {display ?
                <Center onClick={() => setDisplay(!display)} cursor={"pointer"} zIndex="200" position="fixed" bottom={"10px"} right="20px" h="100px" w="100px">
                    <LottieLoader animationData={ Robot} width={"100px"} height={"100px"} />
                </Center>
                :
                <ChatMessage setDisplay={setDisplay} display={display} />
            }
        </>
    )
}