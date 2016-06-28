"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Three from 'three';
import json2scene from './json2scene';
import OrbitControls from './OrbitControls';

export default class Viewer3D extends React.Component {

  componentDidMount() {

    let {width, height} = this.props;
    let data = this.props.scene;
    let canvasWrapper = ReactDOM.findDOMNode(this.refs.canvasWrapper);

    let scene = new Three.Scene();

    //RENDERER
    let renderer = new Three.WebGLRenderer();
    renderer.setClearColor(new Three.Color(0xffffff));
    renderer.setSize(width, height);

    // DATA
    let planData = json2scene(data);

    scene.add(planData.plan);

    // CAMERA
    let viewSize = 900;
    let aspectRatio = width / height;
    let camera = new Three.OrthographicCamera(
      -aspectRatio * viewSize / 2, aspectRatio * viewSize / 2,
      -viewSize / 2, viewSize / 2,
      -100000, 100000);
    scene.add(camera);

    // Set position for the camera
    let cameraPositionX = (planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY = (planData.boundingBox.max.y - planData.boundingBox.min.y) / 2 * 4;
    let cameraPositionZ = (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, -1, 0);

    // HELPER AXIS
    let axisHelper = new Three.AxisHelper(100);
    scene.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene.add(light);

    // add the output of the renderer to the html element
    canvasWrapper.appendChild(renderer.domElement);

    // create trackball controls
    let orbitController = new OrbitControls(camera, renderer.domElement);

    render();
    function render() {
      orbitController.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    this.orbitControls = orbitController;
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
  }

  componentWillUnmount() {
    this.orbitControls.dispose();
  }

  componentWillReceiveProps(nextProps) {
    let {width, height} = nextProps;
    let {camera, renderer, scene} = this;

    let viewSize = 900;
    let aspectRatio = width / height;

    camera.left = -aspectRatio * viewSize / 2;
    camera.right = aspectRatio * viewSize / 2;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }

  render() {
    return React.createElement("div", {
      ref: "canvasWrapper"
    });
  }
}

Viewer3D.propTypes = {
  mode: React.PropTypes.string.isRequired,
  scene: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
