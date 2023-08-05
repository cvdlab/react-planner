import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as Three from "three";
import { parseData, updateScene } from "./scene-creator";
import { disposeScene } from "./three-memory-cleaner";
import OrbitControls from "./libs/orbit-controls";
import diff from "immutablediff";
import * as SharedStyle from "../../styles/shared-style";
import ReactPlannerContext from "../../utils/react-planner-context";
import { usePrevious } from "@uidotdev/usehooks";

let mouseDownEvent = null;
let mouseUpEvent = null;
let cameraP = null;
let scene3DP = null;
let planDataP = null;
let orbitControllerP = null;
const lastMousePosition = {};
let renderingID = "";

const Scene3DViewer = (props) => {
  const previousProps = usePrevious(props);
  let canvasWrapper = useRef(null);
  const actions = useContext(ReactPlannerContext);
  const { projectActions, catalog } = actions;

  const [renderer, _setRenderer] = useState(
    window.__threeRenderer ||
      new Three.WebGLRenderer({ preserveDrawingBuffer: true })
  );
  window.__threeRenderer = renderer;

  const { width, height } = props;

  useEffect(() => {
    let { state } = props;

    const scene3D = new Three.Scene();

    //RENDERER
    renderer.setClearColor(new Three.Color(SharedStyle.COLORS.white));
    renderer.setSize(width, height);

    // LOAD DATA
    const planData = parseData(state.scene, actions, catalog);

    scene3D.add(planData.plan);
    scene3D.add(planData.grid);

    let aspectRatio = width / height;
    const camera = new Three.PerspectiveCamera(45, aspectRatio, 1, 300000);

    scene3D.add(camera);

    // Set position for the camera
    let cameraPositionX =
      -(planData.boundingBox.max.x - planData.boundingBox.min.x) / 2;
    let cameraPositionY =
      ((planData.boundingBox.max.y - planData.boundingBox.min.y) / 2) * 10;
    let cameraPositionZ =
      (planData.boundingBox.max.z - planData.boundingBox.min.z) / 2;

    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    camera.up = new Three.Vector3(0, 1, 0);

    // HELPER AXIS
    // let axisHelper = new Three.AxesHelper(100);
    // scene3D.add(axisHelper);

    // LIGHT
    let light = new Three.AmbientLight(0xafafaf); // soft white light
    scene3D.add(light);

    // Add another light
    let spotLight1 = new Three.SpotLight(SharedStyle.COLORS.white, 0.3);
    spotLight1.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    scene3D.add(spotLight1);

    // OBJECT PICKING
    let toIntersect = [planData.plan];
    let mouse = new Three.Vector2();
    let raycaster = new Three.Raycaster();

    mouseDownEvent = (event) => {
      let x = (event.offsetX / props.width) * 2 - 1;
      let y = (-event.offsetY / props.height) * 2 + 1;
      Object.assign(lastMousePosition, { x: x, y: y });
    };
    mouseUpEvent = (event) => {
      event.preventDefault();
      mouse.x = (event.offsetX / props.width) * 2 - 1;
      mouse.y = -(event.offsetY / props.height) * 2 + 1;

      if (
        Math.abs(mouse.x - lastMousePosition.x) <= 0.02 &&
        Math.abs(mouse.y - lastMousePosition.y) <= 0.02
      ) {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(toIntersect, true);

        if (intersects.length > 0 && !isNaN(intersects[0].distance)) {
          intersects[0].object.interact && intersects[0].object.interact();
        } else {
          projectActions.unselectAll();
        }
      }
    };

    renderer.domElement.addEventListener("mousedown", mouseDownEvent);
    renderer.domElement.addEventListener("mouseup", mouseUpEvent);
    renderer.domElement.style.display = "block";

    canvasWrapper.current.appendChild(renderer.domElement);

    // create orbit controls
    const orbitController = new OrbitControls(camera, renderer.domElement);
    let spotLightTarget = new Three.Object3D();
    spotLightTarget.name = "spotLightTarget";
    spotLightTarget.position.set(
      orbitController.target.x,
      orbitController.target.y,
      orbitController.target.z
    );
    scene3D.add(spotLightTarget);
    spotLight1.target = spotLightTarget;

    let render = () => {
      orbitController.update();
      spotLight1.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );
      spotLightTarget.position.set(
        orbitController.target.x,
        orbitController.target.y,
        orbitController.target.z
      );
      camera.updateMatrix();
      camera.updateMatrixWorld();

      for (let elemID in planData.sceneGraph.LODs) {
        planData.sceneGraph.LODs[elemID].update(camera);
      }

      renderer.render(scene3D, camera);

      renderingID = requestAnimationFrame(render);
    };

    render();

    cameraP = camera;
    scene3DP = scene3D;

    planDataP = planData;
    orbitControllerP = orbitController;

    return () => {
      cancelAnimationFrame(renderingID);
      orbitControllerP.dispose();

      renderer.domElement.removeEventListener("mousedown", mouseDownEvent);
      renderer.domElement.removeEventListener("mouseup", mouseUpEvent);

      disposeScene(scene3DP);
      scene3DP.remove(planDataP.plan);
      scene3DP.remove(planDataP.grid);

      scene3DP = null;
      planDataP = null;
      cameraP = null;
      orbitControllerP = null;
      renderer.renderLists.dispose();
    };
  }, []);

  useEffect(() => {
    if (cameraP) {
      cameraP.aspect = props.width / props.height;
      cameraP.updateProjectionMatrix();
    }

    if (previousProps && props.state.scene !== previousProps.state.scene) {
      let changedValues = diff(previousProps.state.scene, props.state.scene);
      updateScene(
        planDataP,
        props.state.scene,
        previousProps.state.scene,
        changedValues.toJS(),
        actions,
        catalog
      );
    }

    renderer.setSize(props.width, props.height);
  }, [props]);

  return <div ref={canvasWrapper} />;
};

Scene3DViewer.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Scene3DViewer;
