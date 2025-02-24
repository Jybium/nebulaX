import React from "react";
import { ArrowLeft } from "lucide-react";

const CreatorDashboard = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back Button */}
      <button className="mb-4 flex items-center gap-2 text-gray-700 hover:text-black">
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Header */}
      <h2 className="text-center text-2xl font-bold mb-6">Creator Dashboard</h2>

      {/* Creator Profile */}
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
      <div className="text-center mt-12">
        <h3 className="text-lg font-semibold">James Doe</h3>
        <p className="text-gray-500">Creator</p>
      </div>

      {/* Biography */}
      <section className="mt-6">
        <h4 className="font-semibold">Biography</h4>
        <p className="text-gray-700 mt-2 text-sm">
          James Doe is a digital artist and NFT creator based in San Francisco.
          With a passion for blending technology and art, James has been
          creating unique pieces that explore the intersection of nature and the
          digital world. His work has been featured in numerous galleries and
          has gained recognition within the NFT community for its vibrant colors
          and intricate details.
        </p>
      </section>

      {/* Reviews Section */}
      <section className="mt-6">
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
      </section>

      {/* Raffle Draw Button */}
      <div className="mt-6 text-center">
        <button className="bg-black text-white px-6 py-2 rounded-full">
          Raffle Draw
        </button>
      </div>
    </div>
  );
};

export default CreatorDashboard;
