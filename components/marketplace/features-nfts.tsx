"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import image from "@/assets/nft-1.svg";

const featuredNFTs = [image, image, image, image, image, image, image, image];

const tradedNFTs = [
  {
    id: 1,
    name: "Cosmic Arts",
    username: "Cosmicartist",
    image: image,
  },
  { id: 2, name: "Nan", username: "NeonNan", image: image },
  { id: 3, name: "The Mask", username: "MaskB", image: image },
];

export default function NFTMarketplace() {
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
          {tradedNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: nft.id * 0.2 }}
              className="bg-gray-900 p-4 rounded-lg text-center"
            >
              <Image
                src={nft.image}
                alt={nft.name}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-2 font-semibold">{nft.name}</h3>
              <p className="text-gray-400">@{nft.username}</p>
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
