import { COLORS } from '@/layout/Theme';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import SettingForm from './SettingForm';

export default function SettingProfile() {
    return (
        <Box w="full" h="auto" bg={COLORS.white} borderRadius="5px" p={["20px", "20px", "20px", "30px"]}>
            <SettingForm />
        </Box>
    )
}