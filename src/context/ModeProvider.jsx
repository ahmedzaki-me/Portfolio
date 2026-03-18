import { ModeContext } from "./ModeContext";
import { useState, useEffect } from "react";

export default function ModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "dark";
  });

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  function handleMode() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ModeContext.Provider value={{ mode, handleMode }}>
      {children}
    </ModeContext.Provider>
  );
}
