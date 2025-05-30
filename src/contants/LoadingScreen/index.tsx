import { COLORS } from '@/components/utils/theme';
import { Center, Img } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LottieLoader from '../LottieLoader'
import House from './house.json';
import { useSelector } from 'react-redux';

export default function LoadingScreen() {

    const { isLoading } = useSelector((a: { user: { isLoading: boolean } }) => a.user)

    return (
        <Center display={isLoading ? "none" : "flex"} zIndex={100} flexDir={"column"} pos="fixed" top="0px" h="100vh" w="100vw" bg={COLORS.black}>
            <Img className='animate-image' w="200px" objectFit={"contain"} src='/logo/logo_white.png' />
        </Center>
    )
}