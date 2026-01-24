// theme.ts or theme/index.ts
import { extendTheme } from "@chakra-ui/react";

// Replace with your desired Emoji font
const FontFamily = extendTheme({
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
});

export default FontFamily;