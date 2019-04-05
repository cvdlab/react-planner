'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarExportButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require('react-icons/fa');

var _ColladaExporter = require('three/examples/jsm/exporters/ColladaExporter');

var _xmlJs = require('xml-js');

var _fileSaver = require('file-saver');

var _toolbarButton = require('./toolbar-button');

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _export = require('../../class/export');

var _sceneCreator = require('../viewer3d/scene-creator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarExportButton(_ref, _ref2) {
  var state = _ref.state,
      context = _ref.context,
      catalog = _ref.catalog;
  var translator = _ref2.translator;

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = _export.Project.unselectAll(state).updatedState;
    var actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };

    var scene = state.get('scene');
    // LOAD DATA
    var planData = (0, _sceneCreator.parseData)(scene, actions, catalog);

    setTimeout(function () {
      var exporter = new _ColladaExporter.ColladaExporter();
      exporter.parse(planData.plan, function (_ref3) {
        var data = _ref3.data;

        var parsedFile = (0, _xmlJs.xml2js)(data, { compact: true });
        parsedFile.COLLADA.asset['unit'] = {
          _attributes: { name: 'centimeter', meter: '0.01' }
        };
        var fixedData = (0, _xmlJs.js2xml)(parsedFile, { compact: true, spaces: 4 });

        var fileBlob = new Blob([fixedData], {
          type: 'text/plain;charset=utf-8'
        });

        (0, _fileSaver.saveAs)(fileBlob, 'planner.DAE');
      });
    }, 1000);
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    {
      active: false,
      tooltip: translator.t('Export project'),
      onClick: saveProjectToFile
    },
    _react2.default.createElement(_fa.FaFileDownload, null)
  );
}

ToolbarExportButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarExportButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};