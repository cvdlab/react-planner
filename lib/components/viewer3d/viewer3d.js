"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _sceneCreator = require('./scene-creator');

var _orbitControls = require('./libs/orbit-controls');

var _orbitControls2 = _interopRequireDefault(_orbitControls);

var _immutablediff = require('immutablediff');

var _immutablediff2 = _interopRequireDefault(_immutablediff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene3DViewer = function (_React$Component) {
  _inherits(Scene3DViewer, _React$Component);

  function Scene3DViewer() {
    _classCallCheck(this, Scene3DViewer);

    return _possibleConstructorReturn(this, (Scene3DViewer.__proto__ || Object.getPrototypeOf(Scene3DViewer)).apply(this, arguments));
  }

  _createClass(Scene3DViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var editingActions = this.context.editingActions;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var state = _props.state;

      var data = state.scene;
      var canvasWrapper = _reactDom2.default.findDOMNode(this.refs.canvasWrapper);

      var scene = new _three2.default.Scene();

      //RENDERER
      var renderer = new _three2.default.WebGLRenderer();
      renderer.setClearColor(new _three2.default.Color(0xffffff));
      renderer.setSize(width, height);

      // LOAD DATA
      var planData = (0, _sceneCreator.parseData)(data, editingActions, this.context.catalog);

      scene.add(planData.plan);
      scene.add(planData.grid);

      var aspectRatio = width / height;
      var camera = new _three2.default.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

      scene.add(camera);

      // Set position for the camera
      var cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
      var cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
      var cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

      camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
      camera.up = new _three2.default.Vector3(0, 1, 0);

      // HELPER AXIS
      var axisHelper = new _three2.default.AxisHelper(100);
      scene.add(axisHelper);

      // LIGHT
      var light = new _three2.default.AmbientLight(0xafafaf); // soft white light
      scene.add(light);

      // Add another light

      var spotLight1 = new _three2.default.SpotLight(0xffffff, 0.30);
      spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
      scene.add(spotLight1);

      // OBJECT PICKING
      var toIntersect = [planData.plan];
      var mouse = new _three2.default.Vector2();
      var raycaster = new _three2.default.Raycaster();

      renderer.domElement.addEventListener('mousedown', function (event) {
        _this2.lastMousePosition.x = event.offsetX / width * 2 - 1;
        _this2.lastMousePosition.y = -event.offsetY / height * 2 + 1;
      }, false);

      renderer.domElement.addEventListener('mouseup', function (event) {
        event.preventDefault();

        mouse.x = event.offsetX / _this2.width * 2 - 1;
        mouse.y = -(event.offsetY / _this2.height) * 2 + 1;

        if (Math.abs(mouse.x - _this2.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - _this2.lastMousePosition.y) <= 0.02) {
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(toIntersect, true);

          if (intersects.length > 0) {
            intersects[0].object.interact && intersects[0].object.interact();
          } else {
            editingActions.unselectAll();
          }
        }
      }, false);

      // add the output of the renderer to the html element
      canvasWrapper.appendChild(renderer.domElement);

      // create orbit controls
      var orbitController = new _orbitControls2.default(camera, renderer.domElement);

      /************************************/
      /********* SCENE EXPORTER ***********/
      /************************************/

      var exportScene = function exportScene() {

        var convertToBufferGeometry = function convertToBufferGeometry(geometry) {
          console.log("geometry = ", geometry);
          var bufferGeometry = new _three2.default.BufferGeometry().fromGeometry(geometry);
          return bufferGeometry;
        };

        scene.remove(planData.grid);

        scene.traverse(function (child) {
          console.log(child);
          if (child instanceof _three2.default.Mesh && !(child.geometry instanceof _three2.default.BufferGeometry)) child.geometry = convertToBufferGeometry(child.geometry);
        });

        var output = scene.toJSON();

        output = JSON.stringify(output, null, '\t');
        output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

        var name = prompt('insert file name');
        name = name.trim() || 'scene';
        var blob = new Blob([output], { type: 'text/plain' });

        var fileOutputLink = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        fileOutputLink.setAttribute('download', name);
        fileOutputLink.href = url;
        document.body.appendChild(fileOutputLink);
        fileOutputLink.click();
        document.body.removeChild(fileOutputLink);

        scene.add(planData.grid);
      };

      window.exportScene = exportScene;

      /************************************/

      /************************************/
      /********** PLAN EXPORTER ***********/
      /************************************/

      var exportPlan = function exportPlan() {

        var convertToBufferGeometry = function convertToBufferGeometry(geometry) {
          console.log("geometry = ", geometry);
          var bufferGeometry = new _three2.default.BufferGeometry().fromGeometry(geometry);
          return bufferGeometry;
        };

        planData.plan.traverse(function (child) {
          console.log(child);
          if (child instanceof _three2.default.Mesh && !(child.geometry instanceof _three2.default.BufferGeometry)) child.geometry = convertToBufferGeometry(child.geometry);
        });

        var output = planData.plan.toJSON();

        output = JSON.stringify(output, null, '\t');
        output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

        var name = prompt('insert file name');
        name = name.trim() || 'plan';
        var blob = new Blob([output], { type: 'text/plain' });

        var fileOutputLink = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        fileOutputLink.setAttribute('download', name);
        fileOutputLink.href = url;
        document.body.appendChild(fileOutputLink);
        fileOutputLink.click();
        document.body.removeChild(fileOutputLink);

        scene.add(planData.grid);
      };

      window.exportPlan = exportPlan;

      /************************************/

      render();
      function render() {
        orbitController.update();

        spotLight1.position.set(camera.position.x, camera.position.y, camera.position.z);
        camera.updateMatrix();
        camera.updateMatrixWorld();

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      this.lastMousePosition = {};
      this.orbitControls = orbitController;
      this.renderer = renderer;
      this.camera = camera;
      this.scene = scene;
      this.planData = planData;
      this.width = width;
      this.height = height;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.orbitControls.dispose();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var width = nextProps.width;
      var height = nextProps.height;
      var camera = this.camera;
      var renderer = this.renderer;
      var scene = this.scene;


      this.width = width;
      this.height = height;

      var aspectRatio = width / height;
      camera.aspect = aspectRatio;

      camera.updateProjectionMatrix();

      if (nextProps.state.scene !== this.props.state.scene) {

        var changedValues = (0, _immutablediff2.default)(this.props.state.scene, nextProps.state.scene);

        (0, _sceneCreator.updateScene)(this.planData, nextProps.state.scene, changedValues.toJS(), this.context.editingActions, this.context.catalog);
      }

      renderer.setSize(width, height);
      renderer.render(scene, camera);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement("div", {
        ref: "canvasWrapper"
      });
    }
  }]);

  return Scene3DViewer;
}(_react2.default.Component);

exports.default = Scene3DViewer;


Scene3DViewer.propTypes = {
  state: _react2.default.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired
};

Scene3DViewer.contextTypes = {
  editingActions: _react2.default.PropTypes.object.isRequired,
  catalog: _react2.default.PropTypes.object
};