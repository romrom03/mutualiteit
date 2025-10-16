import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mutualityConfig from "../config/mutualityConfig.json";
import { generateMutualityPDF } from "../utils/pdfGenerator";

export default function DocumentViewer() {
  const { name: mutualiteit } = useParams();
  const navigate = useNavigate();

  // Haal de configuratie op voor de gekozen mutualiteit
  const config = mutualityConfig[mutualiteit] || null;

  // Initialiseer formulierdata (altijd aanroepen, zelfs als config null is)
  const [formData, setFormData] = useState(
    config
      ? Object.keys(config.fields).reduce((acc, key) => {
          acc[key] = ""; // Standaard lege waarden
          return acc;
        }, {})
      : {}
  );

  // Als er geen configuratie is, toon een foutmelding
  if (!config) {
    return <p>Geen configuratie gevonden voor {mutualiteit}.</p>;
  }

  // Waardes bijhouden bij verandering
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // PDF genereren
  const handleGenerate = async () => {
    try {
      // Genereer de ingevulde PDF
      const pdfBytes = await generateMutualityPDF(mutualiteit, formData, config.fields);
  
      // Maak een downloadlink voor de PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      // Simuleer een klik om de PDF te downloaden
      const a = document.createElement("a");
      a.href = url;
      a.download = `${mutualiteit}_filled_form.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
  
      alert("PDF succesvol gegenereerd en gedownload!");
    } catch (error) {
      alert(`Er is iets misgegaan bij het invullen van ${mutualiteit}`);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:underline self-start"
      >
        ← Terug naar overzicht
      </button>

      <h2 className="text-3xl font-semibold mb-6">
        Formulier voor {mutualiteit}
      </h2>

      {/* Dynamisch formulier */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl text-left"
      >
        {Object.entries(config.fields).map(([key, fieldConfig]) => {
          const label =
            typeof fieldConfig === "string" ? fieldConfig : fieldConfig.label;

          return (
            <div key={key} className="flex flex-col">
              <label className="font-medium mb-1">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                placeholder={`Voer ${label.toLowerCase()} in`}
              />
            </div>
          );
        })}
      </form>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          PDF invullen & downloaden
        </button>
      </div>
    </div>
  );
}