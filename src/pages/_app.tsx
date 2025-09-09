import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { ChrakaLayout } from "@/contants/ChrakaLayout";
import AIChat from "@/components/layout/AIchat";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div lang="en">
      <Provider store={store}>
        <ChrakaLayout>
          <Component {...pageProps} />
          <AIChat />
        </ChrakaLayout>
      </Provider>
    </div>
  );
}
