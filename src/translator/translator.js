import EN_US from './en-us';
import IT from './it';

const DEFAULT_LOCALE = 'en-US';

export default class Translator {
  constructor() {
    this.locale = null;
    this.translations = {};

    this.registerTranslation('en-us', EN_US);
    this.registerTranslation('it', IT);
    this.setLocale(Translator.getBrowserLocale());
  }

  t(phrase, ...params) {
    return this.translate(phrase, ...params);
  }

  translate(phrase, ...params) {
    let locale = this.locale;

    let translation = this.translations[locale];
    if (!translation.hasOwnProperty(phrase)) {
      console.warn(`translation '${phrase}' not found in language '${locale}'`);
      return phrase;
    }

    let translatedPhrase = translation[phrase];

    translatedPhrase = translatedPhrase.replace(/{(\d+)}/g, function (match, number) {
      return typeof params[number] != 'undefined'
        ? params[number]
        : match;
    });

    return translatedPhrase;
  }

  setLocale(locale) {
    locale = locale.toLowerCase();

    if (this.translations.hasOwnProperty(locale)) {
      this.locale = locale;
    } else {
      console.warn(`locale '${locale}' not available, switch to ${DEFAULT_LOCALE}`);
      this.locale = DEFAULT_LOCALE.toLowerCase();
    }
  }

  registerTranslation(locale, translations) {
    if (!this.translations.hasOwnProperty(locale)) {
      this.translations[locale] = translations;
    } else {
      Object.assign(this.translations[locale], translations);
    }
  }

  static getBrowserLocale() {
    return navigator.languages
      ? navigator.languages[0]
      : (navigator.language || navigator.userLanguage)
  }
}
