import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";
const defaultVed = "/Ved/default.mp4";

export default function ProjectCard({
  slug,
  id,
  demo,
  lg = defaultVed,
  sm = defaultVed,
  img,
  title = "title",
  description = "description",
}) {
  const { t } = useTranslation();

  const handleClick = (type) => {
    ReactGA.event("projects", {
      project_title: title,
      click_type: type,
      project_id: id,
    });
  };

  return (
    <div
      className="group relative bg-card-bg rounded-3xl
                  p-4 transition-all duration-300 hover:-translate-y-3
                  shadow-[3px_0px_10px_color-mix(in_srgb,var(--color-sideBG),transparent_80%)]
                  hover:shadow-[0px_3px_10px_color-mix(in_srgb,var(--color-sideBG),transparent_80%)]
"
    >
      <div className="relative overflow-hidden rounded-xl bg-bg">
        <div className="md:hidden aspect-9/16 w-full max-w-70 mx-auto">
          <video
            src={sm}
            poster={img}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="hidden md:block aspect-video w-full">
          <video
            src={lg}
            poster={img}
            autoPlay
            loop
            muted
            preload="none"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-4 pb-5 bt-3 text-text relative ">
        <h3 className="font-bold text-xl uppercase">{title}</h3>
        <p className="text-lg leading-relaxed">{description} </p>

        <div className=" pt-8 flex items-center justify-between font-bold">
          <button
            className=" px-3 py-2 bg-transparent border-main border-2 rounded-xl cursor-pointer text-main duration-300
                        relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 hover:text-white
                        before:h-full before:w-0 before:bg-main before:transition-all before:duration-300 before:-z-10 hover:before:w-full"
          >
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("Live Demo")}
            >
              {t("Live Demo")}
            </a>
          </button>

          <Link to={`/projects/${slug}`} onClick={() => handleClick("Details")}>
            <button
              key={id}
              className="px-3 py-2 bg-main rounded-xl cursor-pointer text-white"
            >
              {t("Details")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
