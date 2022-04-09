import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import loginTranslation from "./Translations/login.en.json";
import contactBookIndexTranslation from "./Translations/contactBook/index.en.json";
import contactBookNewTranslation from "./Translations/contactBook/new.en.json";

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          ...loginTranslation,
          ...contactBookNewTranslation,
          ...contactBookIndexTranslation,
        },
      },
    },
  });

export default i18n;
