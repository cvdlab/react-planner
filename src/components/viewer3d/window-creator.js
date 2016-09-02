import Three from 'three';

export function createGlass(width, height, thickness, frame1_width, frame2_height, isSelected) {

  // Create the window
  let objectWindow = new Three.Object3D();
  let glassGeometry = new Three.BoxGeometry(width - frame1_width * 2, height - 2 * frame2_height, thickness);

  let glassColor = new Three.Color(0, 0, 1);
  if (isSelected) {
    glassColor = new Three.Color(1, 0.76, 0);
  }

  let glassMaterial = new Three.MeshPhongMaterial({
    color: glassColor,
    opacity: 0.2,
    transparent: true
  });

  let glass = new Three.Mesh(glassGeometry, glassMaterial);
  objectWindow.add(glass);

  return objectWindow;

}

export function createSingleWindow(width, height, thickness, x, y, z, pixelPerUnit, isSelected) {

  // Creation of the window frame

  let windowColor = new Three.Color(1, 1, 1);
  if (isSelected) {
    windowColor = new Three.Color(1, 0.76, 0);
  }

  let frame1_width = 0.1 * pixelPerUnit; // I assume that the unit is always meters
  let frame2_height = 0.1 * pixelPerUnit;

  var frame1Geom = new Three.BoxGeometry(frame1_width, height, thickness);
  var frame2Geom = new Three.BoxGeometry(width - 2 * frame1_width, frame2_height, thickness);

  var textureFrameImage = './textures/window/frame-window.jpg';

  frame1Geom.computeVertexNormals();

  let textureLoader = new Three.TextureLoader();
  var texture = textureLoader.load(textureFrameImage);
  var frame1Material = new Three.MeshLambertMaterial();
  frame1Material.map = texture;
  frame1Material.color = windowColor;


  var frame1 = new Three.Mesh(frame1Geom, frame1Material);

  var frame2 = new Three.Mesh(frame2Geom, frame1Material);

  var frame3 = new Three.Mesh(frame1Geom, frame1Material);

  var frame4 = new Three.Mesh(frame2Geom, frame1Material);

  //Creation of the window
  var objectWindow = createGlass(width, height, thickness, frame1_width, frame2_height, isSelected);

  var object = new Three.Object3D();

  // I need a pivot for the window
  var pivot = new Three.Object3D();
  object.add(frame1);
  object.add(frame2);
  object.add(frame3);
  object.add(frame4);
  pivot.add(objectWindow);
  object.add(pivot);

  object.position.x = x;
  object.position.y = y;
  object.position.z = z;

  pivot.position.x = -width / 2 + frame1_width;
  pivot.position.z = -thickness / 2;

  frame1.position.x -= width / 2 - frame1_width / 2;
  //frame1.position.y -= 0.01;
  //frame2.position.z += thickness / 2;
  frame2.position.y -= height / 2 - frame2_height / 2;
  frame3.position.x += width / 2 - frame1_width / 2;
  //frame3.position.y -= 0.01;
  //frame4.position.z -= thickness / 2;
  frame4.position.y += height / 2 - frame2_height / 2;

  objectWindow.position.x = width / 2 - frame1_width;
  objectWindow.position.z = thickness / 2;

  return object;
}

