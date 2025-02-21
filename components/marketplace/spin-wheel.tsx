"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ArrowBigUp } from "lucide-react";

const SpinWheel = () => {
  const wheelRef = useRef(null);
  const [finalValue, setFinalValue] = useState(
    "Click On The Spin Button To Start"
  );
  const [isSpinning, setIsSpinning] = useState(false);
  let myChart = useRef<Chart | null>(null);

  useEffect(() => {
    if (wheelRef.current) {
      const canvas = wheelRef.current as HTMLCanvasElement;
      canvas.width = 500; // Increase width
      canvas.height = 500; // Increase height

      myChart.current = new Chart(wheelRef.current, {
        plugins: [ChartDataLabels],
        type: "pie",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          datasets: [
            {
              backgroundColor: [
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
                "#8b35bc",
                "#b163da",
                "#8b35bc",
              ],
              data: Array(11).fill(9.09), // 11 sections, each ~9.09% of 360 degrees
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
    }
  }, []);

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
    // Adjusting to ensure the indicator aligns with the correct segment
    let adjustedAngle = (360 - angleValue) % 360;

    for (let i of rotationValues) {
      if (adjustedAngle >= i.minDegree && adjustedAngle <= i.maxDegree) {
        setFinalValue(`Value: ${i.value}`);
        setIsSpinning(false);
        break;
      }
    }
  };

  //   const valueGenerator = (angleValue: number): void => {
  //     let adjustedAngle = (angleValue + 180) % 360; // Shift by 90° to align with the top indicator

  //     for (let i of rotationValues) {
  //       if (adjustedAngle >= i.minDegree && adjustedAngle <= i.maxDegree) {
  //         setFinalValue(`Value: ${i.value}`);
  //         setIsSpinning(false);
  //         break;
  //       }
  //     }
  //   };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalValue("Good Luck!");

    let currentRotation = (myChart.current?.options as any).rotation || 0;
    let totalRotation = 0;
    let speed = 20; // Initial speed
    let deceleration = 0.98; // Slow down factor
    let targetRotation =
      currentRotation + 2000 + Math.floor(Math.random() * 360); // Ensure multiple spins before stopping

    let rotationInterval = setInterval(() => {
      if (myChart.current) {
        totalRotation += speed;
        speed *= deceleration; // Gradually slow down

        if (totalRotation >= targetRotation || speed < 0.5) {
          clearInterval(rotationInterval);
          let finalAngle = (currentRotation + totalRotation) % 360;
          let adjustedAngle = (finalAngle + 270) % 360; // Adjust for top indicator
          valueGenerator(adjustedAngle);
          setIsSpinning(false);
        }

        (myChart.current.options as any).rotation =
          currentRotation + totalRotation;
        myChart.current.update();
      }
    }, 20);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-purple-700">
      <div className="relative w-[500px] h-[500px] bg-white p-8 rounded-lg shadow-lg">
        {/* Spinning Wheel */}
        <canvas ref={wheelRef}></canvas>

        {/* Indicator at the Top */}
        <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ArrowBigUp size={100} />
        </span>
      </div>

      <p className="mt-4 text-lg text-white">{finalValue}</p>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="left-1/2 transform -translate-x-1/2 bg-yellow-400 text-orange-700 font-semibold text-xl px-6 py-3 rounded-full shadow-md"
      >
        Spin
      </button>
    </div>
  );
};

export default SpinWheel;
