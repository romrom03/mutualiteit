import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MutualityGrid from "./components/MutualityGrid";
import DocumentViewer from "./components/DocumentViewer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-8 font-sans">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Mutualiteitsdocumenten
        </h1>
        <Routes>
          <Route path="/" element={<MutualityGrid />} />
          <Route path="/mutuality/:name" element={<DocumentViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
