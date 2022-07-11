import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  no: () => require('./translations/no.json'),
  en: () => require('./translations/en.json'),
};

export const getString = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (lang) => {
  // fallback if no available language fits
  const fallback = { languageTag: lang, isRTL: false };

  // const { languageTag, isRTL } = fallback;
  const languageTag = lang;
  // console.log(
  //   'language is ------------',
  //   RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)),
  // );

  // clear translation cache
  getString.cache.clear();
  // update layout direction
  // I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
