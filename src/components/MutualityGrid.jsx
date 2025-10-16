import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/MutualityGrid.css";

const mutualities = [
  { name: "CM", img: "/images/cm.png" },
  { name: "Partena", img: "/images/partena.png" },
  { name: "Helan", img: "/images/helan.png" },
  { name: "Solidaris", img: "/images/solidaris.png" },
  { name: "Onafhankelijke Ziekenfonds", img: "/images/oz.png" },
];

export default function MutualityGrid() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Kies je mutualiteit
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {mutualities.map((m) => (
          <div
            key={m.name}
            onClick={() => navigate(`/mutuality/${encodeURIComponent(m.name)}`)}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6 border border-gray-100"
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-28 h-28 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{m.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
