import { ScrollContext } from "../context/ScrollContext";
import { useContext } from "react";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useScrollTrigger() {
  return useContext(ScrollContext);
}

export const useScrollToRef = (sectionId) => {
  const { targetSection, setTargetSection } = useScrollTrigger();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (targetSection === sectionId && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });

      setTargetSection(null);
    }
  }, [targetSection, sectionId, setTargetSection]);
  return sectionRef;
};

export const useScrollNavigator = () => {
  const { scrollTo } = useScrollTrigger();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    scrollTo(id);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return handleScroll;
};
