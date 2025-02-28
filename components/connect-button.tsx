"use client";

import { useState, useEffect } from "react";
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
import { NebulaX } from "@/ABI/contract-address";
import NebulatxNFT from "@/ABI/NebulaXNFT.json";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import { Menu, X } from "lucide-react";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ""
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nftType, setNftType] = useState<"photo" | "video" | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!isConnected) {
    return (
      <button
        className="rounded-full text-black bg-white px-4 py-2 font-bold w-full sm:w-auto"
        onClick={() => openConnectModal?.()}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn w-full sm:w-auto" onClick={openChainModal}>
        Wrong Network
      </button>
    );
  }

  return (
    <div className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-x-10">
      {/* Hamburger Menu */}
      <button
        className="sm:hidden p-2 rounded-md bg-neutral-800 text-white"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-lg overflow-hidden sm:hidden z-30 w-52 whitespace-nowrap"
          >
            <a
              href="/raffle-draw"
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Enter Raffle
            </a>
            <a href="/creator" className="block px-4 py-2 hover:bg-gray-200">
              Profile
            </a>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setShowModal(true);
                setShowMobileMenu(false);
              }}
            >
              Create NFT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallet Info */}
      <div
        className="hidden sm:flex items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ backgroundColor }}
        >
          {emoji}
        </div>
        <p className="truncate max-w-[100px]">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 top-14 bg-white text-black shadow-md rounded-lg overflow-hidden w-full max-w-[180px] sm:max-w-xs z-30"
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

      {/* NFT Modal */}
      {/* NFT Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
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
                className="mt-6 w-full bg-gray-700 p-2 rounded"
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
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
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
