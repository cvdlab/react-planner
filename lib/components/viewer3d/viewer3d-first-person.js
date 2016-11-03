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

var _immutablediff = require('immutablediff');

var _immutablediff2 = _interopRequireDefault(_immutablediff);

var _pointerLockNavigation = require('./pointer-lock-navigation');

var _firstPersonControls = require('./libs/first-person-controls');

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer3DFirstPerson = function (_React$Component) {
  _inherits(Viewer3DFirstPerson, _React$Component);

  function Viewer3DFirstPerson(props) {
    _classCallCheck(this, Viewer3DFirstPerson);

    var _this = _possibleConstructorReturn(this, (Viewer3DFirstPerson.__proto__ || Object.getPrototypeOf(Viewer3DFirstPerson)).call(this, props));

    _this.width = props.width;
    _this.height = props.height;
    _this.stopRendering = false;
    _this.renderer = window.__threeRenderer || new Three.WebGLRenderer();
    window.__threeRenderer = _this.renderer;
    return _this;
  }

  _createClass(Viewer3DFirstPerson, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      /** Variables for movement control **/
      var prevTime = performance.now();
      var velocity = new Three.Vector3();
      var moveForward = false;
      var moveBackward = false;
      var moveLeft = false;
      var moveRight = false;

      var _context = this.context,
          editingActions = _context.editingActions,
          catalog = _context.catalog;
      var state = this.props.state;

      var data = state.scene;
      var canvasWrapper = _reactDom2.default.findDOMNode(this.refs.canvasWrapper);

      var scene3D = new Three.Scene();

      // As I need to show the pointer above all scene objects, I use this workaround http://stackoverflow.com/a/13309722
      var sceneOnTop = new Three.Scene();

      //RENDERER
      this.renderer.setClearColor(new Three.Color(0xffffff));
      this.renderer.setSize(this.width, this.height);

      // LOAD DATA
      var planData = (0, _sceneCreator.parseData)(data, editingActions, catalog);

      scene3D.add(planData.plan);

      // CAMERA
      var aspectRatio = this.width / this.height;
      var camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

      sceneOnTop.add(camera); // The pointer is on the camera so I show it above all

      // Set position for the camera
      camera.position.set(0, 0, 0);
      camera.up = new Three.Vector3(0, 1, 0);

      // HELPER AXIS
      var axisHelper = new Three.AxisHelper(100);
      scene3D.add(axisHelper);

      // LIGHT
      var light = new Three.AmbientLight(0xafafaf); // soft white light
      scene3D.add(light);

      // Add another light
      var spotLight1 = new Three.SpotLight(0xffffff, 0.30);
      spotLight1.position.set(1000, 0, -1000);
      camera.add(spotLight1);

      // POINTER LOCK

      document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;

      document.body.requestPointerLock();

      var _initPointerLock = (0, _pointerLockNavigation.initPointerLock)(camera, this.renderer.domElement),
          controls = _initPointerLock.controls,
          pointerlockChangeEvent = _initPointerLock.pointerlockChangeEvent,
          requestPointerLockEvent = _initPointerLock.requestPointerLockEvent;

      this.controls = controls;
      this.pointerlockChangeListener = pointerlockChangeEvent;
      this.requestPointerLockEvent = requestPointerLockEvent;

      /* Set user initial position */
      var humanHeight = { length: 1.70, unit: 'm' };
      var humanHeightPixels = (0, _convertUnits2.default)(humanHeight.length).from(humanHeight.unit).to(state.scene.unit) * state.scene.pixelPerUnit;

      var yInitialPosition = planData.boundingBox.min.y + (planData.boundingBox.min.y - planData.boundingBox.max.y) / 2 + humanHeightPixels;
      this.controls.getObject().position.set(-50, yInitialPosition, -100);
      sceneOnTop.add(this.controls.getObject()); // Add the pointer lock controls to the scene that will be rendered on top

      // Add move controls on the page
      this.keyDownEvent = function (event) {
        var moveResult = (0, _firstPersonControls.firstPersonOnKeyDown)(event, moveForward, moveLeft, moveBackward, moveRight);
        moveForward = moveResult.moveForward;
        moveLeft = moveResult.moveLeft;
        moveBackward = moveResult.moveBackward;
        moveRight = moveResult.moveRight;
      };

      this.keyUpEvent = function (event) {
        var moveResult = (0, _firstPersonControls.firstPersonOnKeyUp)(event, moveForward, moveLeft, moveBackward, moveRight);
        moveForward = moveResult.moveForward;
        moveLeft = moveResult.moveLeft;
        moveBackward = moveResult.moveBackward;
        moveRight = moveResult.moveRight;
      };

      document.addEventListener('keydown', this.keyDownEvent, false);
      document.addEventListener('keyup', this.keyUpEvent, false);

      // Add a pointer to the scene

      var pointer = new Three.Object3D();

      var pointerMaterial = new Three.MeshBasicMaterial({ depthTest: false, depthWrite: false, color: 0x000000 });
      var pointerGeometry1 = new Three.Geometry();
      pointerGeometry1.vertices.push(new Three.Vector3(-10, 0, 0));
      pointerGeometry1.vertices.push(new Three.Vector3(10, 0, 0));

      var linePointer1 = new Three.Line(pointerGeometry1, pointerMaterial);
      linePointer1.position.z -= 100;

      var pointerGeometry2 = new Three.Geometry();
      pointerGeometry2.vertices.push(new Three.Vector3(0, 10, 0));
      pointerGeometry2.vertices.push(new Three.Vector3(0, -10, 0));

      var linePointer2 = new Three.Line(pointerGeometry2, pointerMaterial);
      linePointer2.renderDepth = 1e20;
      linePointer2.position.z -= 100;

      var pointerGeometry3 = new Three.Geometry();
      pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));
      pointerGeometry3.vertices.push(new Three.Vector3(1, 1, 0));
      pointerGeometry3.vertices.push(new Three.Vector3(1, -1, 0));
      pointerGeometry3.vertices.push(new Three.Vector3(-1, -1, 0));
      pointerGeometry3.vertices.push(new Three.Vector3(-1, 1, 0));

      var linePointer3 = new Three.Line(pointerGeometry3, pointerMaterial);
      linePointer3.position.z -= 100;

      pointer.add(linePointer1);
      pointer.add(linePointer2);
      pointer.add(linePointer3);

      camera.add(pointer); // Add the pointer to the camera


      // OBJECT PICKING
      var toIntersect = [planData.plan];

      var mouseVector = new Three.Vector2(0, 0);
      var raycaster = new Three.Raycaster();

      this.firstPersonMouseDown = function (event) {

        // First of all I check if controls are enabled

        if (_this2.controls.enabled) {
          event.preventDefault();

          /* Per avere la direzione da assegnare al raycaster, chiamo il metodo getDirection di PointerLockControls,
           * che restituisce una funzione che a sua volta prende un vettore, vi scrive i valori degli oggetti
           * pitch e yaw e lo restituisce */

          raycaster.setFromCamera(mouseVector, camera);

          var intersects = raycaster.intersectObjects(toIntersect, true);
          if (intersects.length > 0) {
            intersects[0].object.interact && intersects[0].object.interact();
          } else {
            editingActions.unselectAll();
          }
        }
      };

      document.addEventListener('mousedown', this.firstPersonMouseDown, false);

      // add the output of the renderer to the html element
      canvasWrapper.appendChild(this.renderer.domElement);
      this.renderer.autoClear = false;

      var render = function render() {

        yInitialPosition = planData.boundingBox.min.y + humanHeightPixels;

        _this2.controls.getObject().position.y = yInitialPosition;

        var time = performance.now();
        var delta = (time - prevTime) / 200;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        if (moveForward) velocity.z -= 400.0 * delta;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        _this2.controls.getObject().translateX(velocity.x * delta);
        _this2.controls.getObject().translateZ(velocity.z * delta);

        prevTime = time;

        _this2.renderer.clear(); // clear buffers
        _this2.renderer.render(scene3D, camera); // render scene 1
        _this2.renderer.clearDepth(); // clear depth buffer
        _this2.renderer.render(sceneOnTop, camera); // render scene 2

        if (!_this2.stopRendering) {
          requestAnimationFrame(render);
        }
      };

      render();

      this.camera = camera;
      this.scene3D = scene3D;
      this.sceneOnTop = sceneOnTop;
      this.planData = planData;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopRendering = true;
      this.renderer.autoClear = true;
      document.removeEventListener('mousedown', this.firstPersonMouseDown);
      document.removeEventListener('keydown', this.keyDownEvent);
      document.removeEventListener('keyup', this.keyUpEvent);
      document.removeEventListener('pointerlockchange', this.pointerlockChangeEvent);
      document.removeEventListener('mozpointerlockchange', this.pointerlockChangeEvent);
      document.removeEventListener('webkitpointerlockchange', this.pointerlockChangeEvent);
      this.renderer.domElement.removeEventListener('click', this.requestPointerLockEvent);

      (0, _threeMemoryCleaner.disposeScene)(this.scene3D);

      this.scene3D.remove(this.planData.plan);

      this.scene3D = null;
      this.planData = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var width = nextProps.width,
          height = nextProps.height,
          state = nextProps.state;
      var camera = this.camera,
          renderer = this.renderer,
          scene3D = this.scene3D,
          sceneOnTop = this.sceneOnTop,
          planData = this.planData;


      this.width = width;
      this.height = height;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      if (nextProps.scene !== this.props.state.scene) {
        var changedValues = (0, _immutablediff2.default)(this.props.state.scene, nextProps.state.scene);
        (0, _sceneCreator.updateScene)(this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), this.context.editingActions, this.context.catalog);
      }

      renderer.setSize(width, height);
      renderer.clear(); // clear buffers
      renderer.render(scene3D, camera); // render scene 1
      renderer.clearDepth(); // clear depth buffer
      renderer.render(sceneOnTop, camera); // render scene 2
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
  state: _react2.default.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  height: _react2.default.PropTypes.number.isRequired
};

Viewer3DFirstPerson.contextTypes = {
  editingActions: _react2.default.PropTypes.object.isRequired,
  catalog: _react2.default.PropTypes.object
};