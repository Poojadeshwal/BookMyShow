import i18n from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next, useTranslation } from "react-i18next";


export const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
];

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};

export const TranslateFunction = (filename) => {
  const { t } = useTranslation(filename);
  return t;
};

i18n
.use(i18nextBrowserLanguagedetector).use(initReactI18next).use(I18NextHttpBackend).init({
  debug: true,
  fallbackLng: "en",
  returnObjects: true,
});


;







