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

var Three = _interopRequireWildcard(_three);

var _sceneCreator = require('./scene-creator');

var _threeMemoryCleaner = require('./three-memory-cleaner');

var _orbitControls = require('./libs/orbit-controls');

var _orbitControls2 = _interopRequireDefault(_orbitControls);

var _immutablediff = require('immutablediff');

var _immutablediff2 = _interopRequireDefault(_immutablediff);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene3DViewer = function (_React$Component) {
  _inherits(Scene3DViewer, _React$Component);

  function Scene3DViewer(props) {
    _classCallCheck(this, Scene3DViewer);

    var _this = _possibleConstructorReturn(this, (Scene3DViewer.__proto__ || Object.getPrototypeOf(Scene3DViewer)).call(this, props));

    _this.lastMousePosition = {};
    _this.width = props.width;
    _this.height = props.height;
    _this.stopRendering = false;

    _this.renderer = window.__threeRenderer || new Three.WebGLRenderer();
    window.__threeRenderer = _this.renderer;
    return _this;
  }

  _createClass(Scene3DViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var editingActions = this.context.editingActions;
      var state = this.props.state;

      var data = state.scene;
      var canvasWrapper = _reactDom2.default.findDOMNode(this.refs.canvasWrapper);

      var scene3D = new Three.Scene();

      //RENDERER
      this.renderer.setClearColor(new Three.Color(0xffffff));
      this.renderer.setSize(this.width, this.height);

      // LOAD DATA
      var planData = (0, _sceneCreator.parseData)(data, editingActions, this.context.catalog);

      scene3D.add(planData.plan);
      scene3D.add(planData.grid);

      var aspectRatio = this.width / this.height;
      var camera = new Three.PerspectiveCamera(45, aspectRatio, 1, 300000);

      scene3D.add(camera);

      // Set position for the camera
      var cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
      var cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
      var cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

      camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
      camera.up = new Three.Vector3(0, 1, 0);

      // HELPER AXIS
      var axisHelper = new Three.AxisHelper(100);
      scene3D.add(axisHelper);

      // LIGHT
      var light = new Three.AmbientLight(0xafafaf); // soft white light
      scene3D.add(light);

      // Add another light

      var spotLight1 = new Three.SpotLight(0xffffff, 0.30);
      spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
      scene3D.add(spotLight1);

      // OBJECT PICKING
      var toIntersect = [planData.plan];
      var mouse = new Three.Vector2();
      var raycaster = new Three.Raycaster();

      this.mouseDownEvent = function (event) {
        _this2.lastMousePosition.x = event.offsetX / _this2.width * 2 - 1;
        _this2.lastMousePosition.y = -event.offsetY / _this2.height * 2 + 1;
      };

      this.mouseUpEvent = function (event) {
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
      };

      this.renderer.domElement.addEventListener('mousedown', this.mouseDownEvent);
      this.renderer.domElement.addEventListener('mouseup', this.mouseUpEvent);

      // add the output of the renderer to the html element
      canvasWrapper.appendChild(this.renderer.domElement);

      // create orbit controls
      var orbitController = new _orbitControls2.default(camera, this.renderer.domElement);
      var spotLightTarget = new Three.Object3D();
      spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
      scene3D.add(spotLightTarget);
      spotLight1.target = spotLightTarget;

      /************************************/
      /********* SCENE EXPORTER ***********/
      /************************************/

      var exportScene = function exportScene() {

        var convertToBufferGeometry = function convertToBufferGeometry(geometry) {
          console.log("geometry = ", geometry);
          var bufferGeometry = new Three.BufferGeometry().fromGeometry(geometry);
          return bufferGeometry;
        };

        scene3D.remove(planData.grid);

        scene3D.traverse(function (child) {
          console.log(child);
          if (child instanceof Three.Mesh && !(child.geometry instanceof Three.BufferGeometry)) child.geometry = convertToBufferGeometry(child.geometry);
        });

        var output = scene3D.toJSON();

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

        scene3D.add(planData.grid);
      };

      window.exportScene = exportScene;

      /************************************/

      /************************************/
      /********** PLAN EXPORTER ***********/
      /************************************/

      var exportPlan = function exportPlan() {

        var convertToBufferGeometry = function convertToBufferGeometry(geometry) {
          console.log("geometry = ", geometry);
          return new Three.BufferGeometry().fromGeometry(geometry);
        };

        planData.plan.traverse(function (child) {
          console.log(child);
          if (child instanceof Three.Mesh && !(child.geometry instanceof Three.BufferGeometry)) child.geometry = convertToBufferGeometry(child.geometry);
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

        scene3D.add(planData.grid);
      };

      window.exportPlan = exportPlan;

      /************************************/

      var render = function render() {

        orbitController.update();
        spotLight1.position.set(camera.position.x, camera.position.y, camera.position.z);
        spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
        camera.updateMatrix();
        camera.updateMatrixWorld();

        _this2.renderer.render(scene3D, camera);
        if (!_this2.stopRendering) {
          requestAnimationFrame(render);
        }
      };

      render();

      this.orbitControls = orbitController;
      this.camera = camera;
      this.scene3D = scene3D;
      this.planData = planData;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.orbitControls.dispose();
      this.stopRendering = true;

      this.renderer.domElement.removeEventListener('mousedown', this.mouseDownEvent);
      this.renderer.domElement.removeEventListener('mouseup', this.mouseUpEvent);

      (0, _threeMemoryCleaner.disposeScene)(this.scene3D);
      this.scene3D.remove(this.planData.plan);
      this.scene3D.remove(this.planData.grid);

      this.scene3D = null;
      this.planData = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var width = nextProps.width,
          height = nextProps.height;
      var camera = this.camera,
          renderer = this.renderer,
          scene3D = this.scene3D;


      this.width = width;
      this.height = height;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      if (nextProps.state.scene !== this.props.state.scene) {

        var changedValues = (0, _immutablediff2.default)(this.props.state.scene, nextProps.state.scene);
        (0, _sceneCreator.updateScene)(this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), this.context.editingActions, this.context.catalog);
      }

      renderer.setSize(width, height);
      renderer.render(scene3D, camera);
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