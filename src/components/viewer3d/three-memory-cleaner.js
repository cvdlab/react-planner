import * as Three from 'three';

function disposeGeometry(geometry) {
  geometry.dispose();
  geometry = null;
}

function disposeTexture(texture) {
  if (!texture) {
    return;
  }
  texture.dispose();
  texture = null;
}

function disposeMultimaterial(material) {
  if (!(material instanceof Three.MultiMaterial)) {
    return;
  }
  material.materials.forEach(material => {
    disposeMaterial(material);
  });

}

function disposeMaterial(material) {
  if (!(material instanceof Three.Material)) {
    return;
  }

  disposeTexture(material.map);
  material.dispose();
  material = null;
}

function disposeMesh(mesh) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper || mesh instanceof Three.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
  mesh = null;
}

export function disposeScene(scene3D) {
  scene3D.traverse(child => {
    disposeMesh(child);
  });
}

export function disposeObject(object) {
  object.traverse(child => {
    disposeMesh(child);
  });
}
