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
                {t("Full-Stack Web Applications")}:
              </span>{" "}
              {t(
                "I build end-to-end web applications combining modern React and Next.js frontends with Node.js, Express, PostgreSQL, and MongoDB backends.",
              )}
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Backend APIs & Real-Time Systems")}:
              </span>{" "}
              {t(
                "I design secure REST APIs and real-time engines with Socket.IO, JWT session rotation, role-based access control, encryption, and file verification.",
              )}
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Business Dashboards & SaaS")}:
              </span>{" "}
              {t(
                "I build multi-tenant SaaS platforms and business dashboards like Zaki System to manage products, orders, employees, permissions, and online stores.",
              )}
            </p>
          </li>
        </ul>
      </div>

      <div className="container scroll-mt-18" id="about" ref={sectionRefAbout}>
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-shadow-lg/30 mb-3 text-text">
          {t("About ME")}
        </h2>

        <p className="text-lg text-text leading-relaxed italic bg-pBG border-s-3 border-main p-4">
          {t(
            "I'm a Full Stack Developer building production web applications across both frontend and backend. Currently, I work as a Frontend Developer at Enexabit, contributing to web products with React and Next.js. Independently, I built and operate Zaki System, a multi-tenant SaaS platform powered by React, Next.js, and Supabase. I also built Zaki Chat from scratch, a full-stack real-time messaging platform using Node.js, Express, TypeScript, MongoDB, and Socket.IO.",
          )}
        </p>

        <div className="gap-8 py-10 grid grid-cols-2 justify-items-start max-md:grid-cols-1">
          <div className="text-lg text-text">
            {t("Call Me")}:{" "}
            <a
              dir="ltr"
              href="tel:+201286113602"
              target="_blank"
              rel="noreferrer"
              className="underline! text-main font-bold decoration-main/30 underline-offset-4 hover:decoration-main transition-colors whitespace-nowrap"
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
