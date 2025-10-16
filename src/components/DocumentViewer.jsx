import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateMutualityPDF } from "../utils/pdfGenerator";
import { listFields } from "../utils/checkFields";

export default function DocumentViewer() {
  const { name: mutuality } = useParams();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    const userData = {
      firstName: "Jérôme",
      lastName: "Fonteyne",
      street: "Kerkstraat",
      number: "12",
      bus: "A",
      postalCode: "9000",
      city: "Gent",
      country: "België",
      nationalId: "93051412345",
      organizationName: "Jeugdvereniging X",
      organizationAddress: "Straat 5, 9000 Gent",
      phoneOrEmail: "info@jeugd.be",
      paidAmount: "50",
      campPeriod: "01/07/2025 - 07/07/2025",
      paymentDate: "01/06/2025",
      sport: "Volleybal",
      sportFederation: "Vlaamse Volleybalbond",
      youthAssociation: "Scouts X",
    };

    try {
      await generateMutualityPDF(mutuality, userData);
    } catch (error) {
      alert(`Er is iets misgegaan bij het invullen van ${mutuality}`);
      console.error(error);
    }
  };

  const handleListFields = async () => {
    try {
      await listFields(mutuality);
    } catch (e) {
      console.error("Fout bij ophalen veldnamen:", e);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:underline self-start"
      >
        ← Terug naar overzicht
      </button>

      <h2 className="text-2xl font-semibold mb-4">{mutuality}</h2>
      <img
        src={`/images/${mutuality.toLowerCase()}.jpg`}
        alt={mutuality}
        className="w-64 h-64 object-contain mb-6 rounded-lg shadow"
      />

      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          PDF invullen & downloaden
        </button>
        <button
          onClick={handleListFields}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Check veldnamen in console
        </button>
      </div>
    </div>
  );
}
