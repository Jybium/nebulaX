import Image from "next/image";

const videoCategories = [
  { name: "Music Video", icon: "/icons/video-upload.svg" },
  { name: "Art Video", icon: "/icons/video-upload.svg" },
  { name: "Gaming Video", icon: "/icons/video-upload.svg" },
  { name: "Collectible Videos", icon: "/icons/video-upload.svg" },
];

const VideoNFTs = () => {
  return (
    <section className="bg-black text-white py-10 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Video NFTs</h2>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {videoCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-300 rounded-xl flex flex-col items-center justify-center p-6 relative"
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={50}
                  height={50}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black text-center py-2 rounded-b-xl">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoNFTs;
