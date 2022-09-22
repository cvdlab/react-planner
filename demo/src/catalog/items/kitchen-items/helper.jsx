import React from "react";
import * as Three from "three";
import { loadObjWithMaterial } from "../../utils/load-obj";
import path from "path";

let cached3DDoor = {};

export const  Render2D = function (element) {
    let width = element.properties.get("width").get("length");
    let depth = element.properties.get("thickness").get("length");

    let angle = element.rotation + 90;
    let textRotation = Math.sin((angle * Math.PI) / 180) < 0 ? 180 : 0;
    let rect_style = {
      stroke: element.selected ? "#0096fd" : "#000",
      strokeWidth: "2px",
      fill: "#84e1ce",
    };

    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <rect
          key="1"
          x="0"
          y="0"
          width={width}
          height={depth}
          style={rect_style}
        />
        <text
          key="2"
          x="0"
          y="0"
          transform={`translate(${width / 2}, ${
            depth / 2
          }) scale(1,-1) rotate(${textRotation})`}
          style={{ textAnchor: "middle", fontSize: "11px" }}
        >
          {element.type}
        </text>
      </g>
    );
  }

export const Render3D = function (element, modelName) {
    let onLoadItem = (object) => {
      let box = new Three.Box3();
      let boundingBox = box.setFromObject(object);

      let initialWidth = boundingBox.max.x - boundingBox.min.x;
      let initialHeight = boundingBox.max.y - boundingBox.min.y;
      let initialThickness = boundingBox.max.z - boundingBox.min.z;

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      let width = element.properties.get("width").get("length");
      let height = element.properties.get("height").get("length");
      let thickness = element.properties.get("thickness").get("length");

      object.scale.set(
        width / initialWidth,
        height / initialHeight,
        thickness / initialThickness
      );

      let boundingBox2 = new Three.Box3().setFromObject(object);
      let center = [
        (boundingBox2.max.x - boundingBox2.min.x) / 2 + boundingBox2.min.x,
        (boundingBox2.max.y - boundingBox2.min.y) / 2 + boundingBox2.min.y,
        (boundingBox2.max.z - boundingBox2.min.z) / 2 + boundingBox2.min.z,
      ];

      object.position.x -= center[0];
      object.position.y -=
        center[1] - (boundingBox2.max.y - boundingBox2.min.y) / 2;
      object.position.z -= center[2]; // boundingBox2.max.z; //center[2] + (boundingBox2.max.z - boundingBox2.min.z) / 2;;

      let newAltitude = element.properties.get("altitude").get("length");
      object.position.y += newAltitude;
      return object;
    };

    if (cached3DDoor[element.type]) {
      return Promise.resolve(onLoadItem(cached3DDoor[element.type].clone()));
    }

    let mtl = require("./" + modelName + ".mtl");
    let obj = require("./" + modelName + ".obj");
    let img = require("./" + modelName + ".png");

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + "/").then(
      (object) => {
        cached3DDoor[element.type] = object;
        return onLoadItem(cached3DDoor[element.type].clone());
      }
    );
  }
