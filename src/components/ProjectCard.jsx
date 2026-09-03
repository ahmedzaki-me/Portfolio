import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePostHog } from "@posthog/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function ProjectCard({
  slug,
  demo,
  img,
  title = "title",
  description = "description",
}) {
  const { t } = useTranslation();
  const posthog = usePostHog();

  return (
    <article
      className="
        group relative overflow-hidden rounded-xl
        bg-card-bg border border-transparent
        transition-all duration-300
        hover:border-main/30
        hover:shadow-xl
      "
    >
      {/* Thumbnail */}
      <Link
        to={`/projects/${slug}`}
        onClick={() => {
          posthog.capture("project_details_clicked", {
            project: title,
          });
        }}
        className="block"
      >
        <div className="relative aspect-[1278/862] overflow-hidden bg-bg">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="
              h-full w-full object-contain
              transition-transform duration-500
              group-hover:scale-103
            "
          />

          {/* Hover overlay */}
          <div
            className="
              absolute inset-0
              bg-black/0
              transition-colors duration-300
              group-hover:bg-black/20
            "
          />

          <div
            className="
              absolute right-4 top-4
              flex h-10 w-10 items-center justify-center
              rounded-full bg-white/90 text-black
              opacity-0 scale-90
              transition-all duration-300
              group-hover:opacity-100
              group-hover:scale-100
            "
          >
            <FaArrowUpRightFromSquare size={20} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold uppercase text-text">{title}</h3>

        <p className="mt-2 text-base leading-relaxed text-text/70 line-clamp-2">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              posthog.capture("live_demo_clicked", {
                project: title,
              });
            }}
            className="
              rounded-xl bg-main px-4 py-2.5
              font-semibold text-white
              transition-all duration-300
              hover:opacity-90
            "
          >
            {t("Live Demo")}
          </a>

          <Link
            to={`/projects/${slug}`}
            onClick={() => {
              posthog.capture("project_details_clicked", {
                project: title,
              });
            }}
            className="
              rounded-xl border border-text/15
              px-4 py-2.5
              font-semibold text-text
              transition-all duration-300
              hover:border-main
              hover:text-main
            "
          >
            {t("Details")}
          </Link>
        </div>
      </div>
    </article>
  );
}
