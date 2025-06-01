import { Box, Center, Flex, IconButton, Img } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavData } from './NavData';
import { useRouter } from 'next/router';
import { COLORS } from '@/layout/Theme';

export default function NavBar() {
    const router = useRouter();
    const [active, setActive] = useState(0);

    useEffect(() => {
        NavData.map((a: any, b: number) => {
            if (router.pathname == `${a.nav}`) {
                setActive(b);
            }
        });
    }, [router.pathname]);

    const handleNavClick = (item: any, index: number) => {
        if (!item.subNav) {
            router.push(item.nav);
        } else {
            setActive(active === index ? -1 : index);
        }
    };

    return (
        <Box 
            display={["none", "none", "none", "block"]} 
            w="279px" 
            h="100vh" 
            pl="30px" 
            bg="#fff" 
            pt="16px" 
            boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)"
        >
            <Img w="142px" h="56.12px" mb="27px" src="/logo.png" />
            <Box overflow="scroll" className='SibeBar'>
                {NavData.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                        <IconButton 
                            onClick={() => handleNavClick(item, index)}
                            borderLeftWidth={3}
                            mb="8px"
                            borderLeftColor={index === active ? "#7ED31F" : "transparent"}
                            bg={index === active ? "#E9F0F7" : "transparent"}
                            h="50px"
                            aria-label={item.item}
                        >
                            <Flex 
                                alignItems="center" 
                                justifyContent="space-between" 
                                pr="20px" 
                                color={index === active ? "#2766AD" : "#667085"} 
                                pl="10px" 
                                w="222px"
                            >
                                <Center>
                                    <Box w="36px">
                                        {item.svg}
                                    </Box>
                                    <Box>
                                        {item.item}
                                    </Box>
                                </Center>
                                {item.subNav && (
                                    <Box transform={active === index ? "rotate(0deg)" : "rotate(180deg)"}>
                                        <svg 
                                            width="20" 
                                            height="21" 
                                            viewBox="0 0 20 21" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path 
                                                d="M15 12.6235L10 7.62353L5 12.6235" 
                                                stroke={active === index ? "#2766AD" : COLORS.grey} 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                            />
                                        </svg>
                                    </Box>
                                )}
                            </Flex>
                        </IconButton>
                        {active === index && item.subNav && item.subNav.map((subItem: string, subIndex: number) => (
                            <IconButton
                                key={`${index}-${subIndex}`}
                                aria-label={subItem}
                                bg="transparent"
                                w="full"
                                onClick={() => {
                                    router.push(`${item.nav}?subnav=${subItem}`);
                                }}
                                mt="-20px"
                                h="50px"
                                mb="20px"
                            >
                                <Center 
                                    justifyContent="start" 
                                    fontSize="14px" 
                                    color={router.query && router.query.subnav === subItem ? COLORS.blue : COLORS.grey} 
                                    w="full"
                                >
                                    <Box w="50px" /> 
                                    {subItem}
                                </Center>
                            </IconButton>
                        ))}
                    </React.Fragment>
                ))}
                <Box h="70px" />
            </Box>
        </Box>
    );
}