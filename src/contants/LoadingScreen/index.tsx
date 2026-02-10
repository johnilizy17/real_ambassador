import { COLORS } from '@/utils/Theme';
import { Center, Img } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LottieLoader from '../LottieLoader'
import House from './house.json';
import { useSelector } from 'react-redux';

export default function LoadingScreen() {
    const { isLoading } = useSelector((a: { user: { isLoading: boolean } }) => a.user);
    const [hasLoadedSession, setHasLoadedSession] = useState(false);

    useEffect(() => {
        const sessionLoaded = sessionStorage.getItem('hasLoaded');
        if (sessionLoaded) {
            setHasLoadedSession(true);
        }
    }, []);

    useEffect(() => {
        if (isLoading && !hasLoadedSession) {
            sessionStorage.setItem('hasLoaded', 'true');
        }
    }, [isLoading, hasLoadedSession]);

    // If already loaded in this session, don't show the screen even if Redux says it's not "loading" yet
    if (hasLoadedSession) return null;

    return (
        <Center display={isLoading ? "none" : "flex"} zIndex={2000} flexDir={"column"} pos="fixed" top="0px" h="100vh" bg="#fff" w="100vw">
            <Img className='animate-image' w="300px" objectFit={"contain"} src='/logo/logo_blue.png' />
        </Center>
    )
}