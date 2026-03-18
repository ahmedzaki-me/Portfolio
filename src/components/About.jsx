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
        <ul className="text-lg text-text leading-relaxed bg-pBG space-y-4 list-[circle]! list-inside ps-6.25 pe-1.25">
          {/* Service 1 */}
          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Full-Stack Web Applications")}:
              </span>{" "}
              {t("Building complete web solutions — from a performant")}{" "}
              <span className="text-main">React</span>{" "}
              {t("frontend to a scalable")}{" "}
              <span className="text-main">Supabase</span>{" "}
              {t(
                "backend, with authentication, real-time data sync, and a database architecture designed to grow with your business.",
              )}
            </p>
          </li>

          {/* Service 2 */}
          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Admin Dashboards & Management Systems")}:
              </span>{" "}
              {t(
                "Designing and building enterprise-grade dashboards with role-based access control, real-time order tracking, advanced filtering, and data visualization — fully tailored to your team's workflow and business needs.",
              )}
            </p>
          </li>

          {/* Service 3 */}
          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Performance-Optimized React Architecture")}:
              </span>{" "}
              {t(
                "Architecting React apps built to last — optimized data fetching with",
              )}{" "}
              <span className="text-main">TanStack Query</span>
              {t(", type-safe forms with")}{" "}
              <span className="text-main">React Hook Form</span> {t("and")}{" "}
              <span className="text-main">Zod</span>
              {t(
                ", and a clean modular structure that stays maintainable as your product scales.",
              )}
            </p>
          </li>
        </ul>
        {/* 
        <ul className="text-lg text-text leading-relaxed bg-pBG space-y-4 list-[circle]! list-inside ps-6.25 pe-1.25">
          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Custom Web Applications")}:
              </span>{" "}
              {t("Building dynamic, high-performance apps using")}{" "}
              <span className="text-main">React</span> {t("&")}{" "}
              <span className="text-main">Tailwind CSS</span>
              {t(", with seamless navigation via ")}
              <span className="text-main"> React Router</span>.
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("Business Process Automation")}:
              </span>{" "}
              {t(
                "I don't just build UI; I connect your frontend to powerful backends like",
              )}{" "}
              <span className="text-main">AppSheet </span>
              {t(
                "and automate workflows-like sending structured orders and invoices directly to",
              )}{" "}
              <span className="text-main">WhatsApp</span>.
            </p>
          </li>

          <li className="marker:text-text">
            <p>
              <span className="font-semibold text-main">
                {t("API Integration & Data Management")}:
              </span>{" "}
              {t(
                "Expertly handling complex data fetching and state management using",
              )}{" "}
              <span className="text-main">Axios</span>{" "}
              {t("to ensure your app stays fast and responsive.")}
            </p>
          </li>
        </ul> */}
      </div>

      <div className="container scroll-mt-18" id="about" ref={sectionRefAbout}>
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald text-shadow-lg/30 mb-3 text-text">
          {t("About ME")}
        </h2>
        <p className="text-lg text-text leading-relaxed italic bg-pBG border-s-3 border-main p-4">
          {t(
            "What started as curiosity about how things are built has grown into a focus on building things that actually work — in production, at scale, and for real users. I specialize in",
          )}
          <span className="font-semibold text-main mx-1 not-italic inline-block">
            React
          </span>
          {t(
            "and the modern JavaScript ecosystem, and I've expanded into full-stack development with",
          )}
          <span className="font-semibold text-main mx-1 not-italic inline-block">
            Supabase
          </span>
          {t(
            ", building systems with real-time sync, role-based access control, and architecture decisions that hold up over time. I care about writing code that's not just functional, but maintainable, performant, and built with the people using it in mind.",
          )}
        </p>
        {/* <p className="text-lg text-text leading-relaxed italic bg-pBG  border-s-3 border-main p-4">
          {t(
            "My journey into web development was sparked by a deep curiosity about how things are built. Today, I dedicate my time to mastering modern technologies like",
          )}
          <span className="font-semibold text-main mx-1 not-italic inline-block">
            {" "}
            React {t("&")} Tailwind CSS{" "}
          </span>
          {t(
            "to craft interfaces that are not only visually stunning but also intuitive, high-performing, and accessible to everyone.",
          )}{" "}
        </p> */}

        <div className="gap-8 py-10 grid grid-cols-2 justify-items-start max-md:grid-cols-1">
          <div className="text-lg text-text dir-ltr">
            {t("Call Me")}:{" "}
            <a
              href="tel:+201286113602"
              target="_blank"
              className="underline! text-main font-bold decoration-main/30 underline-offset-4 hover:decoration--main transition-colors"
            >
              {t("+20 1286113602")}
            </a>
          </div>

          <div className="text-lg text-text ">
            {t("Email")}:{" "}
            <a
              href="mailto:ahmedzaki.developer@gmail.com"
              className="underline! text-main font-bold text-[17px] decoration-main/30 underline-offset-4 hover:decoration--main transition-colors"
              target="_blank"
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
