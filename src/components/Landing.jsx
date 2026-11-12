import MainImg from "./MainImg";
import { FaArrowDown } from "react-icons/fa6";
import { useScrollNavigator } from "../hooks/useScrollToRef";
import { LiaCodeSolid } from "react-icons/lia";
import { PiBracketsCurlyLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const handleScroll = useScrollNavigator();
  const { t } = useTranslation();

  return (
    <div className="light:bg-linear-to-b from-[#fafafa] to-main/20">
      <div className="container relative text-center pt-28 pb-12 md:py-section flex justify-center items-center flex-col">
        <LiaCodeSolid
          aria-hidden="true"
          className="hidden light:block absolute top-25 start-10 text-4xl lg:text-7xl font-bold text-main -rotate-15"
        />
        <PiBracketsCurlyLight
          aria-hidden="true"
          className="hidden light:block absolute bottom-35 end-10 text-4xl lg:text-7xl font-bold text-main -rotate-15"
        />

        <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-shadow-lg/30 text-shadow-main mb-1 rtl:mb-5 text-text">
          {t("Ahmed Zaki")}
        </h1>
        <MainImg priority />
        <h2 className="italic text-shadow-lg/30 text-shadow-main text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-1 rtl:mt-5 mb-3 text-text">
          {t("Full Stack Developer")}
        </h2>

        <div className="text-center">
          <p className="text-lg text-text leading-relaxed italic">
            {t(
              "I build scalable, end-to-end web applications from clean React & Next.js interfaces to secure Node.js, Express, and database architectures.",
            )}
          </p>
        </div>

        <button
          type="button"
          aria-label={t("Scroll to services")}
          onClick={() => handleScroll("what")}
          className="my-section-mobile animate-bounce h-10 w-10 rounded-full bg-main text-white flex items-center justify-center text-[18px] cursor-pointer"
        >
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
}
