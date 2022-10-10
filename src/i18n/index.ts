import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

const resources: Resource = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
  });

export default i18next;
