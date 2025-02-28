"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ArrowBigUp } from "lucide-react";

const SpinWheel = ({ setShowSpin }: { setShowSpin: () => void }) => {
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const myChartRef = useRef<Chart | null>(null);

  const [finalValue, setFinalValue] = useState(
    "Click On The Spin Button To Start"
  );
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (!wheelRef.current) return;

    // If a chart instance already exists, destroy it first
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    // Create new chart
    const canvas = wheelRef.current;
    canvas.width = 500;
    canvas.height = 500;

    const newChart = new Chart(canvas, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        datasets: [
          {
            backgroundColor: [
              "#000000",
              "#D9D9D9",
              "#000000",
              "#D9D9D9",
              "#000000",
              "#D9D9D9",
              "#000000",
              "#D9D9D9",
              "#000000",
              "#D9D9D9",
              "#000000",
            ],
            data: Array(11).fill(9.09), // 11 sections
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) =>
              context.chart.data.labels
                ? context.chart.data.labels[context.dataIndex]
                : "",
            font: { size: 24 },
          },
        },
      },
    });

    // Store the new chart instance in ref
    myChartRef.current = newChart;

    // Cleanup on unmount or re-render
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  // Rotation logic
  interface RotationValue {
    minDegree: number;
    maxDegree: number;
    value: number;
  }

  const rotationValues: RotationValue[] = [
    { minDegree: 270, maxDegree: 302, value: 1 },
    { minDegree: 303, maxDegree: 335, value: 2 },
    { minDegree: 336, maxDegree: 360, value: 3 },
    { minDegree: 0, maxDegree: 32, value: 4 },
    { minDegree: 33, maxDegree: 65, value: 5 },
    { minDegree: 66, maxDegree: 98, value: 6 },
    { minDegree: 99, maxDegree: 131, value: 7 },
    { minDegree: 132, maxDegree: 164, value: 8 },
    { minDegree: 165, maxDegree: 197, value: 9 },
    { minDegree: 198, maxDegree: 230, value: 10 },
    { minDegree: 231, maxDegree: 269, value: 11 },
  ];

  const valueGenerator = (angleValue: number): void => {
    // Adjust angle so the top indicator lines up with correct segment
    const adjustedAngle = (360 - angleValue) % 360;

    for (const range of rotationValues) {
      if (
        adjustedAngle >= range.minDegree &&
        adjustedAngle <= range.maxDegree
      ) {
        setFinalValue(`Value: ${range.value}`);
        setHasSpun(true);
        setIsSpinning(false);
        break;
      }
    }
  };

  const spinWheel = () => {
    if (isSpinning || !myChartRef.current) return;
    setIsSpinning(true);
    setFinalValue("Good Luck!");

    let currentRotation = (myChartRef.current.options as any).rotation || 0;
    let totalRotation = 0;
    let speed = 20; // Initial speed
    const deceleration = 0.98; // Slow down factor
    const targetRotation =
      currentRotation + 2000 + Math.floor(Math.random() * 360);

    const rotationInterval = setInterval(() => {
      if (myChartRef.current) {
        totalRotation += speed;
        speed *= deceleration;

        if (totalRotation >= targetRotation || speed < 0.5) {
          clearInterval(rotationInterval);
          const finalAngle = (currentRotation + totalRotation) % 360;
          const adjustedAngle = (finalAngle + 270) % 360;
          valueGenerator(adjustedAngle);
          setIsSpinning(false);
        }

        (myChartRef.current.options as any).rotation =
          currentRotation + totalRotation;
        myChartRef.current.update();
      }
    }, 20);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg- backdrop-blur-md`}
    >
      {/* Wheel Container */}
      <div className="relative w-[500px] h-[500px] p-8 rounded-lg shadow-lg">
        <canvas ref={wheelRef}></canvas>
      </div>

      <p className="mt-4 text-lg text-white">
        {hasSpun
          ? `🎉🎊 Congratulation, you won ${finalValue.replace(
              "Value:",
              ""
            )} NebulaX Coin 🎉🎊`
          : finalValue}
      </p>

      {/* Spin Button */}

      <div className="">
        <button
          onClick={!hasSpun ? spinWheel : setShowSpin}
          disabled={isSpinning}
          className="border border-white bg-black text-white font-semibold text-xl px-10 py-3 rounded-lg shadow-md mt-4"
        >
          {!hasSpun ? "Spin and Win" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default SpinWheel;
