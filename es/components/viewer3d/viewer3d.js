'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import * as SharedStyle from '../../shared-style';

var Scene3DViewer = function (_React$Component) {
  _inherits(Scene3DViewer, _React$Component);

  function Scene3DViewer(props) {
    _classCallCheck(this, Scene3DViewer);

    var _this = _possibleConstructorReturn(this, (Scene3DViewer.__proto__ || Object.getPrototypeOf(Scene3DViewer)).call(this, props));

    _this.lastMousePosition = {};
    _this.width = props.width;
    _this.height = props.height;
    _this.renderingID = 0;

    _this.renderer = window.__threeRenderer || new Three.WebGLRenderer({ preserveDrawingBuffer: true });
    window.__threeRenderer = _this.renderer;
    return _this;
  }

  _createClass(Scene3DViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var actions = {
        areaActions: this.context.areaActions,
        holesActions: this.context.holesActions,
        itemsActions: this.context.itemsActions,
        linesActions: this.context.linesActions,
        projectActions: this.context.projectActions
      };

      var state = this.props.state;

      var data = state.scene;
      var canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

      var scene3D = new Three.Scene();

      //RENDERER
      this.renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
      this.renderer.setSize(this.width, this.height);

      // LOAD DATA
      var planData = parseData(data, actions, this.context.catalog);

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
      // let axisHelper = new Three.AxisHelper(100);
      // scene3D.add(axisHelper);

      // LIGHT
      var light = new Three.AmbientLight(0xafafaf); // soft white light
      scene3D.add(light);

      // Add another light

      var spotLight1 = new Three.SpotLight(SharedStyle.COLORS.white, 0.30);
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

          if (intersects.length > 0 && !isNaN(intersects[0].distance)) {
            intersects[0].object.interact && intersects[0].object.interact();
          } else {
            _this2.context.projectActions.unselectAll();
          }
        }
      };

      this.renderer.domElement.addEventListener('mousedown', this.mouseDownEvent);
      this.renderer.domElement.addEventListener('mouseup', this.mouseUpEvent);
      this.renderer.domElement.style.display = 'block';

      // add the output of the renderer to the html element
      canvasWrapper.appendChild(this.renderer.domElement);

      // create orbit controls
      var orbitController = new OrbitControls(camera, this.renderer.domElement);
      var spotLightTarget = new Three.Object3D();
      spotLightTarget.name = 'spotLightTarget';
      spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
      scene3D.add(spotLightTarget);
      spotLight1.target = spotLightTarget;

      var render = function render() {
        orbitController.update();
        spotLight1.position.set(camera.position.x, camera.position.y, camera.position.z);
        spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
        camera.updateMatrix();
        camera.updateMatrixWorld();

        for (var elemID in planData.sceneGraph.LODs) {
          planData.sceneGraph.LODs[elemID].update(camera);
        }

        _this2.renderer.render(scene3D, camera);
        _this2.renderingID = requestAnimationFrame(render);
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
      cancelAnimationFrame(this.renderingID);

      this.orbitControls.dispose();

      this.renderer.domElement.removeEventListener('mousedown', this.mouseDownEvent);
      this.renderer.domElement.removeEventListener('mouseup', this.mouseUpEvent);

      disposeScene(this.scene3D);
      this.scene3D.remove(this.planData.plan);
      this.scene3D.remove(this.planData.grid);

      this.scene3D = null;
      this.planData = null;
      this.camera = null;
      this.orbitControls = null;
      this.renderer.renderLists.dispose();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var width = nextProps.width,
          height = nextProps.height;


      var actions = {
        areaActions: this.context.areaActions,
        holesActions: this.context.holesActions,
        itemsActions: this.context.itemsActions,
        linesActions: this.context.linesActions,
        projectActions: this.context.projectActions
      };

      this.width = width;
      this.height = height;

      this.camera.aspect = width / height;

      this.camera.updateProjectionMatrix();

      if (nextProps.state.scene !== this.props.state.scene) {
        var changedValues = diff(this.props.state.scene, nextProps.state.scene);
        updateScene(this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, this.context.catalog);
      }

      this.renderer.setSize(width, height);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { ref: 'canvasWrapper' });
    }
  }]);

  return Scene3DViewer;
}(React.Component);

export default Scene3DViewer;


Scene3DViewer.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

Scene3DViewer.contextTypes = {
  areaActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object
};