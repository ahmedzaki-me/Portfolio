import { useTranslation } from "react-i18next";
import { LuMessageCircle } from "react-icons/lu";

export default function ZakiChat() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").slice(
    0,
    2,
  );
  const ar = currentLang === "ar";

  return (
    <a
      href="https://chat.ahmedzaki.me"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-13 start-6 z-50 flex items-center gap-3 px-4 py-2.5
                bg-main/80 text-white rounded-full shadow-[0_2px_10px_rgb(126,87,194,0.4)] 
                transition-all duration-300 ease-out hover:-translate-y-1.5 
                hover:shadow-[0_4px_20px_rgb(126,87,194,0.6)] group active:scale-95"
      aria-label="Chat with Zaki"
    >
      {/* تأثير النبض خلف الأيقونة */}
      {/* <span className="absolute inset-0 rounded-full bg-main/30 animate-ping -z-10 group-hover:hidden"></span> */}

      <div className="relative">
        <LuMessageCircle
          className={`size-6 transition-transform duration-500 group-hover:rotate-12 ${ar ? "rotate-y-180" : ""}`}
        />
        {/* نقطة "أونلاين" صغيرة */}
        <span className="absolute top-0 -start-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <span className="font-semibold tracking-wide text-sm md:text-base">
        {ar ? "تحدث معي!" : "Chat with me!"}
      </span>
    </a>
  );
}
