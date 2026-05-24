'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as Three from 'three';
import { parseData, updateScene } from './scene-creator';
import { disposeScene } from './three-memory-cleaner';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';
import * as SharedStyle from '../../shared-style';

type Props = {
  state: any;
  width: number;
  height: number;
};

export default class Scene3DViewer extends React.Component<Props, any> {

  lastMousePosition: any;
  width: number;
  height: number;
  renderingID: number;
  renderer: any;
  mouseDownEvent: any;
  mouseUpEvent: any;
  orbitControls: any;
  camera: any;
  scene3D: any;
  planData: any;

  constructor(props: Props) {
    super(props);

    this.lastMousePosition = {};
    this.width = props.width;
    this.height = props.height;
    this.renderingID = 0;

    this.renderer = (window as any).__threeRenderer || new Three.WebGLRenderer({ preserveDrawingBuffer: true });
    (window as any).__threeRenderer = this.renderer;
  }

  componentDidMount() {

    let actions = {
      areaActions: (this.context as any).areaActions,
      holesActions: (this.context as any).holesActions,
      itemsActions: (this.context as any).itemsActions,
      linesActions: (this.context as any).linesActions,
      projectActions: (this.context as any).projectActions
    };

    let { state } = this.props;
    let data = state.scene;
    let canvasWrapper = ReactDOM.findDOMNode((this.refs as any).canvasWrapper) as HTMLElement;

    let scene3D = new Three.Scene();

    //RENDERER
    // r155 flipped lights to physically-correct by default; the AmbientLight /
    // SpotLight intensities below were calibrated for the legacy additive model.
    // Re-enable legacy lighting until those are retuned.
    (this.renderer as any).useLegacyLights = true;
    this.renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    this.renderer.setSize(this.width, this.height);

    // LOAD DATA
    let planData = parseData(data, actions, (this.context as any).catalog);

    scene3D.add(planData.plan);
    scene3D.add(planData.grid);

    let aspectRatio = this.width / this.height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 1, 300000);

    scene3D.add(camera);

    // Set position for the camera
    let cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    // let axisHelper = new Three.AxisHelper(100);
    // scene3D.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light

    let spotLight1 = new Three.SpotLight(SharedStyle.COLORS.white, 0.30);
    spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    scene3D.add(spotLight1);

    // OBJECT PICKING
    let toIntersect = [planData.plan];
    let mouse = new Three.Vector2();
    let raycaster = new Three.Raycaster();

    this.mouseDownEvent = (event: any) => {
      this.lastMousePosition.x = event.offsetX / this.width * 2 - 1;
      this.lastMousePosition.y = -event.offsetY / this.height * 2 + 1;
    };

    this.mouseUpEvent = (event: any) => {
      event.preventDefault();

      mouse.x = (event.offsetX / this.width) * 2 - 1;
      mouse.y = -(event.offsetY / this.height) * 2 + 1;

      if (Math.abs(mouse.x - this.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - this.lastMousePosition.y) <= 0.02) {

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(toIntersect, true);

        if (intersects.length > 0 && !(isNaN(intersects[0].distance))) {
          (intersects[0].object as any).interact && (intersects[0].object as any).interact();
        } else {
          (this.context as any).projectActions.unselectAll();
        }
      }
    };

    this.renderer.domElement.addEventListener('mousedown', this.mouseDownEvent);
    this.renderer.domElement.addEventListener('mouseup', this.mouseUpEvent);
    this.renderer.domElement.style.display = 'block';

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(this.renderer.domElement);

    // create orbit controls
    let orbitController = new OrbitControls(camera, this.renderer.domElement);
    let spotLightTarget = new Three.Object3D();
    spotLightTarget.name = 'spotLightTarget';
    spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
    scene3D.add(spotLightTarget);
    (spotLight1 as any).target = spotLightTarget;

    let render = () => {
      orbitController.update();
      spotLight1.position.set(camera.position.x, camera.position.y, camera.position.z);
      spotLightTarget.position.set(orbitController.target.x, orbitController.target.y, orbitController.target.z);
      camera.updateMatrix();
      camera.updateMatrixWorld();

      for (let elemID in planData.sceneGraph.LODs) {
        planData.sceneGraph.LODs[elemID].update(camera);
      }

      this.renderer.render(scene3D, camera);
      this.renderingID = requestAnimationFrame(render);
    };

    render();

    this.orbitControls = orbitController;
    this.camera = camera;
    this.scene3D = scene3D;
    this.planData = planData;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderingID);

    // Guard each teardown step so a half-initialised mount (e.g. componentDidMount
    // threw before assigning these) doesn't mask the real error with a TypeError.
    this.orbitControls?.dispose();

    if (this.renderer?.domElement) {
      if (this.mouseDownEvent) this.renderer.domElement.removeEventListener('mousedown', this.mouseDownEvent);
      if (this.mouseUpEvent)   this.renderer.domElement.removeEventListener('mouseup',   this.mouseUpEvent);
    }

    if (this.scene3D) {
      disposeScene(this.scene3D);
      if (this.planData) {
        this.scene3D.remove(this.planData.plan);
        this.scene3D.remove(this.planData.grid);
      }
    }

    this.scene3D = null;
    this.planData = null;
    this.camera = null;
    this.orbitControls = null;
    this.renderer?.renderLists?.dispose();
  }

  componentWillReceiveProps(nextProps: Props) {
    let { width, height } = nextProps;

    let actions = {
      areaActions: (this.context as any).areaActions,
      holesActions: (this.context as any).holesActions,
      itemsActions: (this.context as any).itemsActions,
      linesActions: (this.context as any).linesActions,
      projectActions: (this.context as any).projectActions
    };

    this.width = width;
    this.height = height;

    this.camera.aspect = width / height;

    this.camera.updateProjectionMatrix();

    if (nextProps.state.scene !== this.props.state.scene) {
      let changedValues = diff(this.props.state.scene, nextProps.state.scene);
      updateScene(this.planData, nextProps.state.scene, this.props.state.scene, changedValues.toJS(), actions, (this.context as any).catalog);
    }

    this.renderer.setSize(width, height);
  }

  render() {
    return React.createElement('div', { ref: 'canvasWrapper' });
  }
}

(Scene3DViewer as any).propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

(Scene3DViewer as any).contextTypes = {
  areaActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object
};
