import PointerLockControls from './libs/pointer-lock-controls';

export function initPointerLock(camera, rendererElement) {

  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  var pointerlockchange = function pointerlockchange(event) {
    controls.enabled = !controls.enabled;
  };

  var requestPointerLockEvent = function requestPointerLockEvent(event) {
    document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
    document.body.requestPointerLock();
  };

  if (havePointerLock) {

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
    rendererElement.addEventListener('click', requestPointerLockEvent);
  } else {
    console.log('Your browser doesn\'t seem to support Pointer Lock API');
  }

  var controls = new PointerLockControls(camera);
  return { controls: controls, pointerlockChangeEvent: pointerlockchange, requestPointerLockEvent: requestPointerLockEvent };
}

/* Funzione per il calcolo delle collisioni con gli oggetti contenuti all'interno di un array.
 * L'idea è quella di utilizzare il ray casting. Per tenere conto del fatto che ci possiamo
 * muovere nelle quattro direzioni, applico una matrice di rotazione alla direzione verso la
 * quale l'oggetto del pointer lock è orientato. */

function collision(controls, collisionArray) {

  var rotationMatrix = void 0;
  var cameraDirection = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

  if (controls.moveForward()) {
    // Nothing to do!
  } else if (controls.moveBackward()) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(180 * Math.PI / 180);
  } else if (controls.moveLeft()) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(90 * Math.PI / 180);
  } else if (controls.moveRight()) {
    rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY((360 - 90) * Math.PI / 180);
  } else return;

  if (rotationMatrix !== undefined) {
    cameraDirection.applyMatrix4(rotationMatrix);
  }
  var rayCaster = new THREE.Raycaster(controls.getObject().position, cameraDirection.normalize());
  var intersects = rayCaster.intersectObjects(collisionArray, true);

  if (intersects.length > 0 && intersects[0].distance < 10) {
    return true;
  }

  return false;
}

/* Funzione meno raffinata per il calcolo delle collisioni.
 * In pratica viene definita una bounding geometry (in questo caso la skymap) e poi vengono fatti
 * partire una serie di raggi dall'object del controller fino ai vertici di questa geometria. Se uno di questi interseca
 * uno degli oggetti dei quali vogliamo controllare la collisione, allora la funzione restituirà il valore true */
/*
 function collision(object, boundingGeometry, collisionArray ) {

 for (let vertexIndex = 0; vertexIndex < boundingGeometry.geometry.vertices.length; vertexIndex++)	{
 let localVertex = boundingGeometry.geometry.vertices[vertexIndex].clone();
 let globalVertex = localVertex.applyMatrix4( object.matrix );
 let directionVector = globalVertex.sub( object.position );

 let ray = new THREE.Raycaster(object.position, directionVector.clone().normalize());
 let collisionResults = ray.intersectObjects(collisionArray, true);
 if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() - 1293) {
 console.log("collisione: ",collisionResults[0].distance," ",directionVector.length()-1293);
 return true;
 }
 }
 return false;
 }
 */

/* Questa funzione si occupa di determinare se il controllo si trova su un oggetto, in caso negativo cade verso il basso
 * (vedi esempio pointer lock) */

function translateY(controls, ray, objects) {

  controls.isOnObject(false);
  ray.ray.origin.copy(controls.getObject().position);
  ray.ray.origin.y -= 10;
  var intersections = ray.intersectObjects(objects, true);
  if (intersections.length > 0) {
    var distance = intersections[0].distance;
    if (distance > 0 && distance < 10) {
      controls.isOnObject(true);
    }
  }
}

/* Queste funzioni bloccano o sbloccano il movimento del controller (utili in caso di collisione) */

function lockDirection(controls) {
  if (controls.moveForward()) {
    controls.lockMoveForward(true);
  } else if (controls.moveBackward()) {
    controls.lockMoveBackward(true);
  } else if (controls.moveLeft()) {
    controls.lockMoveLeft(true);
  } else if (controls.moveRight()) {
    controls.lockMoveRight(true);
  }
}

function unlockAllDirection(controls) {
  controls.lockMoveForward(false);
  controls.lockMoveBackward(false);
  controls.lockMoveLeft(false);
  controls.lockMoveRight(false);
}