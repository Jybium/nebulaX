"use client";

import NFTCard from "@/components/cards/nft-card";
import NFT_ABI from "@/abi/NebulaX.json";
import { NebulaX } from "@/abi/contract-address";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface NFT {
  id: string;
  creator?: string;
  seller: string;
  royalty?: string;
  amount: string;
  image: string;
  title: string;
  price: string;
}

const ImageNFTs = () => {
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

  if (isLoading) return <div>Loading Listed Image NFTS...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">
        Error fetching drops: {error.message}
      </div>
    );

  return (
    <section className="bg-black text-white p-10">
      <div className="">
        <h2 className="text-xl font-semibold mb-6">Image NFTs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div className="" key={nft.id}>
              <NFTCard key={nft.id} {...nft} />
            </div>
          ))}
        </div>

        <div className="flex justify-end w-full">
          <button
            onClick={() => refetch && refetch()}
            className="border border-white mt-4 px-7 py-2 bg-black rounded text-white"
          >
            Refresh
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageNFTs;
