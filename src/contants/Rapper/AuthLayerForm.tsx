import {
    Flex,
    Box,
    Text,
    Button,
    IconButton,
    Center,
    Img,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { COLORS } from '@/utils/Theme';
import { STORAGE } from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import ROUTES from '@/utils/ROUTES';
import { LeftArrowIcon } from '@/utils/svg';
import Head from 'next/head';
import { useSelector } from 'react-redux';

function AuthLayout({ children, seoTitle }: { children: any, seoTitle?: string }) {
    const router = useRouter();
    const {user} = useSelector((a: any) => a.auth)

    useEffect(() => {
        if (user.id) {
            router.push("/dashboard")
        }
    }, [])

    return (
        <>
            <Head>
                <title>AB NARINOHS Estate - {seoTitle}</title>
                <meta name="description" content="Buy, Rent and Invest in real estate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex w='100vw' minH='100vh' flexDir='row'>
                <Box
                    minH='100vh'
                    display={['none', 'none', 'none', 'block']}
                    w='599px'
                    pos='relative'
                    bg={COLORS.black}
                    position='relative'
                >
                    <Img
                        zIndex={1}
                        objectFit={"contain"}
                        src={
                            router.pathname === ROUTES.register
                                ? '/images/person.png'
                                : '/images/person2.png'
                        }
                        h='70vh'
                        right={ router.pathname === ROUTES.register? '-15px':"-0vh"}
                        pos='absolute'
                        bottom='0px'
                        alt='auth sign in'
                    />
                    <Box pl='96px' pt='36px' h='full' bgImage='/assets/images/bg.png'>
                        <Center w='71px' mb='34px' onClick={() => router.back()}>
                            <IconButton aria-label='' bg='transparent'>
                                <LeftArrowIcon />
                            </IconButton>
                            <Box fontWeight='400' color={COLORS.white} fontSize='13px'>
                                BACK
                            </Box>
                        </Center>
                        <Img h="100px" src='/logo/logo_white.png' />
                        {router.pathname === ROUTES.register ? <Box
                            fontWeight='700'
                            fontSize='30px'
                            w='276px'
                            mt='20px'
                            color={COLORS.white}
                            lineHeight='36.3px'
                        >Explore the reward of your network
                        </Box> :
                            <Box
                                fontWeight='700'
                                fontSize='30px'
                                w='276px'
                                mt='20px'
                                color={COLORS.white}
                                lineHeight='36.3px'
                            >Check your downline and your income with ease
                            </Box>
                        }
                    </Box>
                </Box>
                <Center className='authPage' position='relative'>
                    {children}
                </Center>
            </Flex>
        </>
    );
}

export default AuthLayout;
