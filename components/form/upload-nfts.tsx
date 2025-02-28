"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { NebulaX, NebulaXNFT } from "@/ABI/contract-address";
import NebulaX_ABI from "@/ABI/NebulaX.json";
import NebulaXNFT_ABI from "@/ABI/NebulaXNFT.json";
import { useContractInteraction } from "@/hooks/use-contract-interaction";
import toast from "react-hot-toast";
import { X } from "lucide-react";

// Your Pinata API Keys
const PINATA_API_KEY = process.env.API_KEY;

const PINATA_SECRET_API_KEY = process.env.API_SECRET;

const token =
  process.env.JWT ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4OTViMjIwZC00OTcwLTRjYTMtOWRkZi1hZGUxZWIyN2U0NTYiLCJlbWFpbCI6ImFzYW9sdWp0b21pQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiODM3ZTA2NzIwYzM0OWM4OTllOSIsInNjb3BlZEtleVNlY3JldCI6Ijk1NmJlYjc1YjFlMTBlNWY2MGNiNzE0YWUwMzgzZWQxODhlZjJlOGNiNzllMGYyZGY3MzI4NDQ4YzI0NjRiYTciLCJleHAiOjE3NzIxODczMjR9.tbpZEFmqSVl7j-5iKTdOutni-vNXWjJVrsU5XjHTds0";

const UploadNFT = ({
  setShowModal,
  setNftType,
  type,
}: {
  setShowModal: () => void;
  setNftType: (v: any) => void;
  type: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [listNFT, setListNFT] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState("");

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Upload file to Pinata IPFS
  const uploadToIPFS = async () => {
    if (!file || !title || !description) {
      alert("Please fill all fields!");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const options = JSON.stringify({ cidVersion: 0 });
      formData.append("pinataOptions", options);

      // Upload image to IPFS
      const imageRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageRes.data.IpfsHash}`;

      // Create metadata JSON
      const metadata = {
        name: title,
        type: type,
        description,
        image: imageUrl,
        attributes: [
          {
            trait_type: "Title",
            value: title,
          },
          {
            trait_type: "Description",
            value: description,
          },
          {
            trait_type: "Price",
            value: price,
          },
          {
            trait_type: "Type",
            value: type,
          },
          {
            trait_type: "Quantity",
            value: quantity,
          },
          {
            trait_type: "Royalty",
            value: royalty,
          },
        ],
      };

      // Upload metadata to IPFS
      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataRes.data.IpfsHash}`;
      setMetadataUrl(metadataUrl);
      alert("Upload successful! Ready to mint.");

      return metadataUrl;
    } catch (error: any) {
      console.error("IPFS Upload Error:", error);
      toast.error(error.response.data.error.details);
      alert("Upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Execute mint transaction
  const { write, data, error, isPending } = useContractInteraction({
    address: NebulaX,
    abi: NebulaX_ABI.abi,
    functionName: "CreateNFT",
    args: [
      parseEther(price),
      metadataUrl.toString(),
      royalty,
      quantity,
      listNFT,
    ],
    type: "write",
  });

  const { write: writeApproval } = useContractInteraction({
    address: NebulaXNFT,
    abi: NebulaXNFT_ABI.abi,
    functionName: "setApprovalForAll",
    args: [NebulaX, true],
    type: "write",
    enabled: true,
  });

  console.log(data, error);

  useEffect(() => {
    if (data) {
      toast.success("NFT minted successfully!");
      setShowModal();
      setNftType("");
    }
  }, [data]);

  return (
    <div className="p-6 bg-neutral-900 rounded-xl shadow-lg max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white mb-4">Create Your NFT</h2>
        <X
          onClick={() => {
            setShowModal();
            setNftType("");
          }}
        />
      </div>

      <input
        type="text"
        placeholder="NFT Title"
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-800 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="NFT Price in NebX"
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-800 text-white"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="NFT Quantity"
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-800 text-white"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="text"
        placeholder="NFT Royalty"
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-800 text-white"
        value={royalty}
        onChange={(e) => setRoyalty(e.target.value)}
      />

      <textarea
        placeholder="NFT Description"
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-800 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*,video/*"
        className="w-full p-2 mb-3 text-white border border-gray-700 rounded bg-gray-800"
        onChange={handleFileChange}
      />

      <label htmlFor="list_nft" className="block py-3">
        <input
          type="checkbox"
          id="list_nft"
          className="mr-2"
          checked={listNFT}
          onChange={(e) => setListNFT(e.target.checked)}
        />
        List this NFT for sale?
      </label>

      <button
        className="w-full p-2 bg-black hover:bg-black/80 rounded text-white font-bold"
        onClick={uploadToIPFS}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {metadataUrl && (
        <button
          className="w-full mt-3 p-2 bg-white hover:bg-white/80 rounded text-black font-bold"
          onClick={() => {
            if (write && writeApproval) {
              write(), writeApproval();
            }
          }}
          disabled={isPending}
        >
          {isPending ? "Minting..." : "Mint NFT"}
        </button>
      )}
    </div>
  );
};

export default UploadNFT;
