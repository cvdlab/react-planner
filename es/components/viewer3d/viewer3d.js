'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import * as SharedStyle from '../../styles/shared-style';
import ReactPlannerContext from '../../utils/react-planner-context';
var Scene3DViewer = function Scene3DViewer(_ref) {
  var state = _ref.state,
    width = _ref.width,
    height = _ref.height;
  var canvasWrapper = useRef(null);
  var _useState = useState(window.__threeRenderer || new Three.WebGLRenderer({
      preserveDrawingBuffer: true
    })),
    _useState2 = _slicedToArray(_useState, 1),
    renderer = _useState2[0];
  window.__threeRenderer = renderer;
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    lastMousePosition = _useState4[0],
    setLastMousePosition = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    renderingID = _useState6[0],
    setRenderingID = _useState6[1];
  var actions = useContext(ReactPlannerContext);
  var projectActions = actions.projectActions,
    catalog = actions.catalog;
  var scene3D = new Three.Scene();
  var planData = parseData(state.scene, actions, catalog);
  var aspectRatio = width / height;
  var camera = new Three.PerspectiveCamera(45, aspectRatio, 1, 300000);
  var orbitController = new OrbitControls(camera, renderer.domElement);
  var toIntersect = [planData.plan];
  var mouse = new Three.Vector2();
  var raycaster = new Three.Raycaster();
  var mouseDownEvent = function mouseDownEvent(event) {
    var x = event.offsetX / width * 2 - 1;
    var y = -event.offsetY / height * 2 + 1;
    setLastMousePosition({
      x: x,
      y: y
    });
  };
  var mouseUpEvent = function mouseUpEvent(event) {
    event.preventDefault();
    mouse.x = event.offsetX / width * 2 - 1;
    mouse.y = -(event.offsetY / height) * 2 + 1;
    if (Math.abs(mouse.x - lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - lastMousePosition.y) <= 0.02) {
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(toIntersect, true);
      if (intersects.length > 0 && !isNaN(intersects[0].distance)) {
        intersects[0].object.interact && intersects[0].object.interact();
      } else {
        projectActions.unselectAll();
      }
    }
  };
  useEffect(function () {
    var canvas = canvasWrapper.current;

    //RENDERER
    renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    renderer.setSize(width, height);

    // CANVAS
    scene3D.add(planData.plan);
    scene3D.add(planData.grid);
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

    renderer.domElement.addEventListener('mousedown', mouseDownEvent);
    renderer.domElement.addEventListener('mouseup', mouseUpEvent);
    renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvas.appendChild(renderer.domElement);

    // create orbit controls
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
      renderer.render(scene3D, camera);
      setRenderingID(requestAnimationFrame(render));
    };
    render();
    return function () {
      cancelAnimationFrame(renderingID);
      orbitController.dispose();
      renderer.domElement.removeEventListener('mousedown', mouseDownEvent);
      renderer.domElement.removeEventListener('mouseup', mouseUpEvent);
      disposeScene(scene3D);
      scene3D.remove(planData.plan);
      scene3D.remove(planData.grid);
      renderer.renderLists.dispose();
    };
  }, [width, height]);

  // TODO(pg): check with old code...
  // useEffect(() => {
  //   if (state.scene !== state.scene) {
  //     let changedValues = diff(state.scene, state.scene);
  //     updateScene(planData, state.scene, state.scene, changedValues.toJS(), actions, catalog);
  //   }

  //   renderer.setSize(width, height);
  // }, [state.scene, width, height]);

  return /*#__PURE__*/React.createElement("div", {
    ref: canvasWrapper
  });
};
Scene3DViewer.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
export default Scene3DViewer;