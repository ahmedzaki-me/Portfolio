import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-15 end-6  z-50 py-3 px-1.5 bg-main/70 text-bg rounded-xl shadow-2xl transition-all duration-300 hover:bg-main-alt hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUpLong className="text-xl" />
        </button>
      )}
    </>
  );
}
