import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          const nmIndex = normalized.lastIndexOf("/node_modules/");
          if (nmIndex === -1) return;

          const pkgPath = normalized.slice(nmIndex + "/node_modules/".length);

          if (
            pkgPath.startsWith("posthog-js/") ||
            pkgPath.startsWith("@posthog/react/")
          ) {
            return "analytics";
          }
          if (
            pkgPath.startsWith("i18next/") ||
            pkgPath.startsWith("react-i18next/") ||
            pkgPath.startsWith("i18next-browser-languagedetector/")
          ) {
            return "i18n";
          }
          if (pkgPath.startsWith("react-icons/")) {
            return "icons";
          }
          if (
            pkgPath.startsWith("react/") ||
            pkgPath.startsWith("react-dom/") ||
            pkgPath.startsWith("react-router/") ||
            pkgPath.startsWith("react-router-dom/") ||
            pkgPath.startsWith("scheduler/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
