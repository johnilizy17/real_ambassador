import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import ProfileForm from './ProfileForm';
import DocumentForm from './DocumentForm';
import FingerPrint from './FingerPrint';
import { COLORS } from '@/layout/Theme';

export default function AccountForm() {

    return (
        <Box>
            <Flex flexDir={["column", "column", "column", "row"]} justifyContent={"space-between"}>
                <ProfileForm />
                <DocumentForm />
                <FingerPrint />

            </Flex>
            <Flex justifyContent={"end"} pb="70px">
                <Button
                    colorScheme="blue"
                    bg={COLORS.blue}
                    h="50px"
                    borderRadius="5px"
                    type="submit"
                    color={COLORS.white}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    )
}