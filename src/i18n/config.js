import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enMeta from './locales/en/meta.json';
import enAlerting from './locales/en/alerting.json';
import enHome from './locales/en/home.json';
import enSecurity from './locales/en/security.json';
import enLicense from './locales/en/license.json';
import enAnomalyDetection from './locales/en/anomalyDetection.json';
import enEncryptionAtRest from './locales/en/encryptionAtRest.json';
import enCompliance from './locales/en/compliance.json';
import enTlsTool from './locales/en/tlsTool.json';
import enFreeTrial from './locales/en/freeTrial.json';
import enContactUs from './locales/en/contactUs.json';
import enCompany from './locales/en/company.json';
import enResource from './locales/en/resource.json';
import enFaq from './locales/en/faq.json';
import enWebinars from './locales/en/webinars.json';

import deCommon from './locales/de/common.json';
import deMeta from './locales/de/meta.json';
import deAlerting from './locales/de/alerting.json';
import deHome from './locales/de/home.json';
import deSecurity from './locales/de/security.json';
import deLicense from './locales/de/license.json';
import deAnomalyDetection from './locales/de/anomalyDetection.json';
import deEncryptionAtRest from './locales/de/encryptionAtRest.json';
import deCompliance from './locales/de/compliance.json';
import deTlsTool from './locales/de/tlsTool.json';
import deFreeTrial from './locales/de/freeTrial.json';
import deContactUs from './locales/de/contactUs.json';
import deCompany from './locales/de/company.json';
import deResource from './locales/de/resource.json';
import deFaq from './locales/de/faq.json';
import deWebinars from './locales/de/webinars.json';

import esCommon from './locales/es/common.json';
import esMeta from './locales/es/meta.json';
import esAlerting from './locales/es/alerting.json';
import esHome from './locales/es/home.json';
import esSecurity from './locales/es/security.json';
import esLicense from './locales/es/license.json';
import esAnomalyDetection from './locales/es/anomalyDetection.json';
import esEncryptionAtRest from './locales/es/encryptionAtRest.json';
import esCompliance from './locales/es/compliance.json';
import esTlsTool from './locales/es/tlsTool.json';
import esFreeTrial from './locales/es/freeTrial.json';
import esContactUs from './locales/es/contactUs.json';
import esCompany from './locales/es/company.json';
import esResource from './locales/es/resource.json';
import esFaq from './locales/es/faq.json';
import esWebinars from './locales/es/webinars.json';

import frCommon from './locales/fr/common.json';
import frMeta from './locales/fr/meta.json';
import frAlerting from './locales/fr/alerting.json';
import frHome from './locales/fr/home.json';
import frSecurity from './locales/fr/security.json';
import frLicense from './locales/fr/license.json';
import frAnomalyDetection from './locales/fr/anomalyDetection.json';
import frEncryptionAtRest from './locales/fr/encryptionAtRest.json';
import frCompliance from './locales/fr/compliance.json';
import frTlsTool from './locales/fr/tlsTool.json';
import frFreeTrial from './locales/fr/freeTrial.json';
import frContactUs from './locales/fr/contactUs.json';
import frCompany from './locales/fr/company.json';
import frResource from './locales/fr/resource.json';
import frFaq from './locales/fr/faq.json';
import frWebinars from './locales/fr/webinars.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      meta: enMeta,
      alerting: enAlerting,
      home: enHome,
      security: enSecurity,
      license: enLicense,
      anomalyDetection: enAnomalyDetection,
      encryptionAtRest: enEncryptionAtRest,
      compliance: enCompliance,
      tlsTool: enTlsTool,
      freeTrial: enFreeTrial,
      contactUs: enContactUs,
      company: enCompany,
      resource: enResource,
      faq: enFaq,
      webinars: enWebinars,
    },
    de: {
      common: deCommon,
      meta: deMeta,
      alerting: deAlerting,
      home: deHome,
      security: deSecurity,
      license: deLicense,
      anomalyDetection: deAnomalyDetection,
      encryptionAtRest: deEncryptionAtRest,
      compliance: deCompliance,
      tlsTool: deTlsTool,
      freeTrial: deFreeTrial,
      contactUs: deContactUs,
      company: deCompany,
      resource: deResource,
      faq: deFaq,
      webinars: deWebinars,
    },
    es: {
      common: esCommon,
      meta: esMeta,
      alerting: esAlerting,
      home: esHome,
      security: esSecurity,
      license: esLicense,
      anomalyDetection: esAnomalyDetection,
      encryptionAtRest: esEncryptionAtRest,
      compliance: esCompliance,
      tlsTool: esTlsTool,
      freeTrial: esFreeTrial,
      contactUs: esContactUs,
      company: esCompany,
      resource: esResource,
      faq: esFaq,
      webinars: esWebinars,
    },
    fr: {
      common: frCommon,
      meta: frMeta,
      alerting: frAlerting,
      home: frHome,
      security: frSecurity,
      license: frLicense,
      anomalyDetection: frAnomalyDetection,
      encryptionAtRest: frEncryptionAtRest,
      compliance: frCompliance,
      tlsTool: frTlsTool,
      freeTrial: frFreeTrial,
      contactUs: frContactUs,
      company: frCompany,
      resource: frResource,
      faq: frFaq,
      webinars: frWebinars,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
