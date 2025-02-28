"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import {
  sepolia,
  bscTestnet,
  blastSepolia,
  Chain as WagmiChain,
} from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "87ccb211c4950e2221125586e8590227";

// Define the custom chain
const abcTestnet: WagmiChain = {
  id: 112,
  name: "ABC-Testnet",
  nativeCurrency: {
    name: "ABC Token",
    symbol: "ABC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.abc.t.raas.gelato.cloud"] },
    public: { http: ["https://rpc.abc.t.raas.gelato.cloud"] },
  },
  blockExplorers: {
    default: {
      name: "ABC Explorer",
      url: "https://explorer.abc.t.raas.gelato.cloud",
    },
  },
  testnet: true,
};

// Add the custom chain to the supported chains array
const supportedChains: WagmiChain[] = [abcTestnet];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
