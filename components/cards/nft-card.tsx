import Image from "next/image";
import { CheckCircle } from "lucide-react"; // Example icon library
import { ethers, formatEther } from "ethers";
import { useAccount } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emoji-avater-for-address";
import nft from "@/assets/nft-1.svg";

interface NFTCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  creator?: string;
  royalty?: string;
  amount: string;
}

export default function NFTCard({
  title,
  creator,
  price,
  image,
}: NFTCardProps) {
  const ethValue = formatEther(price.toString());

  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    creator ?? ""
  );

  return (
    <div className="bg-black text-white rounded-lg -64 shadow-lg flex flex-col justify-between border border-gray-800">
      {/* Top Section */}
      <div className="relative mb-3 bg-white rounded-md">
        {/* Profile Image */}

        <div className="absolute top-2 left-3 flex items-center">
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
        </div>

        {/* NFT Image */}
        <Image
          src={image || nft}
          alt="NFT"
          width={256}
          height={256}
          className="rounded-md mx-auto h-40 object-contain"
        />
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mb-2 p-3">
        <div className="flex items-center gap-2">
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

          <p className="text-sm font-bold">{title || creator?.slice(0, 12)}</p>

          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-sm text-white">{ethValue} ETH.</p>
      </div>

      <div className="flex w-full items-center justify-between p-3">
        <div className="flex w-full justify-between items-center gap-2">
          <button className="bg-white text-black text-xs font-semibold px-5 py-2 rounded-lg hover:bg-gray-200">
            BUY
          </button>
          <button className="bg-[#1E1E1E] border border-gray-600 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-gray-700">
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}
