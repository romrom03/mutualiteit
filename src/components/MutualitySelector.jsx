import React from "react";

const mutualities = [
  "CM",
  "Partena",
  "Helan",
  "Solidaris",
  "Onafhankelijke Ziekenfonds",
];

export default function MutualitySelector({ onSelect }) {
  return (
    <div>
      <h2>Kies je mutualiteit</h2>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Maak een keuze --</option>
        {mutualities.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
