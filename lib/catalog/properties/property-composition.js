"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyComposition;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyComposition(_ref) {
  var propertyName = _ref.propertyName;
  var value = _ref.value;
  var onUpdate = _ref.onUpdate;
  var configs = _ref.configs;

  return _react2.default.createElement(
    "div",
    { style: { marginBottom: "3px" } },
    _react2.default.createElement(
      "label",
      null,
      propertyName
    ),
    _react2.default.createElement(CompositionForm, null)
  );
}

PropertyComposition.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};

function CompositionForm(props) {

  var STYLE_UL = { listStyle: "none", padding: "5px", backgroundColor: "#111113" };
  var STYLE_LI = { marginBottom: "5px" };
  var STYLE_LABEL = { width: "70px", display: "inline-block" };
  var STYLE_SELECT = { width: "130px" };

  return _react2.default.createElement(
    "ul",
    { style: STYLE_UL },
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Class"
      ),
      _react2.default.createElement(
        "select",
        { value: "17", style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" }),
        _react2.default.createElement(
          "option",
          { value: "17" },
          "17. Rifiuti da costruzione"
        )
      )
    ),
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Subclass"
      ),
      _react2.default.createElement(
        "select",
        { value: "01", style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" }),
        _react2.default.createElement(
          "option",
          { value: "01" },
          "01. Inerti"
        )
      )
    ),
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Category"
      ),
      _react2.default.createElement(
        "select",
        { value: "01", style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" }),
        _react2.default.createElement(
          "option",
          { value: "01" },
          "01. Cemento"
        )
      )
    ),
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Danger"
      ),
      _react2.default.createElement(
        "select",
        { style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" })
      )
    ),
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Op. type"
      ),
      _react2.default.createElement(
        "select",
        { value: "R", style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" }),
        _react2.default.createElement(
          "option",
          { value: "R" },
          "R. Recupero"
        ),
        _react2.default.createElement(
          "option",
          { value: "S" },
          "S. Smaltimento"
        )
      )
    ),
    _react2.default.createElement(
      "li",
      { style: STYLE_LI },
      _react2.default.createElement(
        "label",
        { style: STYLE_LABEL },
        "Operation"
      ),
      _react2.default.createElement(
        "select",
        { value: "D1", style: STYLE_SELECT, onChange: function onChange(event) {
            return console.log(event);
          } },
        _react2.default.createElement("option", { value: "" }),
        _react2.default.createElement(
          "option",
          { value: "D1" },
          "D1. Discarica"
        )
      )
    )
  );
}

function CompositionDetails(props) {
  var STYLE_WRAPPER = { listStyle: "none", padding: "4px", backgroundColor: "#111113", marginBottom: "5px" };
  var STYLE_DL = { margin: "0px 0px 5px 0px" };
  var STYLE_DT = { width: "30%", display: "inline-block" };
  var STYLE_DD = { width: "70%", display: "inline-block", margin: "0px" };

  return _react2.default.createElement(
    "div",
    { style: STYLE_WRAPPER },
    _react2.default.createElement(
      "dl",
      { style: STYLE_DL },
      _react2.default.createElement(
        "dt",
        { style: STYLE_DT },
        "CER (80%)"
      ),
      _react2.default.createElement(
        "dd",
        { style: STYLE_DD },
        "17.01.01 Cemento"
      )
    ),
    _react2.default.createElement(
      "dl",
      { style: STYLE_DL },
      _react2.default.createElement(
        "dt",
        { style: STYLE_DT },
        "Danger"
      ),
      _react2.default.createElement(
        "dd",
        { style: STYLE_DD },
        "H3. Cancerogeno"
      )
    ),
    _react2.default.createElement(
      "dl",
      { style: STYLE_DL },
      _react2.default.createElement(
        "dt",
        { style: STYLE_DT },
        "Operation"
      ),
      _react2.default.createElement(
        "dd",
        { style: STYLE_DD },
        "D1. Discarica"
      )
    )
  );
}

function CompositionAddButton(props) {

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "button",
      null,
      "Copy from ..."
    ),
    _react2.default.createElement(
      "button",
      null,
      "Presets"
    ),
    _react2.default.createElement(
      "button",
      null,
      "Insert"
    )
  );
}