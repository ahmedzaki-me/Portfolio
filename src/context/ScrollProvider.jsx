import { ScrollContext } from "./ScrollContext";
import { useState } from "react";
export default function ScrollProvider({ children }) {
  const [targetSection, setTargetSection] = useState(null);

  function scrollTo(sectionID) {
    setTargetSection(sectionID);
  }
  return (
    <ScrollContext.Provider
      value={{ targetSection, setTargetSection, scrollTo }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
