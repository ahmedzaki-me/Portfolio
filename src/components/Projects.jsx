import ProjectCard from "./ProjectCard";
import JsonProjects from "../data/projects.json";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").slice(
    0,
    2,
  );

  const translatedProjects = useMemo(() => {
    return JsonProjects.map((project) => ({
      ...project,
      display: project.content[currentLang] || project.content["en"],
    }));
  }, [currentLang]);

  return (
    <>
      <div className="container my-section">
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald text-shadow-lg/30 mb-8 text-text">
          {t("Featured Projects")}
        </h2>
        <div className="flex flex-col justify-center gap-10">
          {translatedProjects.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                id={project.id}
                demo={project.links.live_demo}
                lg={project.media.videoLg_url}
                sm={project.media.videoSm_url}
                img={project.media.thumbnail}
                description={project.display?.short_description}
                title={project.display?.title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
