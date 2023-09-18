// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { SequenceConnector } from "@0xsequence/wagmi-connector";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai,
    ...(process.env.NODE_ENV === "development" ? [polygonMumbai] : []),
  ],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    // new WalletConnectConnector({
    //   options: {
    //     projectId: "10",
    //   },
    // }),
    new SequenceConnector({
      chains,
      options: {
        defaultNetwork: "mumbai",
        connect: {
          app: "Demo-app",
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
