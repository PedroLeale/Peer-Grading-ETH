import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Anonymous_Pro } from "@next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import WagmiProvider from "../components/WagmiProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { type ReactNode } from "react";
import AuthProvider from "@/lib/services/contexts/AuthContext/provider";
import { ChangeChainModal } from "@/components/ChangeChainModal";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/services/apollo/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const anonPro = Anonymous_Pro({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <main className={anonPro.className}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ChakraProvider>
            <WagmiProvider>
              <ChangeChainModal></ChangeChainModal>

              <QueryClientProvider client={queryClient}>
                <ToastContainer position="top-left" />

                {getLayout(<Component {...pageProps} />)}
              </QueryClientProvider>
            </WagmiProvider>
          </ChakraProvider>
        </AuthProvider>
      </ApolloProvider>
    </main>
  );
}
