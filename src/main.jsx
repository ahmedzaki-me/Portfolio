import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";

import { BrowserRouter } from "react-router-dom";
import ModeProvider from "./context/ModeProvider.jsx";
import ScrollProvider from "./context/ScrollProvider.jsx";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>,
);
