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
        <Center display={isLoading ? "none" : "flex"} zIndex={2000} flexDir={"column"} pos="fixed" top="0px" h="100vh" bg="#fff" w="100vw">
            <Img className='animate-image' w="300px" objectFit={"contain"} src='/logo/logo_blue.png' />
        </Center>
    )
}