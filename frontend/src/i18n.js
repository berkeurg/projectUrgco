import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// JSON dosyalarımızı içeri aktarıyoruz
import trTranslation from './i18n/tr.json';
import enTranslation from './i18n/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: trTranslation },
      en: { translation: enTranslation }
    },
    lng: 'tr', // Sitenin varsayılan açılış dili
    fallbackLng: 'tr', // Eğer bir çeviri bulunamazsa kullanılacak dil
    interpolation: {
      escapeValue: false // React zaten XSS korumasına sahip olduğu için bunu kapatıyoruz
    }
  });

export default i18n;