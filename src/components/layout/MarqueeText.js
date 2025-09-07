import { COLORS } from "@/layout/Theme";
import { cashFormat } from "@/utils/cashformat";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react"; // <<-- use this

const marqueeKeyframes = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;


export default function MarqueeText({top="0px"}) {
  return (
    <Box
      overflow="hidden"
      whiteSpace="nowrap"
      bg={COLORS.red}
      color="white"
      py={2}
      top={top}
      right="0px"
      zIndex={"200"}
      w={top ==="70px"?["full","full","full","calc(100% - 280px)"]: "full"}
      position="fixed"
    >
      <Text
        as="span"
        display="inline-block"
        px="100%"
        animation={`${marqueeKeyframes} 15s linear infinite`}
        fontWeight="900"
      >
        🚀 Welcome to ABN tier 3 account have been increase to {cashFormat(50000)} and the percentage is now 30% 🚀
      </Text>
    </Box>
  );
}
