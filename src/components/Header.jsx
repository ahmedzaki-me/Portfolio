import { useState, useContext, useEffect, useRef } from "react";
import { ModeContext } from "../context/ModeContext";
import { Link } from "react-router-dom";
import { useScrollNavigator } from "../hooks/useScrollToRef";
import logo from "/AhmedZakiLogo2.jpg";
//Translation
import { useTranslation } from "react-i18next";
// icons
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIcon, setOpenIcon] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const { mode, handleMode } = useContext(ModeContext);
  const handleScroll = useScrollNavigator();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, i18n]);

  useEffect(() => {
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, []);

  return (
    <>
      <div
        className={`${openIcon && "h-30"} border border-[#333] light:border-white
                  fixed z-10 top-5 right-1 text-text bg-header
                  rounded-full transition-all duration-300 ease-in-out
                  ${showHeader || isOpen ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0 pointer-events-none"}`}
      >
        {openIcon ? (
          <div className="flex flex-col">
            <button
              className="p-2.5 cursor-pointer"
              onClick={() => setOpenIcon(!openIcon)}
            >
              <IoIosArrowUp />
            </button>
            <button
              onClick={() => handleMode()}
              className="p-2.5 cursor-pointer"
            >
              {mode === "dark" ? <FiSun /> : <MdDarkMode />}
            </button>

            <button
              className="p-2.5 cursor-pointer"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
            >
              <IoLanguageOutline />
            </button>
          </div>
        ) : (
          <button
            className="p-2.5 cursor-pointer"
            onClick={() => setOpenIcon(!openIcon)}
          >
            <IoIosArrowDown />
          </button>
        )}
      </div>

      <header
        className={`header border border-[#333] light:border-white
          transition-transform duration-300 ease-in-out
          ${showHeader || isOpen ? "translate-y-0" : "-translate-y-24"}
          ${isOpen ? "max-lg:h-77 max-lg:w-75" : "h-14"}
    `}
      >
        <div className="h-11 w-11 flex items-center justify-between gap-4 -translate-y-0.5">
          <img src={logo} alt="Logo" className="rounded-full " />
          <div
            className={`${isOpen && "hidden "} lg:hidden min-w-39 flex items-center gap-3 text-nowrap`}
          >
            {t("Available for work")}
            <div
              className={`${isOpen && "hidden "} lg:hidden relative flex items-center justify-center h-3 w-3 -translate-s-3`}
            >
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-main opacity-40"></span>
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-main"></span>
            </div>
          </div>
        </div>

        <nav
          className={`${isOpen ? "max-lg:translate-y-12.5" : "max-lg:opacity-0 max-lg:invisible max-lg:pointer-events-none"}  `}
        >
          <ul className="flex justify-center items-center gap-6 text-[14px] max-lg:flex-col">
            <Link to="/" onClick={() => setIsOpen(!isOpen)}>
              <li className="nav-link">{t("Home")}</li>
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(!isOpen)}>
              <li className="nav-link">{t("Projects")}</li>
            </Link>
            <li
              className="nav-link"
              onClick={() => {
                handleScroll("about");
                setIsOpen(!isOpen);
              }}
            >
              {t("About")}
            </li>
            <Link to="/blogs" onClick={() => setIsOpen(!isOpen)}>
              <li className="nav-link">{t("Blogs")}</li>
            </Link>
          </ul>
        </nav>

        <button
          onClick={() => {
            handleScroll("contact");
            setIsOpen(!isOpen);
          }}
          className={`btn-contact ${isOpen ? "max-lg:absolute max-lg:top-[78%] max-lg:left-1/2 max-lg:-translate-x-1/2" : "max-lg:hidden"} `}
        >
          <span className="relative z-10">{t("Contact")}</span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden translate-y-0.5 w-9 h-9 flex items-center justify-center
                    bg-main rounded-full text-header transition-transform cursor-pointer
                      z-50"
        >
          {isOpen ? (
            <HiX className="w-6 h-6 scale-95" />
          ) : (
            <HiOutlineMenuAlt4 className="w-6 h-6" />
          )}
        </button>
      </header>
    </>
  );
}
