import ProjectCard from "./ProjectCard";
import JsonProjects from "../data/projects.json";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "../i18n";

export default function Projects({ headingAs = "h2" }) {
  const { t, i18n } = useTranslation();
  const currentLang = getCurrentLang(i18n);
  const Heading = headingAs;

  const translatedProjects = JsonProjects.map((project) => ({
    ...project,
    display: project.content[currentLang] || project.content.en,
  }));

  return (
    <section className="container my-section-mobile md:my-section">
      <Heading className="mb-8 text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-shadow-lg/30 text-text">
        {t("Featured Projects")}
      </Heading>

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
