import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Config from "../config/config";
import { language } from "../api-services/translation/index";
i18n.on("languageChanged", function (lng) {
  // if the language we switched to is the default language we need to remove the /en from URL
  //   if (lng === i18n.options.fallbackLng[0]) {
  //     if (window.location.pathname.includes("/" + i18n.options.fallbackLng[0])) {
  //       const newUrl = window.location.pathname.replace(
  //         "/" + i18n.options.fallbackLng[0],
  //         ""
  //       );
  //       window.location.replace(newUrl);
  //     }
  //   }
});

//localstorage language
const languageInLocalStorage = localStorage.getItem("i18nextLng");


i18n.use(LanguageDetector).init({
  resources: {
    "en-US": {
      translation: language.enUS,
    },
    "zh-CN": {
      translation: language.zhCN,
    },
    "zh-TW": {
      translation: language.zhTW,
    },
    "th-TH": {
      translation: language.thTH,
    },
    "id-ID": {
      translation: language.enUS,
    },
    "vi-VN": {
      translation: language.vivN,
    },
    "id-ID": {
      translation: language.idID,
    },
  },
  whitelist: ["en-US", "zh-CN", "zh-TW", "th-TH", "id-ID", "vi-VN"],
  fallbackLng: [languageInLocalStorage || Config.defaultLanguage],
  detection: {
    order: ["path"],
    lookupFromPathIndex: 0,
    checkWhitelist: true,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ".",
  },
});

export default i18n;
