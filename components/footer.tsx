import Image from "next/image";
import Link from "next/link";
import background from "@/assets/ecllipse-general.jpeg";

import discord from "@/assets/discord.svg";
import twitter from "@/assets/twitter.svg";
import youtube from "@/assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-10 px-6 lg:px-16 text-base">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={background}
          alt="NebulaX Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="opacity-50"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 z-10">
        {/* Stay in the Loop */}
        <div className="flex flex-col items-baseline">
          <h3 className="text-xl font-semibold mb-4">Stay in the loop</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <Link href="https://discord.com" className="hover:underline">
                Discord
              </Link>
              <Image src={discord} alt="Discord" width={50} height={50} />
            </li>
            <li className="flex items-center gap-4">
              <Link href="https://twitter.com" className="hover:underline">
                Twitter
              </Link>
              <Image src={twitter} alt="Twitter" width={44} height={44} />
            </li>
            <li className="flex items-center gap-4">
              <Link href="https://youtube.com" className="hover:underline">
                YouTube
              </Link>
              <Image src={youtube} alt="YouTube" width={50} height={50} />
            </li>
          </ul>
        </div>

        {/* Products */}
        <div className="flex flex-col items-baseline">
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="hover:underline">
                NebulaX
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Spin
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Video & Image NFTs
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="flex flex-col items-baseline">
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="hover:underline">
                Image NFTs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Video NFTs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col items-baseline">
          <h3 className="text-xl font-semibold mb-4 text-left">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="hover:underline">
                Feedback
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Product Status
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                New Feature
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
