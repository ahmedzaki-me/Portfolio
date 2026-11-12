import { useTranslation } from "react-i18next";
import { LuMessageCircle } from "react-icons/lu";
import { getCurrentLang } from "../i18n";

export default function ZakiChat() {
  const { t, i18n } = useTranslation();
  const ar = getCurrentLang(i18n) === "ar";

  return (
    <a
      href="https://chat.ahmedzaki.me"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 start-4 sm:bottom-8 sm:start-6 z-50 flex items-center gap-3 px-4 py-2.5
                bg-main/85 text-white rounded-full shadow-[0_1px_5px_rgb(126,87,194,0.4)] 
                transition-all duration-300 ease-out hover:-translate-y-1.5 
                hover:shadow-[0_2px_10px_rgb(126,87,194,0.6)] group active:scale-95"
      aria-label={t("Chat with me!")}
    >
      <div className="relative">
        <LuMessageCircle
          className={`size-6 transition-transform duration-500 group-hover:rotate-12 ${ar ? "rotate-y-180" : ""}`}
        />
        <span className="absolute top-0 -start-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <span className="font-semibold tracking-wide text-sm md:text-base">
        {t("Chat with me!")}
      </span>
    </a>
  );
}
