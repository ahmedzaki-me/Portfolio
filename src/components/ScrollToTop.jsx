import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function ScrollToTop() {
  const { t } = useTranslation();
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

    window.addEventListener("scroll", toggleVisibility, { passive: true });
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
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-4 end-4 sm:bottom-8 sm:end-6 z-50 py-3 px-1.5 bg-main/85 text-white rounded-xl shadow-2xl transition-all duration-300 hover:bg-main-alt hover:scale-110 active:scale-95 cursor-pointer"
          aria-label={t("Scroll to top")}
        >
          <FaArrowUpLong className="text-xl" />
        </button>
      )}
    </>
  );
}
