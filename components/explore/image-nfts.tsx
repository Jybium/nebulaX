import Image from "next/image";
import { FaHeart } from "react-icons/fa";

const nftItems = [
  {
    id: 1,
    image: "/nfts/nft1.jpg",
    profile: "/avatars/creator1.jpg",
    creator: "CosmicArts",
    name: "Nan",
    rating: "⭐",
    likes: 700,
  },
  {
    id: 2,
    image: "/nfts/nft2.jpg",
    profile: "/avatars/creator2.jpg",
    creator: "DogArts",
    name: "Doni",
    rating: "⭐⭐",
    likes: 1000,
  },
  {
    id: 3,
    image: "/nfts/nft3.jpg",
    profile: "/avatars/creator2.jpg",
    creator: "DogArts",
    name: "Doni",
    rating: "⭐⭐",
    likes: 500,
  },
  {
    id: 4,
    image: "/nfts/nft4.jpg",
    profile: "/avatars/creator2.jpg",
    creator: "DogArts",
    name: "Doni",
    rating: "⭐⭐",
    likes: 1000,
  },
];

const ImageNFTs = () => {
  return (
    <section className="bg-black text-white py-10 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Image NFTs</h2>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {nftItems.map((nft) => (
              <div
                key={nft.id}
                className="bg-white rounded-xl overflow-hidden shadow-md relative"
              >
                {/* NFT Image */}
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />

                {/* Creator Profile */}
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={nft.profile}
                    alt={nft.creator}
                    width={32}
                    height={32}
                  />
                </div>

                {/* NFT Details */}
                <div className="bg-black text-white p-2">
                  <p className="text-sm font-semibold">{nft.creator}</p>
                  <p className="text-xs">
                    {nft.name} {nft.rating}
                  </p>

                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-green-400">●</span>
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      {nft.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageNFTs;
