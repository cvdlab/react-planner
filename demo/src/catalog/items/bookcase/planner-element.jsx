import * as Three from 'three';
import React from 'react';

const WIDTH = 80;
const DEPTH = 80;
const HEIGHT = 200;

const textureLoader = new Three.TextureLoader();
const woodMaterial=textureLoader.load(require('./wood.jpg'));
const bookTexture1=textureLoader.load(require('./bookTexture1.jpg' ));
const bookTexture2=textureLoader.load(require('./bookTexture2.jpg' ));
const bookTexture3=textureLoader.load(require('./bookTexture3.jpg' ));

const objectMaxLOD = makeObjectMaxLOD();
const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let bookcase = new Three.Mesh();

  //Bookcase
  let backGeometry = new Three.BoxGeometry(0.03,2,0.8);
  let wood = new Three.MeshPhongMaterial({map:woodMaterial});
  let backside = new Three.Mesh(backGeometry,wood);
  backside.position.set(0,1,0);
  bookcase.add(backside);

  let sideGeometry = new Three.BoxGeometry(0.3,2,0.03);
  let side1 = new Three.Mesh(sideGeometry,wood);
  side1.position.set(0.15,1,0.4);
  bookcase.add(side1);

  let side2 = new Three.Mesh(sideGeometry,wood);
  side2.position.set(0.15,1,-0.4);
  bookcase.add(side2);

  let bottomGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
  let bottomPanel = new Three.Mesh(bottomGeometry,wood);
  bottomPanel.position.set(0.15,2,0);
  bookcase.add(bottomPanel);

  let topGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
  let topPanel = new Three.Mesh(topGeometry,wood);
  topPanel.position.set(0.15,0.015,0);
  bookcase.add(topPanel);

  //shelves
  for(let i=1;i<5;i++){
    let shelveGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
    let shelve = new Three.Mesh(shelveGeometry,wood);
    shelve.position.set(0.15,0.015+i*0.4,0);
    bookcase.add(shelve);
  }

  function choiceTexture() {

    return (Math.floor(Math.random() * 3))

  }

  //book
  let bookGeometry = new Three.BoxGeometry(0.24,0.32,0.76);

  let bookMaterial =
    [ new Three.MeshLambertMaterial({map:bookTexture1}),
      new Three.MeshLambertMaterial({map:bookTexture2}),
      new Three.MeshLambertMaterial({map:bookTexture3})];

  let book1 = new Three.Mesh(bookGeometry,bookMaterial[choiceTexture()]);
  book1.position.set(0.15,0.59,0);
  bookcase.add(book1);

  let book2 = new Three.Mesh(bookGeometry,bookMaterial[choiceTexture()]);
  book2.position.set(0.15,0.99,0);
  bookcase.add(book2);

  let book3 = new Three.Mesh(bookGeometry,bookMaterial[choiceTexture()]);
  book3.position.set(0.15,0.19,0);
  bookcase.add(book3);

  let book4 = new Three.Mesh(bookGeometry,bookMaterial[choiceTexture()]);
  book4.position.set(0.15,1.39,0);
  bookcase.add(book4);

  let book5 = new Three.Mesh(bookGeometry,bookMaterial[choiceTexture()]);
  book5.position.set(0.15,1.79,0);
  bookcase.add(book5);

  return bookcase
}

function  makeObjectMinLOD() {

  let bookcase = new Three.Mesh();

  let textureLoader = new Three.TextureLoader();

  let woodMaterial=textureLoader.load(require('./wood.jpg'));

  //Bookcase
  let backGeometry = new Three.BoxGeometry(0.03,2,0.8);
  let wood = new Three.MeshPhongMaterial({map:woodMaterial});
  let backside = new Three.Mesh(backGeometry,wood);
  backside.position.set(0,1,0);
  bookcase.add(backside);

  let sideGeometry = new Three.BoxGeometry(0.3,2,0.03);
  let side1 = new Three.Mesh(sideGeometry,wood);
  side1.position.set(0.15,1,0.4);
  bookcase.add(side1);

  let side2 = new Three.Mesh(sideGeometry,wood);
  side2.position.set(0.15,1,-0.4);
  bookcase.add(side2);

  let bottomGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
  let bottomPanel = new Three.Mesh(bottomGeometry,wood);
  bottomPanel.position.set(0.15,2,0);
  bookcase.add(bottomPanel);

  let topGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
  let topPanel = new Three.Mesh(topGeometry,wood);
  topPanel.position.set(0.15,0.015,0);
  bookcase.add(topPanel);

  //shelves
  for(let i=1;i<5;i++){
    let shelveGeometry = new Three.BoxGeometry(0.3,0.03,0.8);
    let shelve = new Three.Mesh(shelveGeometry,wood);
    shelve.position.set(0.15,0.015+i*0.4,0);
    bookcase.add(shelve);
  }

  return bookcase

}

export default {
  name: 'bookcase',
  prototype: 'items',

  info: {
    tag: ['furnishings', 'wood'],
    title: 'bookcase',
    description: 'bookcase',
    image: require('./bookcase.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
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

    let rect_style = {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: '2px', fill: '#84e1ce'};


    return (
      <g transform={ `translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect key='1' x='0' y='0' width={WIDTH} height= {DEPTH} style={rect_style}/>
        <text key='2' x='0' y='0'
              transform={ `translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
          style={{textAnchor: 'middle', fontSize: '11px'}}>
        {element.type}</text>
      </g>
    )
  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /**************** lod max ******************/

    let bookcaseMaxLOD=new Three.Object3D();
    bookcaseMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(bookcaseMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    bookcaseMaxLOD.rotation.y+=Math.PI/2;
    bookcaseMaxLOD.position.y+= newAltitude;
    bookcaseMaxLOD.position.z+= WIDTH/2;
    bookcaseMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** lod min ******************/

    let bookcaseMinLOD=new Three.Object3D();
    bookcaseMinLOD.add(objectMinLOD.clone());
    bookcaseMinLOD.rotation.y+=Math.PI/2;
    bookcaseMinLOD.position.y+= newAltitude;
    bookcaseMinLOD.position.z+= WIDTH/2;
    bookcaseMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**** all level of detail ***/

    let lod = new Three.LOD();

    lod.addLevel(bookcaseMaxLOD, 200);
    lod.addLevel(bookcaseMinLOD, 900);
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


