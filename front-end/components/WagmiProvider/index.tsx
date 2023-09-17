"use client";

import React from "react";
import { WagmiConfig } from "wagmi";
import { config } from "@/lib/wagmi";

// wagmi client setup. Note: we do not auto-connect here, but instead
// do it when the component mounts to prevent hydration issues with wagmi +
// next.js SSR. This is a common quirk with next+wagmi.

interface WagmiProviderProps {
  children: React.ReactNode;
}

function WagmiProvider({ children }: WagmiProviderProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}

export default WagmiProvider;
