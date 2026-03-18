import { useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TbCopy } from "react-icons/tb";

export default function ProjectDetails() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").slice(
    0,
    2,
  );

  const { slug } = useParams();

  const project = useMemo(() => {
    const foundProject = projectsData.find((p) => p.slug === slug);
    if (!foundProject) return null;

    return {
      ...foundProject,
      display: foundProject.content[currentLang] || foundProject.content["en"],
    };
  }, [slug, currentLang]);

  if (!project || !project.display) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <h2 className="text-2xl font-bold">
          {currentLang === "ar" ? "المشروع غير موجود" : "Project Not Found"}
        </h2>
      </div>
    );
  }

  const { display, media, links, tech_stack } = project;

  return (
    <div className="min-h-screen text-text transition-colors duration-300  ">
      <section
        className="relative h-[50vh] flex items-center justify-center border-b border-card-bg
                    bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url(/${media.thumbnail})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 light:bg-black/30"></div>

        <div className="relative text-center px-4 ">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-md">
            {display?.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-medium text-white!">
            {display?.short_description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="bg-card-bg p-6 rounded-3xl border border-sideBG/10 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-text">
                {currentLang === "ar" ? " الروابط " : " Links "}
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={links.live_demo}
                  target="_blank"
                  className="border-2 border-main bg-main text-white text-center py-3 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95"
                >
                  {t("Live Demo")}
                </a>
                <a
                  href={links.source_code}
                  target="_blank"
                  className="border-2 border-main text-main text-center py-3 rounded-xl font-bold hover:bg-main hover:text-text transition-all"
                >
                  Source Code
                </a>
              </div>
            </div>

            {/* Demo Credentials — conditional */}
            {display?.demo_credentials && (
              <div className="bg-card-bg p-6 rounded-3xl border border-main/20 shadow-sm">
                <h3 className="text-xl font-bold mb-1 text-text">
                  {currentLang === "ar" ? "بيانات الدخول" : "Demo Accounts"}
                </h3>
                <p className="text-sm text-text/70 mb-4">
                  {display.demo_credentials.note}
                </p>
                <div className="space-y-3">
                  {display.demo_credentials.accounts.map((account) => (
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
                          onClick={() =>
                            navigator.clipboard.writeText(account.email)
                          }
                          title="Copy email"
                          className="cursor-pointer shrink-0 p-1.5 rounded-lg text-text/50 hover:text-main hover:bg-main/10 transition-colors"
                        >
                          <TbCopy />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Password row */}
                <div className="mt-4 border-t border-sideBG/10 pt-3 flex items-center justify-between gap-2">
                  <p className="text-sm text-text/70">
                    {currentLang === "ar" ? "كلمة المرور: " : "Password: "}
                    <span className="font-bold text-main">Ahmed#</span>
                  </p>
                  <button
                    onClick={() => navigator.clipboard.writeText("Ahmed#")}
                    title="Copy password"
                    className="cursor-pointer shrink-0 p-1.5 rounded-lg text-text/50 hover:text-main hover:bg-main/10 transition-colors"
                  >
                    <TbCopy />
                  </button>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div
              className="bg-card-bg p-6 rounded-3xl border border-sideBG/10 "
              dir="ltr"
            >
              <h3 className="text-xl font-bold mb-4 text-text border-b border-main/20 pb-2">
                Tech Stack
              </h3>
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
                {currentLang === "ar" ? " عن المشروع " : " About Project "}
              </h2>
              <p className="text-lg leading-relaxed opacity-80 border-s-3 border-main ps-4">
                {display?.full_description}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-main rounded-full"></span>
                {currentLang === "ar" ? "المميزات الرئيسية" : "Key Features"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
                {currentLang === "ar"
                  ? "التحديات والحلول"
                  : "Challenges & Solutions"}
              </h2>
              <div className="space-y-6">
                {display?.challenges.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-card-bg p-6 rounded-3xl border border-sideBG/5 hover:border-main/30 transition-colors"
                  >
                    <h4 className="text-xl font-bold text-main mb-3 uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <div className="space-y-3 text-text">
                      <p className="opacity-90">
                        <span className="font-bold text-red-500/80 mr-1 italic">
                          {currentLang === "ar" ? "المشكلة:" : "Problem:"}
                        </span>{" "}
                        {item.problem}
                      </p>
                      <p className="opacity-90">
                        <span className="font-bold text-green-600 mr-1 italic">
                          {currentLang === "ar" ? "الحل:" : "Solution:"}
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
