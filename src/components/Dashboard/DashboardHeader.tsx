import { Box, Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { COLORS } from '@/layout/Theme';

interface ButtonConfig {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    color?: string;
    border?: boolean;
}

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    buttons?: ButtonConfig[];
}

export default function DashboardHeader({
    title,
    subtitle,
    buttons = [],
}: DashboardHeaderProps) {
    const { user } = useSelector((state: RootState) => state.auth ?? {});
    const router = useRouter();

    return (
        <Center
            flexDir={['column', 'column', 'column', 'row']}
            mt="70px"

            alignItems={['start', 'start', 'start', 'center']}
            justifyContent={[
                'flex-start',
                'flex-start',
                'flex-start',
                'space-between',
            ]}
        >
            <Box p={['20px', '20px', '20px', '30px']}>
                <Box
                    display="flex"
                    alignItems="center"
                    color={COLORS.black}
                    fontWeight='500'
                    mb='4px'
                    textAlign={'start'}
                    fontSize={['20px', '30px']}
                >
                    {title || `Hi, ${user?.last_name} ${user?.first_name}`}
                </Box>
                <Box fontWeight='400' color='#667085' fontSize='14px'>
                    {subtitle}
                </Box>
            </Box>

            {/* Dynamic Buttons */}
            {buttons.length > 0 && (
                <Center
                    p={['20px', '20px', '20px', '30px']}
                    mt={['0px', '0px', '0px', '24px']}
                    w={['100vw', '100vw', '100vw', 'auto']}
                    justifyContent={['space-between']}
                >
                    {buttons.map((btn, index) => (
                        <Button
                            key={index}
                            onClick={btn.onClick}
                            bg={btn.color || 'transparent'}
                            color={btn.color === COLORS.blue ? COLORS.white : COLORS.black}
                            borderWidth={btn.border ? '1px' : '0'}
                            borderColor={btn.border ? '#DCDCDC' : 'transparent'}
                            fontWeight='500'
                            w='auto'
                            h='40px'
                            mr={index !== buttons.length - 1 ? '20px' : '0'}
                            _hover='none'
                        >
                            {btn.icon && <Box mr='5px'>{btn.icon}</Box>}
                            {btn.label}
                        </Button>
                    ))}
                </Center>
            )}
        </Center>
    );
}
