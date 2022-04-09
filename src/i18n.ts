import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import loginTranslation from "./Translations/login.en.json";
import contactBookIndexTranslation from "./Translations/contactBooks/index.en.json";
import contactBookNewTranslation from "./Translations/contactBooks/new.en.json";
import contactBookShowTranslation from "./Translations/contactBooks/show.en.json";
import contactsEditTranslation from "./Translations/contacts/edit.en.json";
import contactsNewTranslation from "./Translations/contacts/new.en.json";
import contactsShowTranslation from "./Translations/contacts/show.en.json";

// TODO: remove all imports and merge all files from Translations folder
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
          ...contactBookShowTranslation,
          ...contactsNewTranslation,
          ...contactsShowTranslation,
          ...contactsEditTranslation,
        },
      },
    },
  });

export default i18n;
