import * as Three from 'three';
import React from 'react';

const cubeMaterial  = new Three.MeshLambertMaterial({color: 0x3d3d3d});
let textureLoader   = new Three.TextureLoader();
let frontTexture1   = textureLoader.load(require('./rackfront.png'));
let frontTexture2   = textureLoader.load(require('./rackfront2.png'));
let backTexture1    = textureLoader.load(require('./rackback.png'));
let backTexture2    = textureLoader.load(require('./rackback2.png'));


function makeTextSprite( message, parameters )
{

  if ( parameters === undefined ) parameters = {};

  let fontFace = parameters.hasOwnProperty("fontFace") ? parameters["fontFace"] : "Arial";
  let fontSize = parameters.hasOwnProperty("fontSize") ? parameters["fontSize"] : 18;
  let borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
  let borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:255, b:0, a:1.0 };
  let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
  let textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', 1024);
  canvas.setAttribute('height', 1024);
  let context = canvas.getContext('2d');
  context.font = "Bold " + fontSize + "px " + fontFace;

  let lines = [],
      line = '',
      rows = message.split('  '),
      currentY = 0,
      maxWidth = -99999999999;

      // console.log("rows num",rows.length);

  for (let i = 0, rowsNum = rows.length; i < rowsNum; i++) {

    // console.log(rows[i],"current width",context.measureText(rows[i]).width ,"max width",maxWidth);

      if(maxWidth < context.measureText(rows[i]).width)
        maxWidth = context.measureText(rows[i]).width;

      console.log(lines.length,fontSize,lines.length * fontSize + fontSize);
      currentY = lines.length * fontSize + 1.4 * fontSize;

      // Record and reset the current line
      lines.push({ text: line, height: currentY });
      line = rows[i] + ' ';

  }

  // background color
  context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                              + backgroundColor.b + "," + backgroundColor.a + ")";
  // border color
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                + borderColor.b + "," + borderColor.a + ")";
  context.lineWidth = borderThickness;

  roundRect(context, borderThickness/2, borderThickness/2,(maxWidth + 4 * borderThickness), rows.length * fontSize , 8);

  for (let j = 1; j < lines.length; j++) {
    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";
    context.fillText(lines[j].text, borderThickness + 5, lines[j].height - 4.5 * borderThickness, maxWidth*fontSize);
    console.log(lines[j].text, borderThickness + 5, lines[j].height, maxWidth*fontSize);
    // console.log(lines[j].text)
  }

  let texture = new Three.Texture(canvas);
  texture.needsUpdate = true;

  let spriteMaterial = new Three.SpriteMaterial( { map: texture } );
  let sprite = new Three.Sprite( spriteMaterial );
  sprite.scale.set(15 * fontSize, 12.5 * fontSize, 17.5 * fontSize);

  return {sprite,maxWidth};
}


function roundRect(ctx, x, y, w, h, r)
  {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

function makeObjectMaxLOD(newWidth,newHeight,newDepth){

  let rack = new Three.Mesh();

  let frontTexture, backTexture;

  if((Math.floor(Math.random()*10)+1) % 2 === 0) {
    backTexture  = backTexture1;
    frontTexture = frontTexture1;
  }
  else {
    backTexture = backTexture2;
    frontTexture= frontTexture2;
  }

  //base
  let cubeGeometryBase = new Three.BoxGeometry(newWidth,newHeight,newDepth);

  let p1 = new Three.Mesh(cubeGeometryBase,cubeMaterial);
  p1.position.set(0,1,0);
  rack.add(p1);

  let planeGeometryFront = new Three.PlaneGeometry(newWidth,newHeight);
  let planeMaterialFront = new Three.MeshLambertMaterial({map:frontTexture});

  let front = new Three.Mesh(planeGeometryFront,planeMaterialFront);
  front.position.set(0,1,newDepth/1.95);
  rack.add(front);

  let planeGeometryBack = new Three.PlaneGeometry(newWidth,newHeight);
  let planeMaterialBack = new Three.MeshLambertMaterial({map:backTexture});

  let back = new Three.Mesh(planeGeometryBack,planeMaterialBack);
  back.position.set(0,1,-newDepth/1.95);
  back.rotation.y+=Math.PI;
  rack.add(back);

  return rack
}

function makeObjectMinLOD(newWidth,newHeight,newDepth){

  let rack = new Three.Mesh();

  //base
  let cubeGeometryBase = new Three.BoxGeometry(newWidth,newHeight,newDepth);

  let p1 = new Three.Mesh(cubeGeometryBase,cubeMaterial);
  p1.position.set(0,1,0);
  rack.add(p1);

  return rack
}

export default {
  name: "rack_server",
  prototype: "items",

  info: {
    tag: ['arredamento', 'metal'],
    group: "Items",
    title: "rack server",
    description: "rack server",
    image: require('./rack.png')
  },
  properties: {
    patternColor: {
      label: "pattern colori",
      type: "color",
      defaultValue: "#f5f4f4"
    },
    width: {
      label: "larghezza",
      type: "length-measure",
      defaultValue: {
        length: 105,
        unit: 'cm'
      }
    },
    depth: {
      label: "profondità",
      type: "length-measure",
      defaultValue: {
        length: 50,
        unit: 'cm'
      }
    },
    height: {
      label: "altezza",
      type: "length-measure",
      defaultValue: {
        length: 210,
        unit: 'cm'
      }
    },
    altitude: {
      label: "quota",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    },
    cluster: {
      label: "cluster",
      type: "number",
      defaultValue: -1
    },
    check: {
      label: "check",
      type: "number",
      defaultValue: 0
    }
  },

  render2D: function (element, layer, scene) {

    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let fillValue = element.selected ? "#99c3fb" : element.properties.get('patternColor');

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }
    return (
      <g transform={`translate(${-newWidth / 2},${-newDepth / 2})`}>
      <rect key="1" x="0" y="0" width={newWidth} height={newDepth}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: fillValue}}/>
        <text key="2" x="0" y="0"
              transform={`translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1) rotate(${textRotation})`}
          style={{textAnchor: "middle", fontSize: "11px"}}>
          {element.get('name')}
          </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let x = element.x;
    let y = element.y;
    let name = element.get('name');
    let newWidth = element.properties.get('width').get('length');
    let newDepth = element.properties.get('depth').get('length');
    let newHeight = element.properties.get('height').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    let message = "meta data"            + "  " +
                  "name: "               + name + "  " +
                  "position(x,y,z): ("   + x + ", " + y + ", " + newAltitude + ")  "+
                  "dimension(w,d,h): ("  + newWidth + ", " + newDepth + ", " + newHeight + ")  ";

    let parameters = { fontSize: 16, fontFace: "TimesNewRoman", borderColor: {r:0, g:0, b:255, a:1.0} };


    /**************** LOD max ***********************/

    let rackMaxLOD=new Three.Object3D();

    let objectMaxLOD = makeObjectMaxLOD(newWidth,newHeight,newDepth);
    rackMaxLOD.add(objectMaxLOD.clone());
    rackMaxLOD.rotation.y=Math.PI;
    rackMaxLOD.position.y+= newHeight/2 + newAltitude;

    /**************** LOD min ***********************/

    let rackMinLOD=new Three.Object3D();
    let objectMinLOD = makeObjectMinLOD(newWidth,newHeight,newDepth);
    rackMinLOD.add(objectMinLOD.clone());
    rackMinLOD.rotation.y=Math.PI;
    rackMinLOD.position.y+= newHeight/2 + newAltitude;

    /*** add all Level of Detail ***/

    let lod = new Three.LOD();

    lod.addLevel(rackMaxLOD, 100);
    lod.addLevel(rackMinLOD, 1800);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    if (element.selected) {
      let object = makeTextSprite(message,parameters);
      let sprite = object.sprite;
      console.log(object.maxWidth);
      sprite.position.set(-newWidth/1.5,100,-1.5*newDepth);
      lod.add(sprite);
      let boundingBox = new Three.BoxHelper(lod, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      lod.add(boundingBox);
    }

    return Promise.resolve(lod);
  }
};
