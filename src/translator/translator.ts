import EN from './en';
import IT from './it';
import RU from './ru';

const DEFAULT_LOCALE = 'en';

type Translations = { [phrase: string]: string };

export default class Translator {
  locale: string | null;
  translations: { [locale: string]: Translations };

  constructor() {
    this.locale = null;
    this.translations = {};

    this.registerTranslation('en', EN);
    this.registerTranslation('it', IT);
    this.registerTranslation('ru', RU);

    let locale: string | null = null;
    let languages = Translator.getBrowserLanguages();
    for (let i = 0; i < languages.length; i++) {
      let lang = languages[i];
      if (this.translations.hasOwnProperty(lang)) {
        locale = lang;
        break;
      }
    }
    locale = locale ? locale : DEFAULT_LOCALE;

    this.setLocale(locale);
  }

  t(phrase: string, ...params: any[]): string {
    return this.translate(phrase, ...params);
  }

  translate(phrase: string, ...params: any[]): string {
    let locale = this.locale as string;

    let translation = this.translations[locale];
    if (!translation.hasOwnProperty(phrase)) {
      console.warn(`translation '${phrase}' not found in language '${locale}'`);
      return phrase;
    }

    let translatedPhrase = translation[phrase];

    translatedPhrase = translatedPhrase.replace(/{(\d+)}/g, function (match: string, number: any) {
      return typeof params[number] != 'undefined' ? params[number] : match;
    });

    return translatedPhrase;
  }

  setLocale(locale: string) {
    locale = locale.toLowerCase();

    if (this.translations.hasOwnProperty(locale)) {
      this.locale = locale;
    } else {
      console.warn(`locale '${locale}' not available, switch to ${DEFAULT_LOCALE}`);
      this.locale = DEFAULT_LOCALE.toLowerCase();
    }
  }

  registerTranslation(locale: string, translations: Translations) {
    if (!this.translations.hasOwnProperty(locale)) {
      this.translations[locale] = translations;
    } else {
      Object.assign(this.translations[locale], translations);
    }
  }

  static getBrowserLanguages(): readonly string[] {
    return navigator.languages
      ? navigator.languages
      : [navigator.language || (navigator as any).userLanguage];
  }
}
