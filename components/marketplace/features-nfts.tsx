"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import image from "@/assets/nft-1.svg";

import NFTCard from "@/components/cards/nft-card";
import NFT_ABI from "@/abi/NebulaX.json";
import { NebulaX } from "@/abi/contract-address";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NFT } from "../explore/image-nfts";
import { emojiAvatarForAddress } from "@/lib/emoji-avater-for-address";

const featuredNFTs = [image, image, image, image, image, image, image, image];

const TradedNFTs = ({ creator }: { creator: string | undefined }) => {
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    creator ?? ""
  );

  return (
    <div
      role="button"
      tabIndex={1}
      className="h-20 w-20 rounded-full mx-auto flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{
        backgroundColor,
        boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
      }}
    >
      {emoji}
    </div>
  );
};

export default function NFTMarketplace() {
  const [nfts, setNfts] = useState<NFT[]>([]);

  const { data, isLoading, error, refetch } = useContractInteraction({
    address: NebulaX,
    abi: NFT_ABI?.abi,
    functionName: "getListedNFTs",
    type: "read",
    enabled: true,
  });

  useEffect(() => {
    // Check if data exists and is structured as expected
    if (Array.isArray(data) && data.length === 3) {
      const [ids, sellers, listings] = data;

      console.log(data);

      // If any of these arrays are empty, there are no NFTs listed.
      if (ids.length === 0) {
        toast.error("No NFTs listed.");
        console.log("No NFTs listed.");
        return;
      }

      // Map over one of the arrays (they should all have the same length)
      const formattedResult = listings
        .filter((listing: any) => listing.isListed)
        .map((listing: any, index: any) => ({
          id: ids[index],
          // There's no "image" or "title" in the ABI, so you'll need to adjust these
          price: listing.price,
          royalty: listing.royalty,
          amount: listing.amount,
          creator: listing.creator,
          seller: listing.seller,
          isListed: listing.isListed,
        }));

      console.log("Formatted Result:", formattedResult);
      setNfts(formattedResult);
    }
  }, [data]);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* Featured NFTs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured NFTs</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-4 gap-8"
        >
          {featuredNFTs.map((src, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }}>
              <Image
                src={src}
                alt="NFT"
                width={200}
                height={200}
                className="rounded-lg w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Traded NFTs */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Traded NFTs</h2>
        <div className="grid grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: (typeof nft.id === "number" ? nft.id : 1) * 0.2,
              }}
              className="bg-gray-900 p-4 rounded-lg text-center"
            >
              <TradedNFTs creator={nft.creator} />
              <h3 className="mt-2 font-semibold">
                {nft.creator?.slice(0, 20)}
              </h3>
              <p className="text-gray-400">@{nft.creator?.slice(0, 10)}</p>
              <button className="mt-2 bg-white text-black px-4 py-1 rounded-lg hover:bg-gray-300">
                Follow
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
