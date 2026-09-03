import ProjectCard from "./ProjectCard";
import JsonProjects from "../data/projects.json";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t, i18n } = useTranslation();

  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").slice(
    0,
    2,
  );

  const translatedProjects = JsonProjects.map((project) => ({
    ...project,
    display: project.content[currentLang] || project.content.en,
  }));

  return (
    <section className="container my-section">
      <h2 className="mb-8 text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none font-oswald text-shadow-lg/30 text-text">
        {t("Featured Projects")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {translatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            slug={project.slug}
            demo={project.links.live_demo}
            img={project.media.thumbnail}
            description={project.display?.short_description}
            title={project.display?.title}
          />
        ))}
      </div>
    </section>
  );
}
