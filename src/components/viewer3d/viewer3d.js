"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Three from 'three';
import {parseData, updateScene} from './scene-creator';
import OrbitControls from './libs/orbit-controls';
import diff from 'immutablediff';

export default class Scene3DViewer extends React.Component {

  componentDidMount() {

    let editingActions = this.context.editingActions;

    let {width, height} = this.props;
    let data = this.props.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene = new Three.Scene();

    //RENDERER
    let renderer = new Three.WebGLRenderer();
    renderer.setClearColor(new Three.Color(0xffffff));
    renderer.setSize(width, height);

    // LOAD DATA
    let planData = parseData(data, editingActions);

    scene.add(planData.plan);
    scene.add(planData.grid);

    let aspectRatio = width / height;
    let camera = new Three.PerspectiveCamera(45, aspectRatio, 0.1, 300000);

    scene.add(camera);

    // Set position for the camera
    let cameraPositionX = -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 10;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    let axisHelper = new Three.AxisHelper(100);
    scene.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene.add(light);

    // Add another light

    let spotLight1 = new Three.SpotLight(0xffffff, 0.30);
    spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    scene.add(spotLight1);

    // OBJECT PICKING
    let toIntersect = [planData.plan];
    let mouse = new Three.Vector2();
    let raycaster = new Three.Raycaster();

    renderer.domElement.addEventListener('mousedown', (event) => {
      this.lastMousePosition.x = event.offsetX / width * 2 - 1;
      this.lastMousePosition.y = -event.offsetY / height * 2 + 1;
    }, false);

    renderer.domElement.addEventListener('mouseup', (event) => {
      event.preventDefault();

      mouse.x = (event.offsetX / this.width) * 2 - 1;
      mouse.y = -(event.offsetY / this.height) * 2 + 1;

      if (Math.abs(mouse.x - this.lastMousePosition.x) <= 0.02 && Math.abs(mouse.y - this.lastMousePosition.y) <= 0.02) {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(toIntersect, true);

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
    let orbitController = new OrbitControls(camera, renderer.domElement);


    /************************************/
    /********* SCENE EXPORTER ***********/
    /************************************/

    let exportScene = () => {

      let convertToBufferGeometry = (geometry) => {
        console.log("geometry = ", geometry);
        let bufferGeometry = new Three.BufferGeometry().fromGeometry(geometry);
        return bufferGeometry;
      };

      scene.remove(planData.grid);

      scene.traverse((child, child2) => {
        console.log(child);
        if (child instanceof Three.Mesh)
          child.geometry = convertToBufferGeometry(child.geometry);
      });

      let output = scene.toJSON();

      output = JSON.stringify(output, null, '\t');
      output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');

      let name = prompt('insert file name');
      name = name.trim() || 'scene';
      let blob = new Blob([output], {type: 'text/plain'});

      let fileOutputLink = document.createElement('a');
      let url = window.URL.createObjectURL(blob);
      fileOutputLink.setAttribute('download', name);
      fileOutputLink.href = url;
      document.body.appendChild(fileOutputLink);
      fileOutputLink.click();
      document.body.removeChild(fileOutputLink);

      scene.add(planData.grid);

    };

    window.exportScene = exportScene;


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

  componentWillUnmount() {
    this.orbitControls.dispose();
  }

  componentWillReceiveProps(nextProps) {
    let {width, height} = nextProps;
    let {camera, renderer, scene} = this;

    this.width = width;
    this.height = height;

    let aspectRatio = width / height;
    camera.aspect = aspectRatio;

    camera.updateProjectionMatrix();

    if (nextProps.scene !== this.props.scene) {

      let changedValues = diff(this.props.scene, nextProps.scene);

      updateScene(this.planData, nextProps.scene, changedValues.toJS(), this.context.editingActions);
    }

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }

  render() {
    return React.createElement("div", {
      ref: "canvasWrapper"
    });
  }
}

Scene3DViewer.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

Scene3DViewer.contextTypes = {
  editingActions: React.PropTypes.object.isRequired
};
