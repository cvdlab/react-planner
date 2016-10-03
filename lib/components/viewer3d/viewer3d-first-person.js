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

var _pointerLockNavigation = require('./pointer-lock-navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer3DFirstPerson = function (_React$Component) {
  _inherits(Viewer3DFirstPerson, _React$Component);

  function Viewer3DFirstPerson() {
    _classCallCheck(this, Viewer3DFirstPerson);

    return _possibleConstructorReturn(this, (Viewer3DFirstPerson.__proto__ || Object.getPrototypeOf(Viewer3DFirstPerson)).apply(this, arguments));
  }

  _createClass(Viewer3DFirstPerson, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      /********************************/
      var canJump = false;

      var prevTime = performance.now();
      var velocity = new _three2.default.Vector3();

      var controlsEnabled = true;

      var moveForward = false;
      var moveBackward = false;
      var moveLeft = false;
      var moveRight = false;
      var canJump = false;

      /********************************/

      var _context = this.context;
      var editingActions = _context.editingActions;
      var catalog = _context.catalog;
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;

      var data = this.props.scene;
      var canvasWrapper = _reactDom2.default.findDOMNode(this.refs.canvasWrapper);

      var scene = new _three2.default.Scene();

      //RENDERER
      var renderer = new _three2.default.WebGLRenderer();
      renderer.setClearColor(new _three2.default.Color(0xffffff));
      renderer.setSize(width, height);

      // LOAD DATA
      var planData = (0, _sceneCreator.parseData)(data, editingActions, catalog);

      scene.add(planData.plan);

      // CAMERA
      var viewSize = 900;
      var aspectRatio = width / height;
      var camera = new _three2.default.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

      scene.add(camera);

      // Set position for the camera
      var cameraPositionX = (planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
      var cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 3;
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
      spotLight1.position.set(1000, 0, -1000);

      camera.add(spotLight1);

      var spotLightHelper = new _three2.default.SpotLightHelper(spotLight1);
      camera.add(spotLightHelper);

      // POINTER LOCK

      document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;

      document.body.requestPointerLock();

      camera.position.set(0, 0, 0);

      this.controls = (0, _pointerLockNavigation.initPointerLock)(camera, renderer.domElement);
      this.controls.getObject().position.set(-50, 0, -100);
      scene.add(this.controls.getObject());

      /**********************************************/

      var onKeyDown = function onKeyDown(event) {

        switch (event.keyCode) {

          case 38: // up
          case 87:
            // w
            moveForward = true;
            break;

          case 37: // left
          case 65:
            // a
            moveLeft = true;
            break;

          case 40: // down
          case 83:
            // s
            moveBackward = true;
            break;

          case 39: // right
          case 68:
            // d
            moveRight = true;
            break;

          /*case 32: // space
           if (canJump === true) velocity.y += 350;
           canJump = false;
           break;*/

        }
      };

      var onKeyUp = function onKeyUp(event) {

        switch (event.keyCode) {

          case 38: // up
          case 87:
            // w
            moveForward = false;
            break;

          case 37: // left
          case 65:
            // a
            moveLeft = false;
            break;

          case 40: // down
          case 83:
            // s
            moveBackward = false;
            break;

          case 39: // right
          case 68:
            // d
            moveRight = false;
            break;

        }
      };

      document.addEventListener('keydown', onKeyDown, false);
      document.addEventListener('keyup', onKeyUp, false);

      var raycaster = new _three2.default.Raycaster(new _three2.default.Vector3(), new _three2.default.Vector3(0, -1, 0), 0, 10);

      /**********************************************/

      // Pointer

      var pointer = new _three2.default.Object3D();

      var pointerGeometry = new _three2.default.Geometry();
      pointerGeometry.vertices.push(new _three2.default.Vector3(-10, 0, 0));
      pointerGeometry.vertices.push(new _three2.default.Vector3(0, 10, 0));
      pointerGeometry.vertices.push(new _three2.default.Vector3(10, 0, 0));
      pointerGeometry.vertices.push(new _three2.default.Vector3(10, 0, 0));

      var yRotation = this.controls.getObject().rotation.y;
      var xRotation = this.controls.getObject().children[0].rotation.x;

      pointer.add(new _three2.default.Line());

      // // OBJECT PICKING
      // let toIntersect = [planData.plan];
      // let mouse = new THREE.Vector2();
      // let raycaster = new THREE.Raycaster();
      //
      // renderer.domElement.addEventListener('mousedown', (event) => {
      //   this.lastMousePosition.x = event.offsetX / width * 2 - 1;
      //   this.lastMousePosition.y = -event.offsetY / height * 2 + 1;
      // }, false);
      //
      // renderer.domElement.addEventListener('mouseup', (event) => {
      //   event.preventDefault();
      //
      //   mouse.x = (event.offsetX / width) * 2 - 1;
      //   mouse.y = -(event.offsetY / height) * 2 + 1;
      //
      //
      //   if (Math.abs(mouse.x - this.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - this.lastMousePosition.y) <= 0.02) {
      //     raycaster.setFromCamera(mouse, camera);
      //     let intersects = raycaster.intersectObjects(toIntersect, true);
      //     if (intersects.length > 0) {
      //       intersects[0].object.interact && intersects[0].object.interact();
      //     }
      //   }
      // }, false);

      // add the output of the renderer to the html element
      canvasWrapper.appendChild(renderer.domElement);

      // create orbit controls
      // let orbitController = new OrbitControls(camera, renderer.domElement);

      var controls = this.controls;

      render();
      function render() {
        // orbitController.update();

        /*********************/
        //raycaster.ray.origin.copy( controls.getObject().position );
        //raycaster.ray.origin.y -= 10;

        //var intersections = raycaster.intersectObjects( objects );

        //var isOnObject = intersections.length > 0;
        var isOnObject = true;

        var time = performance.now();
        var delta = (time - prevTime) / 200;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        if (isOnObject === true) {
          velocity.y = Math.max(0, velocity.y);

          canJump = true;
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < 10) {

          velocity.y = 0;
          controls.getObject().position.y = 10;

          canJump = true;
        }

        prevTime = time;

        /*********************************************/

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      this.lastMousePosition = {};
      // this.orbitControls = orbitController;
      this.renderer = renderer;
      this.camera = camera;
      this.scene = scene;
      this.planData = planData;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var width = nextProps.width;
      var height = nextProps.height;
      var camera = this.camera;
      var renderer = this.renderer;
      var scene = this.scene;


      var viewSize = 900;
      var aspectRatio = width / height;

      camera.left = -aspectRatio * viewSize / 2;
      camera.right = aspectRatio * viewSize / 2;

      camera.updateProjectionMatrix();

      if (nextProps.scene !== this.props.scene) {

        var changedValues = (0, _immutablediff2.default)(this.props.scene, nextProps.scene);

        this.scene.remove(this.planData.plan);
        this.planData = (0, _sceneCreator.parseData)(nextProps.scene, this.context.editingActions);
        this.scene.add(this.planData.plan);

        //updateScene(this.planData.sceneGraph, nextProps.scene, scene, changedValues.toJS());


        // OBJECT PICKING
        var toIntersect = [this.planData.plan];
        var mouse = new _three2.default.Vector2();
        var raycaster = new _three2.default.Raycaster();
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

  return Viewer3DFirstPerson;
}(_react2.default.Component);

exports.default = Viewer3DFirstPerson;


Viewer3DFirstPerson.propTypes = {
  mode: _react2.default.PropTypes.string.isRequired,
  scene: _react2.default.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired
};

Viewer3DFirstPerson.contextTypes = {
  editingActions: _react2.default.PropTypes.object.isRequired,
  catalog: _react2.default.PropTypes.object
};