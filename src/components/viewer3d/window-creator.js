import Three from 'three';

// export function createDoubleWindow(width, height, thickness, x, y, z) {
//   /* Questa funzione crea una finestra doppia */
//
//   // Dimensioni delle cornici della finestra
//   var frame1_width = 0.1;
//   var frame2_thickness = 0.1;
//
//   /* Costruisco le divisioni sulla finestra */
//   var frame1Geom = new THREE.BoxGeometry(frame1_width, height, thickness);
//   var frame2Geom = new THREE.BoxGeometry(2 * width - 2 * frame2_thickness, height, frame2_thickness);
//
//   var textureFrameImage = 'images/textures/house/frameDoor.jpg';
//
//   frame1Geom.computeVertexNormals();
//
//   var texture = THREE.ImageUtils.loadTexture(textureFrameImage);
//   var frame1Material = new THREE.MeshLambertMaterial();
//   frame1Material.map = texture;
//
//
//   var frame1 = new THREE.Mesh(frame1Geom, frame1Material);
//
//   var frame2 = new THREE.Mesh(frame2Geom, frame1Material);
//
//   var frame3 = new THREE.Mesh(frame1Geom, frame1Material);
//
//   var frame4 = new THREE.Mesh(frame2Geom, frame1Material);
//
//   frame1.castShadow = true;
//   frame1.receiveShadow = true;
//
//   frame2.castShadow = true;
//   frame2.receiveShadow = true;
//
//   frame3.castShadow = true;
//   frame3.receiveShadow = true;
//
//   frame4.castShadow = true;
//   frame4.receiveShadow = true;
//
//   /* Costruisco metà finestra */
//   var objectWindow = createGlass(width, height, thickness, frame1_width, frame2_thickness, true);
//
//   /* Aggiungo la seconda meta */
//   var objectWindow2 = createGlass(width, height, thickness, frame1_width, frame2_thickness, false);
//
//   var object = new THREE.Object3D();
//   /* Creo un perno intorno al quale la porta può girare */
//   var pivot = new THREE.Object3D();
//   var pivot2 = new THREE.Object3D();
//   //pivot2.rotation.y = Math.PI;
//   object.add(frame1);
//   object.add(frame2);
//   object.add(frame3);
//   object.add(frame4);
//   pivot.add(objectWindow);
//   object.add(pivot);
//   pivot2.add(objectWindow2);
//   object.add(pivot2);
//
//   object.position.x = x;
//   object.position.y = y;
//   object.position.z = z;
//
//   pivot.position.x = -width / 2 + frame1_width;
//   pivot.position.z = -thickness / 2 + frame2_thickness / 2;
//
//   pivot2.position.x = 1.5 * width - 2 * frame1_width;
//   pivot2.position.z = -thickness / 2 + frame2_thickness / 2;
//
//   frame1.position.x -= width / 2 - frame1_width / 2;
//   frame1.position.y -= 0.01;
//   frame2.position.x += width / 2 - frame1_width;
//   frame2.position.z += thickness / 2 - frame2_thickness / 2;
//   frame2.position.y -= 0.01;
//   frame3.position.x += 1.5 * width - 1.5 * frame1_width;
//   frame3.position.y -= 0.01;
//   frame4.position.x += width / 2 - frame1_width;
//   frame4.position.z -= thickness / 2 - frame2_thickness / 2;
//   frame4.position.y -= 0.01;
//
//   objectWindow.position.x = width / 2 - frame1_width;
//   objectWindow.position.z = thickness / 2 - frame2_thickness / 2;
//
//   objectWindow2.position.x = -width / 2 + frame1_width;
//   objectWindow2.position.z = thickness / 2 - frame2_thickness / 2;
//
//   /* Aggiungo una funzione per aprire e chiudere la finestra */
//
//   object.isOpen = false; // Stato della finestra
//
//   interactFunction = function () {
//     if (object.isOpen) {
//       object.isOpen = false;
//
//       /* Giro la maniglia */
//       var holderRotate = new TWEEN.Tween(objectWindow.pivot.rotation)
//         .to({y: 0}, 500)
//         .easing(TWEEN.Easing.Linear.None);
//
//       /* Chiudo la finestra */
//
//       var window1CloseTween = new TWEEN.Tween(pivot.rotation)
//         .to({z: 0}, 2000)
//         .easing(TWEEN.Easing.Linear.None)
//         .chain(holderRotate);
//
//
//       var window2CloseTween = new TWEEN.Tween(pivot2.rotation)
//         .to({z: 0}, 2000)
//         .easing(TWEEN.Easing.Linear.None)
//         .chain(window1CloseTween)
//         .start();
//     } else {
//
//       /* Apro la finestra */
//       object.isOpen = true;
//       var window2OpenTween = new TWEEN.Tween(pivot2.rotation)
//         .to({z: -Math.PI / 2}, 2000)
//         .easing(TWEEN.Easing.Linear.None);
//
//       var window1OpenTween = new TWEEN.Tween(pivot.rotation)
//         .to({z: Math.PI / 2}, 2000)
//         .easing(TWEEN.Easing.Linear.None)
//         .chain(window2OpenTween);
//
//       /* Giro la maniglia */
//       var holderRotate = new TWEEN.Tween(objectWindow.pivot.rotation)
//         .to({y: Math.PI / 2}, 500)
//         .easing(TWEEN.Easing.Linear.None)
//         .chain(window1OpenTween)
//         .start();
//     }
//   }
//
//   applyInteract(object, interactFunction);
//
//   return object;
//
// }

export function createGlass(width, height, thickness, frame1_width, frame2_height, includeHolder) {


  // Create the material for the frame
  // let textureFrameImage = './textures/fwindow/frame-door.jpg';
  // let textureLoader = new Three.TextureLoader();
  //
  // let texture = textureLoader.load(textureFrameImage);
  // let frame1Material = new Three.MeshLambertMaterial();
  // frame1Material.map = texture;

  // Create the window
  let objectWindow = new Three.Object3D();
  let glassGeometry = new Three.BoxGeometry(width - frame1_width * 2, height - 2 * frame2_height, thickness);

  let glassMaterial = new Three.MeshPhongMaterial({
    color: 0x0000FF,
    opacity: 0.2,
    transparent: true
  });

  let glass = new Three.Mesh(glassGeometry, glassMaterial);
  // glass.castShadow = true;
  // glass.receiveShadow = true;

  /* Adesso creo le divisioni del vetro */
  // var windowFrame1Geom = new THREE.BoxGeometry(width - 2 * frame1_width, height / 2 + 0.02, frame2_thickness / 2);
  // windowFrame1 = new THREE.Mesh(windowFrame1Geom, frame1Material);
  // var windowFrame2Geom = new THREE.BoxGeometry(frame1_width / 2, height / 2 + 0.02, thickness - 2 * frame2_thickness);
  // var windowFrame7Geom = new THREE.BoxGeometry(frame1_width, height / 2 + 0.02, thickness - 2 * frame2_thickness);
  // windowFrame2 = new THREE.Mesh(windowFrame2Geom, frame1Material);
  // windowFrame3 = new THREE.Mesh(windowFrame1Geom, frame1Material);
  // windowFrame4 = new THREE.Mesh(windowFrame1Geom, frame1Material);
  // windowFrame5 = new THREE.Mesh(windowFrame1Geom, frame1Material);
  // windowFrame6 = new THREE.Mesh(windowFrame1Geom, frame1Material);
  // windowFrame7 = new THREE.Mesh(windowFrame7Geom, frame1Material);
  // windowFrame8 = new THREE.Mesh(windowFrame7Geom, frame1Material);
  //
  // windowFrame3.position.z -= (thickness - 5 * frame2_thickness / 2) / 2;
  // windowFrame4.position.z += (thickness - 5 * frame2_thickness / 2) / 2;
  // windowFrame5.position.z -= (thickness - 2 * frame2_thickness) / 4;
  // windowFrame6.position.z += (thickness - 2 * frame2_thickness) / 4;
  // windowFrame7.position.x -= (width - frame1_width * 2) / 2;
  // windowFrame8.position.x += (width - frame1_width * 2) / 2;
  //
  // if (includeHolder) {
  //
  //   /* Ora disegno la maniglia */
  //   var holderGeometry1 = new THREE.BoxGeometry(.03, .01, .06);
  //   var holderGeometry2 = new THREE.BoxGeometry(.03, .025, .16);
  //   var holderBaseGeometry = new THREE.BoxGeometry(.065, .005, .1);
  //
  //   var holderTexture = THREE.ImageUtils.loadTexture('images/textures/house/holderTexture.jpg');
  //
  //   var holderMaterial = new THREE.MeshPhongMaterial({
  //     color: 0xFFFF00,
  //     map: holderTexture
  //   });
  //
  //   var holder1 = new THREE.Mesh(holderGeometry1, holderMaterial);
  //   var holder2 = new THREE.Mesh(holderGeometry2, holderMaterial);
  //   var holderBase = new THREE.Mesh(holderBaseGeometry, holderMaterial);
  //
  //   var holderPivot = new THREE.Object3D();
  //   holderPivot.add(holder1);
  //   holderPivot.add(holder2);
  //
  //   var holder = new THREE.Object3D();
  //   holder.add(holderPivot);
  //   holder.add(holderBase);
  //
  //   holder.position.y += height / 2;
  //   holder.position.x += (width - frame1_width * 2) / 2;
  //   holder2.position.y += 0.017;
  //   holder2.position.z -= 0.050;
  //   holderBase.position.y -= 0.011;
  //   holderPivot.position.y -= 0.01;
  //
  //   objectWindow.add(holder);
  //   objectWindow.pivot = holderPivot; // Aggiungo questo campo per poterlo riutilizzare
  //
  //
  // }

  objectWindow.add(glass);
  // objectWindow.add(windowFrame1);
  // objectWindow.add(windowFrame2);
  // objectWindow.add(windowFrame3);
  // objectWindow.add(windowFrame4);
  // objectWindow.add(windowFrame5);
  // objectWindow.add(windowFrame6);
  // objectWindow.add(windowFrame7);
  // objectWindow.add(windowFrame8);

  return objectWindow;

}

export function createSingleWindow(width, height, thickness, x, y, z, includeHolder, pixelPerUnit) {

  // Creation of the window frame

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


  var frame1 = new Three.Mesh(frame1Geom, frame1Material);

  var frame2 = new Three.Mesh(frame2Geom, frame1Material);

  var frame3 = new Three.Mesh(frame1Geom, frame1Material);

  var frame4 = new Three.Mesh(frame2Geom, frame1Material);

  // frame1.castShadow = true;
  // frame1.receiveShadow = true;

  // frame2.castShadow = true;
  // frame2.receiveShadow = true;

  // frame3.castShadow = true;
  // frame3.receiveShadow = true;

  // frame4.castShadow = true;
  // frame4.receiveShadow = true;

  //Creation of the window
  var objectWindow = createGlass(width, height, thickness, frame1_width, frame2_height, includeHolder);

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
  frame2.position.y -= height/2 - frame2_height/2;
  frame3.position.x += width / 2 - frame1_width / 2;
  //frame3.position.y -= 0.01;
  //frame4.position.z -= thickness / 2;
  frame4.position.y += height/2 - frame2_height/2;

  objectWindow.position.x = width / 2 - frame1_width;
  objectWindow.position.z = thickness / 2;


  // if (includeHolder) {
  //
  //   /* Aggiungo una funzione per aprire e chiudere la finestra */
  //
  //   object.isOpen = false; // Stato della finestra
  //
  //   interactFunction = function () {
  //     if (object.isOpen) {
  //       object.isOpen = false;
  //
  //       /* Giro la maniglia */
  //       var holderRotate = new TWEEN.Tween(objectWindow.pivot.rotation)
  //         .to({y: 0}, 500)
  //         .easing(TWEEN.Easing.Linear.None);
  //
  //       /* Chiudo la finestra */
  //
  //       var window1CloseTween = new TWEEN.Tween(pivot.rotation)
  //         .to({z: 0}, 2000)
  //         .easing(TWEEN.Easing.Linear.None)
  //         .chain(holderRotate)
  //         .start();
  //
  //     } else {
  //
  //       object.isOpen = true;
  //
  //       var window1OpenTween = new TWEEN.Tween(pivot.rotation)
  //         .to({z: Math.PI / 2}, 2000)
  //         .easing(TWEEN.Easing.Linear.None);
  //
  //       /* Giro la maniglia */
  //       var holderRotate = new TWEEN.Tween(objectWindow.pivot.rotation)
  //         .to({y: Math.PI / 2}, 500)
  //         .easing(TWEEN.Easing.Linear.None)
  //         .chain(window1OpenTween)
  //         .start();
  //     }
  //   };
  //
  //   applyInteract(object, interactFunction);
  // }
  return object;
}

