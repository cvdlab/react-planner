"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _en = _interopRequireDefault(require("./en"));
var _it = _interopRequireDefault(require("./it"));
var _ru = _interopRequireDefault(require("./ru"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DEFAULT_LOCALE = 'en';
var Translator = /*#__PURE__*/function () {
  function Translator() {
    _classCallCheck(this, Translator);
    this.locale = null;
    this.translations = {};
    this.registerTranslation('en', _en["default"]);
    this.registerTranslation('it', _it["default"]);
    this.registerTranslation('ru', _ru["default"]);
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
    key: "t",
    value: function t(phrase) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return this.translate.apply(this, [phrase].concat(params));
    }
  }, {
    key: "translate",
    value: function translate(phrase) {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      var locale = this.locale;
      var translation = this.translations[locale];
      if (!translation.hasOwnProperty(phrase)) {
        console.warn("translation '".concat(phrase, "' not found in language '").concat(locale, "'"));
        return phrase;
      }
      var translatedPhrase = translation[phrase];
      translatedPhrase = translatedPhrase.replace(/{(\d+)}/g, function (match, number) {
        return typeof params[number] != 'undefined' ? params[number] : match;
      });
      return translatedPhrase;
    }
  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      locale = locale.toLowerCase();
      if (this.translations.hasOwnProperty(locale)) {
        this.locale = locale;
      } else {
        console.warn("locale '".concat(locale, "' not available, switch to ").concat(DEFAULT_LOCALE));
        this.locale = DEFAULT_LOCALE.toLowerCase();
      }
    }
  }, {
    key: "registerTranslation",
    value: function registerTranslation(locale, translations) {
      if (!this.translations.hasOwnProperty(locale)) {
        this.translations[locale] = translations;
      } else {
        Object.assign(this.translations[locale], translations);
      }
    }
  }], [{
    key: "getBrowserLanguages",
    value: function getBrowserLanguages() {
      return navigator.languages ? navigator.languages : [navigator.language || navigator.userLanguage];
    }
  }]);
  return Translator;
}();
exports["default"] = Translator;