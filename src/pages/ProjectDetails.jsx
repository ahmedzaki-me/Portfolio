import { useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbCheck, TbCopy } from "react-icons/tb";
import { getCurrentLang } from "../i18n";
import { usePostHog } from "@posthog/react";

export default function ProjectDetails() {
  const posthog = usePostHog();
  const { t, i18n } = useTranslation();
  const currentLang = getCurrentLang(i18n);
  const { slug } = useParams();

  const [copiedKey, setCopiedKey] = useState(null);
  const copyTimerRef = useRef(null);

  const project = useMemo(() => {
    const foundProject = projectsData.find((p) => p.slug === slug);
    if (!foundProject) return null;

    return {
      ...foundProject,
      display: foundProject.content[currentLang] || foundProject.content["en"],
    };
  }, [slug, currentLang]);

  useEffect(() => {
    document.title = project?.display?.title
      ? `${project.display.title} | Ahmed Zaki`
      : `${t("Project Not Found")} | Ahmed Zaki`;
  }, [project, t]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopiedKey(key);
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  if (!project || !project.display) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-bg text-text px-4 py-24">
        <h1 className="text-2xl font-bold">{t("Project Not Found")}</h1>
      </div>
    );
  }

  const { display, media, links, tech_stack } = project;

  return (
    <div className="min-h-screen text-text transition-colors duration-300">
      <section
        className="relative h-[50vh] flex items-center justify-center border-b border-card-bg bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/${media.thumbnail})`,
        }}
      >
        <div className="absolute inset-0 bg-black/55 light:bg-black/40"></div>

        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-md">
            {display?.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-medium text-white">
            {display?.short_description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Links */}
          <div className="space-y-8">
            <div className="bg-card-bg p-6 rounded-3xl border border-sideBG/10 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-text">{t("Links")}</h2>
              <div className="flex flex-col gap-3">
                <a
                  onClick={() => {
                    posthog.capture("live_demo_clicked", {
                      project: display?.title,
                    });
                  }}
                  href={links.live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-main bg-main text-white text-center py-3 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95"
                >
                  {t("Live Demo")}
                </a>
                {links.source_code && (
                  <a
                    onClick={() => {
                      posthog.capture("source_code_clicked", {
                        project: display?.title,
                        repo: "frontend",
                      });
                    }}
                    href={links.source_code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-main text-main text-center py-3 rounded-xl font-bold hover:bg-main hover:text-white transition-all"
                  >
                    {links.backend_code
                      ? t("Frontend Source")
                      : t("Source Code")}
                  </a>
                )}
                {links.backend_code && (
                  <a
                    onClick={() => {
                      posthog.capture("source_code_clicked", {
                        project: display?.title,
                        repo: "backend",
                      });
                    }}
                    href={links.backend_code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-main text-main text-center py-3 rounded-xl font-bold hover:bg-main hover:text-white transition-all"
                  >
                    {t("Backend Source")}
                  </a>
                )}
              </div>
            </div>

            {/* Demo Credentials - conditional */}
            {display?.demo_credentials && (
              <div className="bg-card-bg p-6 rounded-3xl border border-main/20 shadow-sm">
                <h2 className="text-xl font-bold mb-1 text-text">
                  {t("Demo Accounts")}
                </h2>
                <p className="text-sm text-text/70 mb-4">
                  {display.demo_credentials.note}
                </p>
                <div className="space-y-3">
                  {display.demo_credentials.accounts.map((account) => {
                    const emailKey = `email-${account.role}`;
                    const isCopied = copiedKey === emailKey;

                    return (
                      <div
                        key={account.role}
                        className="bg-bg rounded-2xl px-4 py-3 border border-sideBG/10"
                      >
                        <span className="text-xs uppercase tracking-widest font-bold text-main block mb-2">
                          {account.role}
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm text-text/80 break-all">
                            {account.email}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(account.email, emailKey)}
                            aria-label={
                              isCopied ? t("Copied!") : t("Copy email")
                            }
                            title={isCopied ? t("Copied!") : t("Copy email")}
                            className="cursor-pointer shrink-0 p-1.5 rounded-lg text-text/60 hover:text-main hover:bg-main/10 transition-colors"
                          >
                            {isCopied ? (
                              <TbCheck className="text-green-500" />
                            ) : (
                              <TbCopy />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {display.demo_credentials.password && (
                  <div className="mt-4 border-t border-sideBG/10 pt-3 flex items-center justify-between gap-2">
                    <p className="text-sm text-text/70">
                      {t("Password:")}{" "}
                      <span className="font-bold text-main">
                        {display.demo_credentials.password}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          display.demo_credentials.password,
                          "demo-password",
                        )
                      }
                      aria-label={
                        copiedKey === "demo-password"
                          ? t("Copied!")
                          : t("Copy password")
                      }
                      title={
                        copiedKey === "demo-password"
                          ? t("Copied!")
                          : t("Copy password")
                      }
                      className="cursor-pointer shrink-0 p-1.5 rounded-lg text-text/60 hover:text-main hover:bg-main/10 transition-colors"
                    >
                      {copiedKey === "demo-password" ? (
                        <TbCheck className="text-green-500" />
                      ) : (
                        <TbCopy />
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div
              className="bg-card-bg p-6 rounded-3xl border border-sideBG/10"
              dir="ltr"
            >
              <h2 className="text-xl font-bold mb-4 text-text border-b border-main/20 pb-2">
                Tech Stack
              </h2>
              {Object.entries(tech_stack).map(([key, value]) => (
                <div key={key} className="mb-5 last:mb-0">
                  <span className="text-xs uppercase tracking-widest font-bold text-main block mb-2 opacity-90">
                    {key.replace("_", " ")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(value) ? (
                      value.map((tool) => (
                        <span
                          key={tool}
                          className="bg-bg text-text px-3 py-1 rounded-lg text-sm border border-sideBG/10 shadow-xs"
                        >
                          {tool}
                        </span>
                      ))
                    ) : (
                      <span className="bg-bg text-text px-3 py-1 rounded-lg text-sm border border-sideBG/10">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-4 opacity-90">
                {t("About Project")}
              </h2>
              <p className="text-lg leading-relaxed opacity-85 border-s-3 border-main ps-4">
                {display?.full_description}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-main rounded-full"></span>
                {t("Key Features")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {display?.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-card-bg p-4 rounded-2xl border border-sideBG/5 shadow-sm"
                  >
                    <span className="text-main font-bold">✓</span>
                    <span className="text-text">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-main rounded-full"></span>
                {t("Challenges & Solutions")}
              </h2>
              <div className="space-y-6">
                {display?.challenges.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-card-bg p-6 rounded-3xl border border-sideBG/5 hover:border-main/30 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-main mb-3 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <div className="space-y-3 text-text">
                      <p className="opacity-90">
                        <span className="font-bold text-red-500/80 me-1 italic">
                          {t("Problem:")}
                        </span>{" "}
                        {item.problem}
                      </p>
                      <p className="opacity-90">
                        <span className="font-bold text-green-600 me-1 italic">
                          {t("Solution:")}
                        </span>{" "}
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
