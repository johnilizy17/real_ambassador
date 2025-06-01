import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { COLORS } from "@/layout/Theme";

const ClaimAbleButton = () => {
  const [addressType, setAddressType] = useState("Home");

  return (
    <Box pb="20px">
      <Text color="gray.500" mb={4}>
        Complete address would assist better us in serving you
      </Text>

      {/* Address Type Selection */}
      <Text fontWeight="medium" mb={2}>Select address type</Text>
      <RadioGroup onChange={setAddressType} value={addressType}>
        <Stack direction="row" spacing={4} mb={4}>
          <Radio value="Home">Home</Radio>
          <Radio value="Office">Office</Radio>
          <Radio value="Friend&apos;s house">{"Friend&apos;s house"}</Radio>
        </Stack>
      </RadioGroup>

      {/* Address Form Fields */}
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{"Receiver&apos;s name"}</FormLabel>
          <Input placeholder="Enter receiver's name" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Complete address</FormLabel>
          <Input placeholder="Enter complete address" />
        </FormControl>

        <FormControl>
          <FormLabel>Nearby Landmark (optional)</FormLabel>
          <Input placeholder="Enter nearby landmark" />
        </FormControl>

        {/* Save Button */}
        <Button colorScheme="blue" bg={COLORS.blue} mt={4} onClick={() => alert("Address saved!")}>
          Save address
        </Button>
      </Stack>
    </Box>
  );
};

export default ClaimAbleButton;
