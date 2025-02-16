import NFTCard, { nfts } from "./cards/nft-card";

export default function LatestDrops() {
  return (
    <section className="p-6 bg-black text-white">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
        Latest Drops
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </section>
  );
}
