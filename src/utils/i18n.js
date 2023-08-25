import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Config from "../config/config";
import HttpBackend from "i18next-http-backend";
import config from "../config/config";

//localstorage language
const language = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${config.configUrl}translation/{{lng}}.json`,
      addPath: `${config.configUrl}translation/{{lng}}`,
    },

    whitelist: [
      "en-US",
      "zh-CN",
      "zh-TW",
      "th-TH",
      "id-ID",
      "vi-VN",
      "hi-IN",
      "ta-IN",
      "tgl-PH",
    ],
    fallbackLng: [language || Config.defaultLanguage],
    detection: {
      order: ["path"],
      lookupFromPathIndex: 1,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ".",
    },
    react: {
      wait: true,
    },
    debug: false,
  });

export default i18n;
