import * as Three from 'three';
import React from 'react';

const cubeMaterial = new Three.MeshLambertMaterial({color: 0xf5f4f4});

function makeObjectMaxLOD(newWidth,newHeight,newDepth) {

  let electricalPanel = new Three.Mesh();

  let textureLoader = new Three.TextureLoader();
  let mat = textureLoader.load(require('./texturePanel.png'));

  let cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);

  let p1 = new Three.Mesh(cubeGeometryBase, cubeMaterial);
  p1.position.set(0, 1, 0);
  electricalPanel.add(p1);

  let planeGeometryBase = new Three.PlaneGeometry(newWidth, newHeight);
  let planeMaterial = new Three.MeshLambertMaterial({map: mat});

  let p2 = new Three.Mesh(planeGeometryBase, planeMaterial);
  p2.position.set(0, 1, 25.5);
  p1.add(p2);

  return electricalPanel
}

function makeObjectMinLOD(newWidth,newHeight,newDepth) {

  let electricalPanel = new Three.Mesh();

  let cubeGeometryBase = new Three.BoxGeometry(newWidth, newHeight, newDepth);
  let p1 = new Three.Mesh(cubeGeometryBase, cubeMaterial);
  p1.position.set(0, 1, 0);
  electricalPanel.add(p1);

  return electricalPanel
}

export default {
  name: "pannello_elettrico",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "electric panel",
    description: "electric panel",
    image: require('./electricalPanel.png')
  },
  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 90,
        unit: 'cm'
      }
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 210,
        unit: 'cm'
      }
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
      <rect key="1" x="0" y="0" width={newWidth} height={newDepth}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#ff0000"}}/>
      <text key="2" x="0" y="0"
            transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
        {element.get('name')}
        </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let newHeight = element.properties.get('height').get('length');
    let newAltitude = element.properties.get('altitude').get('length');


    /**************** LOD max ***********************/

    let elettricalPannel2=new Three.Object3D();

    let objectMaxLOD = makeObjectMaxLOD(newWidth,newHeight,newDepth);
    elettricalPannel2.add(objectMaxLOD.clone());
    elettricalPannel2.rotation.y=Math.PI;
    elettricalPannel2.position.y+= newHeight/2 + newAltitude;

    /**************** LOD max ***********************/

    let elettricalPannel1=new Three.Object3D();
    let objectMinLOD = makeObjectMinLOD(newWidth,newHeight,newDepth);
    elettricalPannel1.add(objectMinLOD.clone());
    elettricalPannel1.rotation.y=Math.PI;
    elettricalPannel1.position.y+= newHeight/2 + newAltitude;

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(elettricalPannel2, 200);
    lod.addLevel(elettricalPannel1, 900);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      let bbox = new Three.BoxHelper(lod, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 1000;
      bbox.material.depthTest = false;
      lod.add(bbox);
    }

    return Promise.resolve(lod);
  }

};

