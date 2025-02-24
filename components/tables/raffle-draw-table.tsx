import React from "react";

const draws = [
  {
    id: 1,
    name: "CosmicArts",
    startDate: "01-03-2025",
    endDate: "02-04-2025",
    fee: "$1",
    status: "+100Pending",
    address: "0x456dgh...",
  },
  {
    id: 2,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "+200Completed",
    address: "0x4582x...",
  },
  {
    id: 3,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
  {
    id: 4,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
  {
    id: 5,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
  {
    id: 6,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
  {
    id: 7,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
  {
    id: 8,
    name: "JaneDoe",
    startDate: "25-10-2024",
    endDate: "01-01-2025",
    fee: "$1",
    status: "Completed",
    address: "0x4582x...",
  },
];

const getStatusClass = (status: string) => {
  if (status.includes("Pending")) return "text-red-500 font-semibold";
  if (status.includes("Completed")) return "text-green-500 font-semibold";
  return "text-white";
};

const UpcomingDrawsTable = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upcoming Draws</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-gray-800">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">NO</th>
              <th className="px-4 py-2">Name of NFTs</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Fee</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {draws.map((draw) => (
              <tr
                key={draw.id}
                className="border-b border-gray-300 text-center"
              >
                <td className="px-4 py-2 font-bold">{draw.id}</td>
                <td className="px-4 py-2">{draw.name}</td>
                <td className="px-4 py-2">{draw.startDate}</td>
                <td className="px-4 py-2">{draw.endDate}</td>
                <td className="px-4 py-2">{draw.fee}</td>
                <td className={`px-4 py-2 ${getStatusClass(draw.status)}`}>
                  {draw.status}
                </td>
                <td className="px-4 py-2">{draw.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpcomingDrawsTable;
