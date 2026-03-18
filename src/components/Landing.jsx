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
      <div className="container relative text-center py-section flex justify-center items-center flex-col">
        <LiaCodeSolid className="hidden light:block absolute top-25 left-10 text-4xl lg:text-7xl font-bold text-main -rotate-15" />
        <PiBracketsCurlyLight className="hidden light:block absolute bottom-35 right-10 text-4xl lg:text-7xl font-bold text-main -rotate-15" />

        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald text-shadow-lg/30 text-shadow-main mb-1 text-text">
          Ahmed Zaki
        </h2>
        <MainImg />
        <h2 className="italic text-shadow-lg/30 text-shadow-main text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald mt-1 mb-3 text-text">
          Front-End Developer
        </h2>

        <div className=" text-center ">
          <p className="text-lg text-text leading-relaxed italic">
            {t("I'm a Frontend Developer With React")}
          </p>
        </div>
        {/* =============== */}
        <div
          onClick={() => handleScroll("what")}
          className="my-section-mobile size-6 animate-bounce h-10 w-10 rounded-full bg-main text-header flex items-center justify-center text-[18px]"
        >
          <FaArrowDown />
        </div>
        {/* =============== */}
      </div>
    </div>
  );
}
