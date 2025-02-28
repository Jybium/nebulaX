import Image from "next/image";
import { CheckCircle } from "lucide-react"; // Example icon library
import { formatEther } from "ethers";
import { useAccount } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emoji-avater-for-address";
import nft from "@/assets/nft-1.svg";

import { NebulaXToken } from "@/ABI/contract-address";
import { NebulaX } from "@/ABI/contract-address";

import NebulaX_ABI from "@/ABI/NebulaX.json";
import NebulaXToken_ABI from "@/ABI/NebulaXToken.json";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import toast from "react-hot-toast";
interface NFTCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  creator?: string;
  royalty?: string;
  amount: string;
  seller: string;
}

export default function NFTCard({
  id,
  title,
  creator,
  price,
  image,
  seller,
}: NFTCardProps) {
  const { address } = useAccount();

  // Read: Check token balance of the connected user.
  const { data: tokenBalance } = useContractInteraction({
    address: NebulaXToken,
    abi: NebulaXToken_ABI.abi,
    functionName: "balanceOf",
    args: [address],
    type: "read",
    enabled: !!address,
  });

  const requiredAllowanceAmount = BigInt(price);

  // Write: Approve the NFT contract to spend tokens on behalf of the buyer.
  const {
    write: approveWrite,
    data: approveData,
    error: approveError,
    isPending: isApprovePending,
  } = useContractInteraction({
    address: NebulaXToken,
    abi: NebulaXToken_ABI.abi,
    functionName: "approve",
    // Here we pass the NFT contract as the spender and the required token amount.
    args: [NebulaX, requiredAllowanceAmount],
    type: "write",
    enabled: true,
  });

  // Write: Buy NFT using the marketplace contract.
  const {
    write: buyWrite,
    data: buyData,
    error: buyError,
    isPending: isBuyPending,
  } = useContractInteraction({
    address: NebulaX,
    abi: NebulaX_ABI.abi,
    functionName: "buyNFT",
    // Adjust these arguments according to your contract. Here we pass seller, token id, and amount.
    args: [seller, id, requiredAllowanceAmount],
    type: "write",
    enabled: true,
  });

  const buyNFT = async () => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }

    console.log("Token Balance:", tokenBalance);
    console.log("Balance:", requiredAllowanceAmount);
    // Ensure we have fetched the balance and it is sufficient.
    if (
      !tokenBalance ||
      BigInt(tokenBalance.toString()) < requiredAllowanceAmount
    ) {
      toast.error("Insufficient token balance to purchase NFT.");
      return;
    }

    try {
      // Step 1: Approve token spending.
      if (approveWrite) {
        const approveTx = await approveWrite();
        console.log("Approval transaction:", approveTx);
        toast.success("Approval successful. Now purchasing NFT...");
        // Optionally wait for confirmation before proceeding.
      } else {
        toast.error("Approve function is not available.");
        return;
      }

      // Step 2: Execute the NFT purchase.
      if (buyWrite) {
        const buyTx = await buyWrite();
        console.log("Buy transaction:", buyTx);
        toast.success("NFT purchased successfully!");
      } else {
        toast.error("Buy function is not available.");
      }
    } catch (error: any) {
      console.error("Error buying NFT:", error);
      toast.error(error?.message || "Error buying NFT");
    }
  };

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
        <div className="flex w-full justify-end items-center gap-2">
          <button
            className="bg-white text-black text-xs font-semibold px-5 py-2 rounded-lg hover:bg-gray-200"
            onClick={buyNFT}
          >
            BUY
          </button>
          {/* <button className="bg-[#1E1E1E] border border-gray-600 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-gray-700">
            Place Bid
          </button> */}
        </div>
      </div>

      {approveError && (
        <p className="text-red-500">Approve error: {approveError.message}</p>
      )}
      {buyError && (
        <p className="text-red-500">Buy error: {buyError.message}</p>
      )}
    </div>
  );
}
