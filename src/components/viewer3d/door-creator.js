import Three from 'three';

export function createDoor(width, height, thickness, x, y, z, pixelPerUnit) {

  let frame1_width = 0.1 * pixelPerUnit;
  let frame2_height = 0.1 * pixelPerUnit;

  /* Definisco il telaio della porta con la relativa texture */

  var frame1Geom = new Three.BoxGeometry(frame1_width, height, thickness);
  var frame2Geom = new Three.BoxGeometry(width - 2 * frame1_width, frame2_height, thickness);

  var textureFrameImage = '/textures/door/frame-door.jpg';

  frame1Geom.computeVertexNormals();

  let textureLoader = new Three.TextureLoader();
  let texture = textureLoader.load(textureFrameImage);
  let frameMaterial = new Three.MeshPhongMaterial();
  frameMaterial.map = texture;


  let frame1 = new Three.Mesh(frame1Geom, frameMaterial);
  let frame2 = new Three.Mesh(frame2Geom, frameMaterial);
  let frame3 = new Three.Mesh(frame1Geom, frameMaterial);


  let doorGeometry = new Three.BoxGeometry(width - frame1_width * 2, height - frame2_height, thickness);


  /* Creation of the central part of the door */
  let imageFile = './textures/door/main-door.JPG';
  let imageFile2 = './textures/door/main-door2.JPG';
  let normal1 = textureLoader.load("./textures/door/main-door-normal.png");
  let normal2 = textureLoader.load("./textures/door/main-door2-normal.png");

  doorGeometry.computeVertexNormals();

  let textureDoor = textureLoader.load(imageFile);
  let doorMaterial1 = new Three.MeshPhongMaterial();
  doorMaterial1.map = textureDoor;
  doorMaterial1.normalMap = normal1;
  doorMaterial1.normalScale.set(3, 3);

  let textureDoor2 = textureLoader.load(imageFile2);
  let doorMaterial2 = new Three.MeshPhongMaterial();
  doorMaterial2.map = textureDoor2;
  doorMaterial2.normalMap = normal2;
  doorMaterial2.normalScale.set(3, 3);

  /* Use a face material for the door (so we can define a back texture) */

  let mats = [];
  mats.push(frameMaterial);
  mats.push(frameMaterial);
  mats.push(frameMaterial);
  mats.push(frameMaterial);
  mats.push(doorMaterial1);
  mats.push(doorMaterial2);

  let faceMaterial = new Three.MeshFaceMaterial(mats);

  let door = new Three.Mesh(doorGeometry, faceMaterial);

  door.geometry.computeFaceNormals();

  let object = new Three.Object3D();
  object.add(frame1);
  object.add(frame2);
  object.add(frame3);
  object.add(door);

  object.position.x = x;
  object.position.y = y;
  object.position.z = z;

  frame1.position.x -= width / 2 - frame1_width / 2;
  //frame2.position.z += thickness / 2;
  frame2.position.y += height/2 - frame2_height/2;
  frame3.position.x += width / 2 - frame1_width / 2;

  return object;


}
