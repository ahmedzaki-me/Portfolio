import { useState, useContext, useEffect, useRef } from "react";
import { ModeContext } from "../context/ModeContext";
import { Link } from "react-router-dom";
import { useScrollNavigator } from "../hooks/useScrollToRef";
import logo from "/AhmedZakiLogo2.webp";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "../i18n";
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
  const currentLang = getCurrentLang(i18n);

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
                  fixed z-40 top-5 right-1 text-text bg-header
                  rounded-full transition-all duration-300 ease-in-out
                  ${showHeader || isOpen ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0 pointer-events-none"}`}
      >
        {openIcon ? (
          <div className="flex flex-col">
            <button
              type="button"
              aria-label={t("Collapse quick settings")}
              aria-expanded={openIcon}
              className="p-2.5 cursor-pointer"
              onClick={() => setOpenIcon(false)}
            >
              <IoIosArrowUp />
            </button>
            <button
              type="button"
              aria-label={
                mode === "dark"
                  ? t("Switch to light mode")
                  : t("Switch to dark mode")
              }
              onClick={() => handleMode()}
              className="p-2.5 cursor-pointer"
            >
              {mode === "dark" ? <FiSun /> : <MdDarkMode />}
            </button>

            <button
              type="button"
              aria-label={
                currentLang === "ar"
                  ? "Switch language to English"
                  : "تغيير اللغة إلى العربية"
              }
              className="p-2.5 cursor-pointer"
              onClick={() =>
                i18n.changeLanguage(currentLang === "ar" ? "en" : "ar")
              }
            >
              <IoLanguageOutline />
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={t("Expand quick settings")}
            aria-expanded={openIcon}
            className="p-2.5 cursor-pointer"
            onClick={() => setOpenIcon(true)}
          >
            <IoIosArrowDown />
          </button>
        )}
      </div>

      <header
        className={`header border border-[#333] light:border-white
          transition-transform duration-300 ease-in-out
          ${showHeader || isOpen ? "translate-y-0" : "-translate-y-24"}
          ${isOpen ? "max-lg:h-77 max-lg:w-75" : "h-14 max-[390px]:w-62 max-[390px]:gap-3"}
    `}
      >
        <div className="h-11 w-11 flex items-center justify-between gap-4 -translate-y-0.5">
          <img
            src={logo}
            alt="Logo"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div
            className={`${isOpen && "hidden "} lg:hidden min-w-39 flex items-center gap-2 text-nowrap`}
          >
            {t("Available for work")}
            <div
              aria-hidden="true"
              className={`${isOpen && "hidden "} lg:hidden relative flex items-center justify-center h-3 w-3`}
            >
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-main opacity-40"></span>
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-main"></span>
            </div>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className={`${isOpen ? "max-lg:translate-y-12.5" : "max-lg:opacity-0 max-lg:invisible max-lg:pointer-events-none"}`}
        >
          <ul className="flex justify-center items-center gap-6 text-[14px] max-lg:flex-col">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="nav-link"
              >
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="nav-link"
              >
                {t("Projects")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-link bg-transparent border-0 p-0"
                onClick={() => {
                  handleScroll("about");
                  setIsOpen(false);
                }}
              >
                {t("About")}
              </button>
            </li>
            <li>
              <Link
                to="/blogs"
                onClick={() => setIsOpen(false)}
                className="nav-link"
              >
                {t("Blogs")}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => {
            handleScroll("contact");
            setIsOpen(false);
          }}
          className={`btn-contact ${isOpen ? "max-lg:absolute max-lg:top-[78%] max-lg:left-1/2 max-lg:-translate-x-1/2" : "max-lg:hidden"}`}
        >
          <span className="relative z-10">{t("Contact")}</span>
        </button>

        <button
          type="button"
          aria-label={isOpen ? t("Close menu") : t("Open menu")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden translate-y-0.5 w-9 h-9 flex items-center justify-center
                    bg-main rounded-full text-white transition-transform cursor-pointer
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
