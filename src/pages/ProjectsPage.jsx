import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("Projects")} | Ahmed Zaki`;
  }, [t]);

  return (
    <div className="pt-16 md:pt-0">
      <Projects headingAs="h1" />
    </div>
  );
}
