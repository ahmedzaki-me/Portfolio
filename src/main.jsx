import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n.js";

import { BrowserRouter } from "react-router-dom";
import ModeProvider from "./context/ModeProvider.jsx";
import ScrollProvider from "./context/ScrollProvider.jsx";

import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
  capture_pageview: false,
  person_profiles: "always",
  persistence: "localStorage",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <ModeProvider>
          <ScrollProvider>
            <App />
          </ScrollProvider>
        </ModeProvider>
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);
