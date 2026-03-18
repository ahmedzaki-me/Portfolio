import { MdRemoveRedEye } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga4";

export default function DownloadCV() {
  const { t } = useTranslation();

  const handleClick = () => {
    ReactGA.event("View_resume", {
      file_name: "Ahmed-Zaki-CV",
      file_extevsion: "PDF",
    });
  };

  return (
    <div className="flex flex-col items-center text-nowrap">
      <a
        onClick={handleClick}
        href="/Ahmed-Zaki-CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center gap-2 px-4 py-2 bg-transparent text-text font-semibold rounded-2xl border border-main/80"
      >
        <span>{t("View My CV")}</span>
        <MdRemoveRedEye />
      </a>
      <p className="text-xs text-gray-500 font-medium ">
        Opens in a new tab • PDF
      </p>
    </div>
  );
}
