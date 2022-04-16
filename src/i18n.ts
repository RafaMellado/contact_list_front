import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const context = require.context("./Translations", true, /.json$/);

const translations = {};

context.keys().forEach((key: any) => {
  const fileName = key.replace("./", "");
  const resource = require(`./Translations/${fileName}`);

  Object.assign(translations, JSON.parse(JSON.stringify(resource)));
});

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: translations,
      },
    },
  });

export default i18n;
