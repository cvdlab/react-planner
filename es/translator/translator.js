var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import EN from './en';
import IT from './it';
import RU from './ru';

var DEFAULT_LOCALE = 'en';

var Translator = function () {
  function Translator() {
    _classCallCheck(this, Translator);

    this.locale = null;
    this.translations = {};

    this.registerTranslation('en', EN);
    this.registerTranslation('it', IT);
    this.registerTranslation('ru', RU);

    var locale = null;
    var languages = Translator.getBrowserLanguages();
    for (var i = 0; i < languages.length; i++) {
      var lang = languages[i];
      if (this.translations.hasOwnProperty(lang)) {
        locale = lang;
        break;
      }
    }
    locale = locale ? locale : DEFAULT_LOCALE;

    this.setLocale(locale);
  }

  _createClass(Translator, [{
    key: 't',
    value: function t(phrase) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return this.translate.apply(this, [phrase].concat(params));
    }
  }, {
    key: 'translate',
    value: function translate(phrase) {
      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      var locale = this.locale;

      var translation = this.translations[locale];
      if (!translation.hasOwnProperty(phrase)) {
        console.warn('translation \'' + phrase + '\' not found in language \'' + locale + '\'');
        return phrase;
      }

      var translatedPhrase = translation[phrase];

      translatedPhrase = translatedPhrase.replace(/{(\d+)}/g, function (match, number) {
        return typeof params[number] != 'undefined' ? params[number] : match;
      });

      return translatedPhrase;
    }
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      locale = locale.toLowerCase();

      if (this.translations.hasOwnProperty(locale)) {
        this.locale = locale;
      } else {
        console.warn('locale \'' + locale + '\' not available, switch to ' + DEFAULT_LOCALE);
        this.locale = DEFAULT_LOCALE.toLowerCase();
      }
    }
  }, {
    key: 'registerTranslation',
    value: function registerTranslation(locale, translations) {
      if (!this.translations.hasOwnProperty(locale)) {
        this.translations[locale] = translations;
      } else {
        Object.assign(this.translations[locale], translations);
      }
    }
  }], [{
    key: 'getBrowserLanguages',
    value: function getBrowserLanguages() {
      return navigator.languages ? navigator.languages : [navigator.language || navigator.userLanguage];
    }
  }]);

  return Translator;
}();

export default Translator;