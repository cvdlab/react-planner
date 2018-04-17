import * as Three from 'three';
import React from 'react';

//color
let grey = new Three.MeshLambertMaterial({color: 0xd3d3d3});
let white = new Three.MeshLambertMaterial({color: 0xf5f5f5});
let darkGrey = new Three.MeshLambertMaterial({color: 0x3d3d3d});
let black = new Three.MeshLambertMaterial({color: 0x000000});
let boxMaterials  = [ grey, darkGrey, grey, grey, grey, grey];
let boxMaterials2 = [ grey, grey, grey, grey, grey, darkGrey];
let boxMaterials3 = [ grey, grey, grey, grey, darkGrey, grey];


let textureLoader   = new Three.TextureLoader();
let lcdTexture   = textureLoader.load(require('./monitor.png'));

//dimensions
let width = 258;
let depth = 87;
let height = 195;
let filterWidth = 48;
let filterDepth = 10;
let filterHeight = 52;
let gridThickness = 3;


function makeObjectMaxLOD(){

  let schneider = new Three.Mesh();

  let gridVerticalElemGeometry = new Three.BoxGeometry(gridThickness/2,filterHeight,filterDepth);
  let gridHorizontalElemGeometry = new Three.BoxGeometry(filterWidth,gridThickness,filterDepth);

  let filter = new Three.Object3D();

  for(let i=0.25; i<48; i+=3.32){
    let gridVerticalElem = new Three.Mesh(gridVerticalElemGeometry, white);
    gridVerticalElem.position.x = i;
    gridVerticalElem.position.y = 26;
    filter.add(gridVerticalElem);
  }

  for(let i=0; i<52; i+=7.4){
    let gridHorizontalElem = new Three.Mesh(gridHorizontalElemGeometry, white);
    gridHorizontalElem.position.x = 23.5;
    gridHorizontalElem.position.y = i;
    filter.add(gridHorizontalElem);
  }

  for(let k=0;k<=54;k+=46){
    for(let j=10;j<240;j+=48){
      let filterClone = filter.clone();
      filterClone.position.x+=j;
      filterClone.position.y+=k;
      filterClone.rotation.x-=Math.PI/6;
      if(k===0)
        filterClone.position.z+=18;
      else
        filterClone.position.z-=10;
      schneider.add(filterClone);
    }
  }

  let panelSideElemGeometry = new Three.BoxGeometry(5,height,depth);
  let panelSideElemLeft = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemLeft.rotation.y+=Math.PI;
  schneider.add(panelSideElemLeft);

  let panelSideElemRight = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemRight.position.x+=258;
  schneider.add(panelSideElemRight);

  let panelSideBackElemGeometry = new Three.BoxGeometry(width,height,5);
  let panelSideElemBack = new Three.Mesh(panelSideBackElemGeometry, boxMaterials3);
  panelSideElemBack.position.x+=129;
  panelSideElemBack.position.z-=43.5;
  schneider.add(panelSideElemBack);

  let boxElemGeometry = new Three.BoxGeometry(width/3,height/3,depth/8);
  let boxElem = new Three.Mesh(boxElemGeometry, grey);
  boxElem.position.x+=212;
  boxElem.position.y+=65;
  boxElem.position.z+=35;
  schneider.add(boxElem);

  let panelSideFrontElemGeometry = new Three.BoxGeometry(width/3,height,5);
  let panelSideElemFront_P1 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P1.position.x+=43.5;
  panelSideElemFront_P1.position.z+=43.5;
  schneider.add(panelSideElemFront_P1);

  let panelSideElemFront_P2 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P2.position.x+=130;
  panelSideElemFront_P2.position.z+=43.5;
  schneider.add(panelSideElemFront_P2);

  let panelSideElemFront_P3 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P3.position.x+=217;
  panelSideElemFront_P3.position.z+=43.5;
  schneider.add(panelSideElemFront_P3);

  let planeGeometryFront = new Three.PlaneGeometry(width/16,height/12);
  let planeMaterialFront = new Three.MeshLambertMaterial({map:lcdTexture, transparent:true, overdraw:true});

  let planeGeometryFront1 = new Three.PlaneGeometry(width/8,height/3);
  let panelBase = new Three.Mesh(planeGeometryFront1,darkGrey);
  panelBase.position.set(217,65,46.5);
  schneider.add(panelBase);

  let lcd = new Three.Mesh(planeGeometryFront,planeMaterialFront);
  lcd.position.set(217,60,46.55);
  schneider.add(lcd);

  let panelSideMiddleElemGeometry = new Three.BoxGeometry(width,5,depth);
  let panelSideElemMiddle = new Three.Mesh(panelSideMiddleElemGeometry, grey);
  panelSideElemMiddle.position.x+=129;
  panelSideElemMiddle.position.y-=10;
  schneider.add(panelSideElemMiddle);

  let panelSideElemFooter = new Three.Mesh(panelSideMiddleElemGeometry, black);
  panelSideElemFooter.position.x+=129;
  panelSideElemFooter.position.y-=97.5;
  schneider.add(panelSideElemFooter);

  return schneider
}

function makeObjectMinLOD(){

  let schneider = new Three.Mesh();

  let gridVerticalElemGeometry = new Three.BoxGeometry(gridThickness/2,filterHeight,filterDepth);
  let gridHorizontalElemGeometry = new Three.BoxGeometry(filterWidth,gridThickness,filterDepth);

  let filter = new Three.Object3D();

  for(let i=0.25; i<48; i+=3.32){
    let gridVerticalElem = new Three.Mesh(gridVerticalElemGeometry, white);
    gridVerticalElem.position.x = i;
    gridVerticalElem.position.y = 26;
    filter.add(gridVerticalElem);
  }

  for(let i=0; i<52; i+=7.4){
    let gridHorizontalElem = new Three.Mesh(gridHorizontalElemGeometry, white);
    gridHorizontalElem.position.x = 23.5;
    gridHorizontalElem.position.y = i;
    filter.add(gridHorizontalElem);
  }

  for(let k=0;k<=54;k+=46){
    for(let j=10;j<240;j+=48){
      let filterClone = filter.clone();
      filterClone.position.x+=j;
      filterClone.position.y+=k;
      filterClone.rotation.x-=Math.PI/6;
      if(k===0)
        filterClone.position.z+=18;
      else
        filterClone.position.z-=10;
      schneider.add(filterClone);
    }
  }

  let panelSideElemGeometry = new Three.BoxGeometry(5,height,depth);
  let panelSideElemLeft = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemLeft.rotation.y+=Math.PI;
  schneider.add(panelSideElemLeft);

  let panelSideElemRight = new Three.Mesh(panelSideElemGeometry, boxMaterials);
  panelSideElemRight.position.x+=258;
  schneider.add(panelSideElemRight);

  let panelSideBackElemGeometry = new Three.BoxGeometry(width,height,5);
  let panelSideElemBack = new Three.Mesh(panelSideBackElemGeometry, boxMaterials3);
  panelSideElemBack.position.x+=129;
  panelSideElemBack.position.z-=43.5;
  schneider.add(panelSideElemBack);

  let boxElemGeometry = new Three.BoxGeometry(width/3,height/3,depth/8);
  let boxElem = new Three.Mesh(boxElemGeometry, grey);
  boxElem.position.x+=212;
  boxElem.position.y+=65;
  boxElem.position.z+=35;
  schneider.add(boxElem);

  let panelSideFrontElemGeometry = new Three.BoxGeometry(width/3,height,5);
  let panelSideElemFront_P1 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P1.position.x+=43.5;
  panelSideElemFront_P1.position.z+=43.5;
  schneider.add(panelSideElemFront_P1);

  let panelSideElemFront_P2 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P2.position.x+=130;
  panelSideElemFront_P2.position.z+=43.5;
  schneider.add(panelSideElemFront_P2);

  let panelSideElemFront_P3 = new Three.Mesh(panelSideFrontElemGeometry, boxMaterials2);
  panelSideElemFront_P3.position.x+=217;
  panelSideElemFront_P3.position.z+=43.5;
  schneider.add(panelSideElemFront_P3);

  let planeGeometryFront = new Three.PlaneGeometry(width/16,height/12);
  let planeMaterialFront = new Three.MeshLambertMaterial({map:lcdTexture, transparent:true, overdraw:true});

  let planeGeometryFront1 = new Three.PlaneGeometry(width/8,height/3);
  let panelBase = new Three.Mesh(planeGeometryFront1,darkGrey);
  panelBase.position.set(217,65,46.5);
  schneider.add(panelBase);

  let lcd = new Three.Mesh(planeGeometryFront,planeMaterialFront);
  lcd.position.set(217,60,46.55);
  schneider.add(lcd);

  let panelSideMiddleElemGeometry = new Three.BoxGeometry(width,5,depth);
  let panelSideElemMiddle = new Three.Mesh(panelSideMiddleElemGeometry, grey);
  panelSideElemMiddle.position.x+=129;
  panelSideElemMiddle.position.y-=10;
  schneider.add(panelSideElemMiddle);

  let panelSideElemFooter = new Three.Mesh(panelSideMiddleElemGeometry, black);
  panelSideElemFooter.position.x+=129;
  panelSideElemFooter.position.y-=97.5;
  schneider.add(panelSideElemFooter);

  return schneider
}

export default {
  name: "schneider",
  prototype: "items",

  info: {
    tag: ['metal'],
    title: "schneider",
    description: "schneider",
    image: require('./schneider.png')
  },
  properties: {
    patternColor: {
      label: "pattern colori",
      type: "color",
      defaultValue: "#f5f4f4"
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

    let fillValue = element.selected ? "#99c3fb" : element.properties.get('patternColor');

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }
    return (
      <g transform={`translate(${-width / 2},${-depth / 2})`}>
        <rect key="1" x="0" y="0" width={width} height={depth}
              style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: fillValue}}/>
        <text key="2" x="0" y="0"
              transform={`translate(${width / 2}, ${depth / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.get('name')}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /**************** LOD max ***********************/

    let rackMaxLOD=new Three.Object3D();

    let objectMaxLOD = makeObjectMaxLOD(width,height,depth);
    rackMaxLOD.add(objectMaxLOD.clone());
    rackMaxLOD.rotation.y=Math.PI;
    rackMaxLOD.position.x+= width/2;
    rackMaxLOD.position.y+= height/1.8 + newAltitude;

    /**************** LOD min ***********************/

    let rackMinLOD=new Three.Object3D();
    let objectMinLOD = makeObjectMinLOD(width,height,depth);
    rackMinLOD.add(objectMinLOD.clone());
    rackMinLOD.rotation.y=Math.PI;
    rackMinLOD.position.x+= width/2;
    rackMinLOD.position.y+= height/1.8 + newAltitude;

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(rackMaxLOD, 100);
    lod.addLevel(rackMinLOD, 1800);
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
