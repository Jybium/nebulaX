"use client";

import { motion } from "framer-motion";

const prizes = [
  { label: "5 Nebula", color: "black" },
  { label: "1 Nebula", color: "gray-400" },
  { label: "10 Nebula", color: "black" },
  { label: "5 Nebula", color: "gray-400" },
  { label: "2 Nebula", color: "black" },
  { label: "0 Nebula", color: "gray-400" },
  { label: "10 Nebula", color: "black" },
  { label: "5 Nebula", color: "gray-400" },
  { label: "1 Nebula", color: "black" },
  { label: "20 Nebula", color: "gray-400" },
];

const PrizeWheel = ({ rotation }: { rotation: number }) => {
  const numPrizes = prizes.length;
  const sliceAngle = 360 / numPrizes;

  return (
    <div className="relative w-64 h-64">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        {prizes.map((prize, index) => {
          const angle = sliceAngle * index;
          return (
            <g key={index} transform={`rotate(${angle} 50 50)`}>
              {/* Wheel Sections */}
              <path
                d="M50,50 L50,0 A50,50 0 0,1 100,50 Z"
                fill={index % 2 === 0 ? "black" : "gray"}
                transform="rotate(18, 50, 50)"
              />
              {/* Prize Text - Adjusted Position */}
              <text
                x="50"
                y="15" /* Move text lower to be inside the segment */
                textAnchor="middle"
                alignmentBaseline="middle"
                className="fill-white text-[4px] font-bold"
                transform={`rotate(${
                  sliceAngle / 2
                }, 50, 15)`} /* Rotate correctly */
              >
                {prize.label}
              </text>
            </g>
          );
        })}
      </motion.svg>

      {/* Pointer Indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border border-gray-400"></div>
    </div>
  );
};

export default PrizeWheel;
