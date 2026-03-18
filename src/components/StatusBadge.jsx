import { useState, useEffect } from "react";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const StatusBadge = () => {
  const [showHi, setShowHi] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHi((prev) => !prev);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-2xl absolute bottom-8 -left-6.5 w-15 h-15 bg-main rounded-full flex items-center justify-center text-header font-bold shadow-lg z-9 overflow-hidden">
      <span
        className={`absolute transition-all duration-700 ease-in-out ${
          showHi ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        {t("Hi")}
      </span>

      <span
        className={`absolute transition-all duration-700 ease-in-out ${
          !showHi ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } text-xl`}
      >
        <FaHandshakeSimple className="text-2xl" />
      </span>
    </div>
  );
};

export default StatusBadge;
