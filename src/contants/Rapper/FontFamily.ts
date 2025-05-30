// theme.ts or theme/index.ts
import { extendTheme } from "@chakra-ui/react";

// Replace with your desired Emoji font
const FontFamily = extendTheme({
  fonts: {
    heading: "Apple Color Emoji", // or any Apple Color Emoji font you prefer
    body: "Apple Color Emoji",
  },
});

export default FontFamily;