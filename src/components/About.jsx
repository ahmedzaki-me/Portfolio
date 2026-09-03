import SocialLinks from "./SocialLinks";
import { useScrollToRef } from "../hooks/useScrollToRef";
import DownloadCV from "./DownloadCV";
import { useTranslation } from "react-i18next";

export default function About() {
  const sectionRef = useScrollToRef("what");
  const sectionRefAbout = useScrollToRef("about");
  const { t } = useTranslation();

  return (
    <>
      <div className="container scroll-mt-18" ref={sectionRef} id="what">
        <h2 className="text-3xl md:text-5xl py-4 font-black uppercase text-text tracking-tight">
          {t("what I can do for you")}
        </h2>

        <ul className="text-lg text-text leading-relaxed bg-pBG space-y-4 list-[circle]! list-inside py-2 ps-6.25 pe-1.25">
          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Web Applications")}:
              </span>{" "}
              {t(
                "I build modern web applications with React and Next.js, focusing on clean interfaces, good performance, and maintainable code.",
              )}
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Business Dashboards")}:
              </span>{" "}
              {t(
                "I build dashboards and management systems that help businesses organize products, orders, employees, permissions, and day-to-day operations.",
              )}
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("E-commerce & SaaS")}:
              </span>{" "}
              {t(
                "I build and manage Zaki System, a SaaS platform that helps businesses organize their operations and provides them with their own online stores.",
              )}
            </p>
          </li>
        </ul>
      </div>

      <div className="container scroll-mt-18" id="about" ref={sectionRefAbout}>
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald text-shadow-lg/30 mb-3 text-text">
          {t("About ME")}
        </h2>

        <p className="text-lg text-text leading-relaxed italic bg-pBG border-s-3 border-main p-4">
          {t(
            "I'm a frontend developer currently working at Enexabit, where I contribute to building web products with React and Next.js. I also built Zaki System, a SaaS platform that I offer as a service to businesses to manage their products, orders, and daily operations, while providing them with their own online store. The project is built with React, Next.js, and Supabase, and I continue to improve it based on real user needs.",
          )}
        </p>

        <div className="gap-8 py-10 grid grid-cols-2 justify-items-start max-md:grid-cols-1">
          <div className="text-lg text-text dir-ltr">
            {t("Call Me")}:{" "}
            <a
              dir="ltr"
              href="tel:+201286113602"
              target="_blank"
              rel="noreferrer"
              className="underline! text-main font-bold decoration-main/30 underline-offset-4 hover:decoration-main transition-colors"
            >
              {t("+20 1286113602")}
            </a>
          </div>

          <div className="text-lg text-text">
            {t("Email")}:{" "}
            <a
              href="mailto:ahmedzaki.developer@gmail.com"
              className="underline! text-main font-bold text-[17px] decoration-main/30 underline-offset-4 hover:decoration-main transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              ahmedzaki.developer@gmail.com
            </a>
          </div>

          <SocialLinks />

          <DownloadCV />
        </div>
      </div>
    </>
  );
}
