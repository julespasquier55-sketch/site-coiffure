// src/main.jsx
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./assets/styles/globals.css";

/**
 * Point d'entrée de l'application
 * - Utilise createRoot (React 18+)
 * - BrowserRouter pour le routage côté client
 * - Suspense pour gérer le fallback si tu utilises React.lazy()
 */

const container = document.getElementById("root");

if (!container) {
  throw new Error("Impossible de trouver l'élément #root dans index.html");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement…</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);