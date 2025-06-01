import { COLORS } from '@/layout/Theme';
import { RootState } from '@/redux/store';
import { Box, Center, Flex, Heading, Spinner, Switch, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function TwoFactorAuthentication() {
  const [MFAIsActive, setMFAIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleMFA = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const newState = e.target.checked;
      // const spin = await activeFactorPassword(user.corp_id, !newState);
      setMFAIsActive(newState);
      return null;
    } catch (err) {
      console.log(err, "Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex align="center">
      <Box mr="4" w="full" flex="1">
        <Heading mb="2" fontWeight="normal" fontSize="md">Text message (EMAIL)</Heading>
        <Text fontSize="sm" color="gray.500">{"Use text messages (EMAIL) to receive verification codes. For your protection, phone numbers used for two-factor authentication can't be used to reset your password when two-factor authentication is on."}</Text>
      </Box>
      <Center>
        <Switch colorScheme="green" id='mfa' onChange={toggleMFA} value={MFAIsActive ? "true" : "false"} isChecked={MFAIsActive} />
        <Box ml="20px" color="#F05050" fontSize="14px" fontWeight="700" >{loading ? <Spinner color={COLORS.blue} size={"md"} /> : !MFAIsActive ? "De-activated" : "Activate"}</Box>
      </Center>
    </Flex>
  )
}

export default TwoFactorAuthentication;