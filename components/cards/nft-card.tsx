import Image from "next/image";
import nft from "@/assets/nft-1.svg";

export const nfts = [
  {
    id: 1,
    image: nft,
    title: "The Rings",
    price: "0.002 ETH",
  },
  {
    id: 2,
    image: nft,
    title: "The Rings",
    price: "0.001 ETH",
  },
  {
    id: 3,
    image: nft,
    title: "The Rings",
    price: "0.112 ETH",
  },
];

interface NFTCardProps {
  image: string;
  title: string;
  price: string;
}

const NFTCard = ({ image, title, price }: NFTCardProps) => {
  return (
    <div className="bg-black rounded-xl shadow-lg border border-gray-700 w-full max-w-sm">
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-white">
        <Image src={image} alt={title} objectFit="contain" />
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-lg mt-3">{title}</h3>
        <div className="flex justify-between items-center text-white mt-2">
          <div className="">
            <p className="text-white font-bold">Minting</p>
            <span className="text-green-400">● Now</span>
          </div>

          <div className="">
            <p className="font-bold text-white">Price</p>
            <span className="font-bold">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
