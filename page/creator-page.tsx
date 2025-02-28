"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { middleEllipsis } from "@/lib/utils";
import { formatUnits } from "viem";
import { emojiAvatarForAddress } from "@/lib/emoji-avater-for-address";
import NFT_ABI from "@/ABI/NebulaX.json";
import { NebulaX, NebulaXToken } from "@/ABI/contract-address";
import NebulaXToken_ABI from "@/ABI/NebulaXToken.json";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import toast from "react-hot-toast";
import { NFT } from "@/components/explore/image-nfts";
import NFTCard from "@/components/cards/nft-card";

const CreatorDashboard = () => {
  const { address, chain } = useAccount();

  const { data } = useBalance({
    address,
  });

  const { data: tokenBalance } = useContractInteraction({
    address: NebulaXToken,
    abi: NebulaXToken_ABI.abi,
    functionName: "balanceOf",
    args: [address],
    type: "read",
    enabled: !!address,
  });

  const ens = useEnsName({
    address,
  });

  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ""
  );

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [listedNfts, setListedNfts] = useState<NFT[]>([]);
  const [unListedNfts, setUnListedNfts] = useState<NFT[]>([]);

  const {
    data: NFTData,
    isLoading,
    error,
    refetch,
  } = useContractInteraction({
    address: NebulaX,
    abi: NFT_ABI?.abi,
    functionName: "getListedNFTs",
    type: "read",
    enabled: true,
  });

  // Function to shuffle an array
  const shuffleArray = (array: NFT[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (!NFTData || !address || !Array.isArray(NFTData)) return;

    // Step 1: Filter NFTs where creator matches the current address
    const userNFTs = NFTData.filter(
      (nft: NFT) =>
        nft.creator && nft.creator.toLowerCase() === address.toLowerCase()
    );

    // Step 2: Separate listed and unlisted NFTs
    const listed = userNFTs.filter((nft) => nft.isListed);
    const unlisted = userNFTs.filter((nft) => !nft.isListed);

    // Step 3: Shuffle each array
    const shuffledListed = shuffleArray(listed);
    const shuffledUnlisted = shuffleArray(unlisted);

    // Step 4: Merge with listed NFTs first
    const finalNFTs = [...shuffledListed, ...shuffledUnlisted];

    // Step 5: Update state
    setNfts(finalNFTs);
    setListedNfts(shuffledListed);
    setUnListedNfts(shuffledUnlisted);
  }, [NFTData, address]);

  console.log(nfts);

  useEffect(() => {
    // Check if data exists and is structured as expected
    if (Array.isArray(NFTData) && NFTData?.length === 3) {
      const [ids, sellers, listings] = NFTData;

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

      setNfts(formattedResult);
    }
  }, [data]);

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        className="mb-4 flex items-center gap-2 text-white"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Header */}
      <h2 className="text-center text-2xl font-bold mb-6">Creator Dashboard</h2>

      {/* Creator Profile
      <div className="relative">
        <img
          src="/creator-cover.jpg" // Replace with actual cover image
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
          <img
            src="/creator-avatar.jpg" // Replace with actual avatar image
            alt="Avatar"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Creator Name & Role */}
      <div className="text-center my-16 space-y-4">
        <div
          className="h-20 w-20 mx-auto rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ backgroundColor }}
        >
          {emoji}
        </div>

        <h3 className="text-lg font-semibold">{address}</h3>
        <p className="text-gray-500">Creator</p>
      </div>

      {/* Biography */}
      {/* <section className="mt-6">
        <h4 className="font-semibold">Biography</h4>
        <p className="text-gray-700 mt-2 text-sm">
          James Doe is a digital artist and NFT creator based in San Francisco.
          With a passion for blending technology and art, James has been
          creating unique pieces that explore the intersection of nature and the
          digital world. His work has been featured in numerous galleries and
          has gained recognition within the NFT community for its vibrant colors
          and intricate details.
        </p>
      </section> */}

      {/* Reviews Section */}
      {/* <section className="mt-6">
        <h4 className="font-semibold">Reviews</h4>
        <div className="bg-white shadow-md rounded-lg p-4 mt-3">
          <div className="flex items-center gap-3">
            <img
              src="/user-avatar.jpg" // Replace with actual user avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h5 className="font-medium text-sm">Sarah L</h5>
              <p className="text-xs text-gray-600">
                I purchased my first NFT from James, and the experience was
                seamless. The artwork is even more beautiful in person!
              </p>
              <div className="flex mt-1 text-yellow-400 text-lg">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>  */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-32">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Wallet address</h2>
          <p className="m-0 text-sm opacity-50">
            {address ? middleEllipsis(address, 12) : ""}
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Network</h2>
          <p className="m-0 text-sm opacity-50">{chain?.name || ""}</p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Balance</h2>
          <div className="m-0 text-sm opacity-50">
            {data?.value && data?.decimals ? (
              <p>
                {Number(formatUnits(data.value, data.decimals)).toFixed(4)}{" "}
                {data.symbol}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">EnsName</h2>
          <p className="m-0 text-sm opacity-50">{ens?.data || "NIL"}</p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Coin Balance</h2>
          <p className="m-0 text-sm opacity-50">
            {tokenBalance && typeof tokenBalance === "string"
              ? `${formatUnits(BigInt(tokenBalance.toString()), 18)} NebX`
              : `0 NebX`}
          </p>
        </div>
      </div>

      <div className="py-6 gap-y-6">
        <div className="">
          <h2 className="">Listed NFTs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {listedNfts.map((nft) => (
              <div className="" key={nft.id}>
                <NFTCard key={nft.id} {...nft} />
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <h2 className="">UnListed NFTs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {unListedNfts.map((nft) => (
              <div className="" key={nft.id}>
                <NFTCard key={nft.id} {...nft} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Raffle Draw Button */}
      <div className="mt-6 text-center">
        <button className="bg-black border border-white text-white px-6 py-2 rounded-full">
          Raffle Draw
        </button>
      </div>
    </div>
  );
};

export default CreatorDashboard;
