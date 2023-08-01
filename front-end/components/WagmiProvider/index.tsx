"use client";

import React, { useEffect } from "react";
import { SequenceConnector } from "@0xsequence/wagmi-connector";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const connectors = [
  new SequenceConnector({
    chains,
    options: {
      connect: {
        app: "ScoreSync",
      },
    },
  }),
  new MetaMaskConnector(),
];

// wagmi client setup. Note: we do not auto-connect here, but instead
// do it when the component mounts to prevent hydration issues with wagmi +
// next.js SSR. This is a common quirk with next+wagmi.
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

function WagmiProvider({ children }: WagmiProviderProps) {
  // auto-connect on mount
  useEffect(() => {
    wagmiClient.autoConnect();
  }, []);

  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}

export default WagmiProvider;
