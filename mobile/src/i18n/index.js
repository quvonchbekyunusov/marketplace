export const SUPPORTED_LOCALES = ['ru'];

const messages = {};
const numberFormats = {};
const dateTimeFormats = {};
const pluralizationRules = {};

Object
  .entries(getLocalesData(SUPPORTED_LOCALES))
  .forEach(([locale, localeData]) => {
    messages[locale] = localeData.messages;
    numberFormats[locale] = localeData.numberFormats;
    dateTimeFormats[locale] = localeData.dateTimeFormats;
    pluralizationRules[locale] = localeData.pluralizationRules;
  });

export default {
  locale: 'ru',
  fallbackLocale: 'ru',
  messages,
  numberFormats,
  dateTimeFormats,
  pluralizationRules,
};

function getLocalesData(locales) {
  const result = {};

  locales.forEach((locale) => {
    result[locale] = getLocaleData(locale);
  });

  return result;
}

function getLocaleData(locale) {
  let localeMessages;
  let localeNumberFormats;
  let localeDateTimeFormats;
  let localePluralizationRules;

  /* eslint-disable import/no-dynamic-require, global-require */
  try {
    localeMessages = require(`./locales/${locale}.yaml`);
  } catch {
    localeMessages = {};
  }

  try {
    localeNumberFormats = require(`./numbers/${locale}.yaml`);
  } catch {
    localeNumberFormats = {};
  }

  try {
    localeDateTimeFormats = require(`./date-times/${locale}.yaml`);
  } catch {
    localeDateTimeFormats = {};
  }

  try {
    localePluralizationRules = require(`./plurals/${locale}.js`).default;
  } catch {
    localePluralizationRules = {};
  }
  /* eslint-enable import/no-dynamic-require, global-require */

  return {
    messages: localeMessages,
    numberFormats: localeNumberFormats,
    dateTimeFormats: localeDateTimeFormats,
    pluralizationRules: localePluralizationRules,
  };
}
