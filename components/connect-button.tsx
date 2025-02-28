"use client";

import { useState, useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emoji-avater-for-address";
import { AnimatePresence, motion } from "framer-motion";
import UploadNFT from "./form/upload-nfts";

import { NebulaXNFT } from "@/ABI/contract-address";
import NebulatxNFT from "@/abi/NebulaXNFT.json";
import { useContractInteraction } from "@/hooks/use-contract-interaction";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();

  const { write, data, error, isPending } = useContractInteraction({
    address: NebulaXNFT,
    abi: NebulatxNFT.abi,
    functionName: "setApprovalForAll",
    args: [address, true],
    type: "write",
    enabled: true,
  });

  useEffect(() => {
    if (address) {
      if (write) {
        write();
      }
    }
    console.log(data);
  }, [address]);

  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ""
  );

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nftType, setNftType] = useState<"photo" | "video" | null>(null);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className="rounded-full text-black bg-white p-2 font-bold"
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect wallet"}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="relative max-w-5xl w-full flex items-center justify-between gap-x-10">
      {/* Wallet Info */}
      <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div
          role="button"
          tabIndex={1}
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            backgroundColor,
            boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
          }}
        >
          {emoji}
        </div>
        <p>{address?.slice(0, 10)}</p>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -left-4 top-14 bg-white text-black shadow-md rounded-lg overflow-hidden w-48 z-30"
            >
              <button
                className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                onClick={() => {
                  setShowModal(true);
                  setShowDropdown(false);
                }}
              >
                Create NFT
              </button>
              <a
                href="/raffle-draw"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Enter Raffle
              </a>
              <a href="/creator" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Network Switch */}
      <button className="btn" onClick={openChainModal}>
        Switch Networks
      </button>

      {/* NFT Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold text-black">Choose NFT Type</h2>
              <button
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
                onClick={() => setNftType("photo")}
              >
                Create Photo NFT
              </button>
              <button
                className="mt-2 w-full bg-green-500 text-white p-2 rounded"
                onClick={() => setNftType("video")}
              >
                Create Video NFT
              </button>
              <button
                className="mt-10 w-full bg-gray-700 p-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setNftType(null);
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NFT Form */}
      {nftType && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <UploadNFT
              setShowModal={() => setShowModal(false)}
              setNftType={setNftType}
              type={nftType}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
