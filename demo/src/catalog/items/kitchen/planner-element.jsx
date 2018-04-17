import * as Three from 'three';
import React from 'react';

const WIDTH =  80;
const DEPTH =  100;
const HEIGHT = 80;

let textureLoader = new Three.TextureLoader();
let steel = textureLoader.load(require('./steel.jpg'));
let darkSteel = textureLoader.load(require('./darksteel.jpg'));
let logo = textureLoader.load(require('./logo.jpg'));
let steelTexture =  new Three.MeshLambertMaterial({map:steel});
let darkSteelTexture =  new Three.MeshLambertMaterial({map:darkSteel});
let logoTexture =  new Three.MeshLambertMaterial({map:logo});

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let kitchen = new Three.Mesh();

  //base
  let body = new Three.Mesh(new Three.BoxGeometry(1,0.05,1.5), steelTexture);
  body.position.set(0,0.15,0);
  kitchen.add(body);

  //foot
  for(let gx=-0.45;gx<=0.45;gx+=0.9){
    for(let gz=-0.7125;gz<=0.7125;gz+=1.425){
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steelTexture)
      foot.position.set(gx,-0.05,gz);
      foot.rotation.y=0.25*Math.PI;
      body.add(foot)
    }
  }

  //back
  let back = new Three.Mesh(new Three.BoxGeometry(0.05,1,1.5), steelTexture);
  back.position.set(0.475,0.525,0);
  body.add(back);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1,1,0.05), steelTexture);
  side1.position.set(0,0.525,0.725);
  body.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1,1,0.05), steelTexture);
  side2.position.set(0,0.525,-0.725);
  body.add(side2);

  //top
  let top = new Three.Mesh(new Three.BoxGeometry(1,0.20,1.5), steelTexture);
  top.position.set(0,1.1,0);
  body.add(top);

  //logo
  let logo = new Three.Mesh(new Three.PlaneGeometry(0.1,0.05),logoTexture);
  logo.position.set(-0.51,1.13,0);
  logo.rotation.y=-0.5*Math.PI;
  body.add(logo);

  //front
  let front = new Three.Mesh(new Three.BoxGeometry(0.05,0.99,1.4), steelTexture);
  front.position.set(-0.47,0.525,0);
  body.add(front);

  //oven
  let oven = new Three.Mesh(new Three.BoxGeometry(0.05,0.9,1.3), steelTexture);
  oven.position.set(-0.53,0.525,0);
  body.add(oven);

  //handle
  let handle1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,1),darkSteelTexture);
  handle1.position.set(-0.6,0.85,0);
  handle1.rotation.x=0.5*Math.PI;
  body.add(handle1);

  let handle2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),darkSteelTexture);
  handle2.position.set(-0.56,0.85,-0.4);
  handle2.rotation.z=0.5*Math.PI;
  body.add(handle2);

  let handle3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),darkSteelTexture);
  handle3.position.set(-0.56,0.85,0.4);
  handle3.rotation.z=0.5*Math.PI;
  body.add(handle3);

  //knob
  for(let gz=-0.6;gz<=0.65;gz+=0.3){
    let knob = new Three.Mesh(new Three.CylinderGeometry(0.03, 0.03, 0.02, 32), darkSteelTexture);
    knob.position.set(-0.51,1.05,gz);
    knob.rotation.z=0.5*Math.PI;
    body.add(knob);

    let knob_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.03, 0.01), darkSteelTexture);
    knob_p2.position.set(0,0.02,0);
    knob.add(knob_p2)
  }

  //fire
  for(let gx=-0.22;gx<=0.22;gx+=0.44){
    for(let gz=-0.45;gz<=0.45;gz+=0.9){
      let fire = new Three.Mesh(new Three.CylinderGeometry(0.08, 0.1, 0.02, 32), darkSteelTexture)
      fire.position.set(gx,1.21,gz);
      body.add(fire)
    }
  }

  //central fire
  let centralFire = new Three.Mesh(new Three.CylinderGeometry(0.1, 0.12, 0.02, 32), darkSteelTexture);
  centralFire.position.set(0,1.21,0);
  body.add(centralFire);


  //long side grid
  for(let gx=-0.45;gx<=0.45;gx+=0.45){
    if(gx!==0)
    {
      let longSideGrid = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 1.38), darkSteelTexture);
      longSideGrid.position.set(gx,1.21,0);
      body.add(longSideGrid)
    }
    else
    {
      for(let gz=-0.46;gz<=0.68;gz+=0.90){
        let longSideGrid2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 0.46), darkSteelTexture);
        longSideGrid2.position.set(gx,1.21,gz);
        body.add(longSideGrid2)
      }
    }
  }

  //short side grid
  for(let gz=-0.675;gz<=0.675;gz+=0.45){

    let shortSideGrid = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.03), darkSteelTexture);
    shortSideGrid.position.set(0,1.21,gz);
    body.add(shortSideGrid)

  }

  //long side grid central
  for(let gx=-0.22;gx<=0.22;gx+=0.44){
    for(let gz=-0.59;gz<=0.68;gz+=0.90){
      let lsgc1 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc1.position.set(gx,1.24,gz);
      body.add(lsgc1)
    }
    for(let gz=0.59;gz>=-0.68;gz-=0.90){
      let lsgc2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc2.position.set(gx,1.24,gz);
      body.add(lsgc2)
    }
  }

  //short side grid central
  for(let gx=-0.365;gx<=0.345;gx+=0.7){
    for(let gz=-0.45;gz<=0.45;gz+=0.45){
      if(gz!==0)
      {
        let ssgc1 = new Three.Mesh(new Three.BoxGeometry(0.2, 0.02, 0.03),darkSteelTexture);
        if(gx<0)
          ssgc1.position.set(gx,1.24,gz);
        else
          ssgc1.position.set(gx+0.03,1.24,gz);
        body.add(ssgc1)
      }
      else
      {
        let ssgc2 = new Three.Mesh(new Three.BoxGeometry(0.4, 0.02, 0.03),darkSteelTexture);
        if(gx<0)
          ssgc2.position.set(gx+0.1,1.24,gz);
        else
          ssgc2.position.set(gx-0.07,1.24,gz);
        body.add(ssgc2)
      }
    }
  }

  //long side grid inside
  for(let gz=-0.45;gz<=0.45;gz+=0.9){
    let lsgi = new Three.Mesh(new Three.BoxGeometry(0.35, 0.02, 0.03),darkSteelTexture);
    lsgi.position.set(0,1.24,gz);
    body.add(lsgi)
  }

  //central peace
  for(let gz=-0.14;gz<=0.14;gz+=0.28)
  {
    let cp = new Three.Mesh(new Three.BoxGeometry(0.03, 0.02, 0.2),darkSteelTexture);
    cp.position.set(0,1.25,gz);
    body.add(cp)
  }

  return kitchen
}

function makeObjectMinLOD() {

  let kitchen = new Three.Mesh();

  //base
  let body = new Three.Mesh(new Three.BoxGeometry(1,0.05,1.5), steelTexture);
  body.position.set(0,0.15,0);
  kitchen.add(body);

  //foot
  for(let gx=-0.45;gx<=0.45;gx+=0.9){
    for(let gz=-0.7125;gz<=0.7125;gz+=1.425){
      let foot = new Three.Mesh(new Three.CylinderGeometry(0.05, 0.05, 0.05, 4), steelTexture)
      foot.position.set(gx,-0.05,gz);
      foot.rotation.y=0.25*Math.PI;
      body.add(foot)
    }
  }

  //back
  let back = new Three.Mesh(new Three.BoxGeometry(0.05,1,1.5), steelTexture);
  back.position.set(0.475,0.525,0);
  body.add(back);

  //side
  let side1 = new Three.Mesh(new Three.BoxGeometry(1,1,0.05), steelTexture);
  side1.position.set(0,0.525,0.725);
  body.add(side1);

  let side2 = new Three.Mesh(new Three.BoxGeometry(1,1,0.05), steelTexture);
  side2.position.set(0,0.525,-0.725);
  body.add(side2);

  //top
  let top = new Three.Mesh(new Three.BoxGeometry(1,0.20,1.5), steelTexture);
  top.position.set(0,1.1,0);
  body.add(top);

  //logo
  let logo = new Three.Mesh(new Three.PlaneGeometry(0.1,0.05),logoTexture);
  logo.position.set(-0.51,1.13,0);
  logo.rotation.y=-0.5*Math.PI;
  body.add(logo);

  //front
  let front = new Three.Mesh(new Three.BoxGeometry(0.05,0.99,1.4), steelTexture);
  front.position.set(-0.47,0.525,0);
  body.add(front);

  //oven
  let oven = new Three.Mesh(new Three.BoxGeometry(0.05,0.9,1.3), steelTexture);
  oven.position.set(-0.53,0.525,0);
  body.add(oven);

  //handle
  let handle1 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,1),darkSteelTexture);
  handle1.position.set(-0.6,0.85,0);
  handle1.rotation.x=0.5*Math.PI;
  body.add(handle1);

  let handle2 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),darkSteelTexture);
  handle2.position.set(-0.56,0.85,-0.4);
  handle2.rotation.z=0.5*Math.PI;
  body.add(handle2);

  let handle3 = new Three.Mesh(new Three.CylinderGeometry(0.02,0.02,0.06),darkSteelTexture);
  handle3.position.set(-0.56,0.85,0.4);
  handle3.rotation.z=0.5*Math.PI;
  body.add(handle3);

  //knob
  for(let gz=-0.6;gz<=0.65;gz+=0.3){
    let knob = new Three.Mesh(new Three.CylinderGeometry(0.03, 0.03, 0.02, 32), darkSteelTexture);
    knob.position.set(-0.51,1.05,gz);
    knob.rotation.z=0.5*Math.PI;
    body.add(knob);

    let knob_p2 = new Three.Mesh(new Three.BoxGeometry(0.05, 0.03, 0.01), darkSteelTexture);
    knob_p2.position.set(0,0.02,0);
    knob.add(knob_p2)
  }

  //fire
  for(let gx=-0.22;gx<=0.22;gx+=0.44){
    for(let gz=-0.45;gz<=0.45;gz+=0.9){
      let fire = new Three.Mesh(new Three.CylinderGeometry(0.08, 0.1, 0.02, 32), darkSteelTexture)
      fire.position.set(gx,1.21,gz);
      body.add(fire)
    }
  }

  //central fire
  let centralFire = new Three.Mesh(new Three.CylinderGeometry(0.1, 0.12, 0.02, 32), darkSteelTexture);
  centralFire.position.set(0,1.21,0);
  body.add(centralFire);


  //long side grid
  for(let gx=-0.45;gx<=0.45;gx+=0.45){
    if(gx!==0)
    {
      let longSideGrid = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 1.38), darkSteelTexture);
      longSideGrid.position.set(gx,1.21,0);
      body.add(longSideGrid)
    }
    else
    {
      for(let gz=-0.46;gz<=0.68;gz+=0.90){
        let longSideGrid2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.05, 0.46), darkSteelTexture);
        longSideGrid2.position.set(gx,1.21,gz);
        body.add(longSideGrid2)
      }
    }
  }

  //short side grid
  for(let gz=-0.675;gz<=0.675;gz+=0.45){

    let shortSideGrid = new Three.Mesh(new Three.BoxGeometry(0.9, 0.05, 0.03), darkSteelTexture);
    shortSideGrid.position.set(0,1.21,gz);
    body.add(shortSideGrid)

  }

  //long side grid central
  for(let gx=-0.22;gx<=0.22;gx+=0.44){
    for(let gz=-0.59;gz<=0.68;gz+=0.90){
      let lsgc1 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc1.position.set(gx,1.24,gz);
      body.add(lsgc1)
    }
    for(let gz=0.59;gz>=-0.68;gz-=0.90){
      let lsgc2 = new Three.Mesh(new Three.BoxGeometry(0.03, 0.01, 0.2), darkSteelTexture);
      lsgc2.position.set(gx,1.24,gz);
      body.add(lsgc2)
    }
  }

  //short side grid central
  for(let gx=-0.365;gx<=0.345;gx+=0.7){
    for(let gz=-0.45;gz<=0.45;gz+=0.45){
      if(gz!==0)
      {
        let ssgc1 = new Three.Mesh(new Three.BoxGeometry(0.2, 0.02, 0.03),darkSteelTexture);
        if(gx<0)
          ssgc1.position.set(gx,1.24,gz);
        else
          ssgc1.position.set(gx+0.03,1.24,gz);
        body.add(ssgc1)
      }
      else
      {
        let ssgc2 = new Three.Mesh(new Three.BoxGeometry(0.4, 0.02, 0.03),darkSteelTexture);
        if(gx<0)
          ssgc2.position.set(gx+0.1,1.24,gz);
        else
          ssgc2.position.set(gx-0.07,1.24,gz);
        body.add(ssgc2)
      }
    }
  }

  //long side grid inside
  for(let gz=-0.45;gz<=0.45;gz+=0.9){
    let lsgi = new Three.Mesh(new Three.BoxGeometry(0.35, 0.02, 0.03),darkSteelTexture);
    lsgi.position.set(0,1.24,gz);
    body.add(lsgi)
  }

  //central peace
  for(let gz=-0.14;gz<=0.14;gz+=0.28)
  {
    let cp = new Three.Mesh(new Three.BoxGeometry(0.03, 0.02, 0.2),darkSteelTexture);
    cp.position.set(0,1.25,gz);
    body.add(cp)
  }

  return kitchen
}

export default {
  name: "kitchen",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "kitchen",
    description: "kitchen",
    image: require('./kitchen.png')
  },

  properties: {
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

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
      <rect  key="1" x="0" y="0" width={WIDTH} height={DEPTH}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
      <text key="2" x="0" y="0"
            transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})` }
        style={ {textAnchor: "middle", fontSize: "11px"}}>
            {element.type}
            </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /************ lod max ****************/

    let kitchenMaxLOD=new Three.Object3D();
    kitchenMaxLOD.add(objectMaxLOD.clone());

    let valuePosition = new Three.Box3().setFromObject(kitchenMaxLOD);

    let deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    let deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    let deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    kitchenMaxLOD.position.y+=newAltitude;
    kitchenMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);


    /************ lod min ****************/

    let kitchenMinLOD=new Three.Object3D();
    kitchenMinLOD.add(objectMinLOD.clone());
    kitchenMinLOD.position.y+=newAltitude;
    kitchenMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(kitchenMaxLOD, 200);
    lod.addLevel(kitchenMinLOD, 900);
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
