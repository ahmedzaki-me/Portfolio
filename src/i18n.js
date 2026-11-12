import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

/**
 * Returns the normalized two-letter active UI language ("ar" or "en").
 */
export function getCurrentLang(i18nInstance = i18n) {
  const lang = i18nInstance.resolvedLanguage || i18nInstance.language || "en";
  return lang.slice(0, 2) === "ar" ? "ar" : "en";
}

function syncDocumentLanguage(lng) {
  const lang = (lng || getCurrentLang()).slice(0, 2) === "ar" ? "ar" : "en";
  const dir = i18n.dir(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: "en",
    supportedLngs: ["ar", "en"],
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

syncDocumentLanguage(i18n.resolvedLanguage || i18n.language);
i18n.on("initialized", () => syncDocumentLanguage());
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
