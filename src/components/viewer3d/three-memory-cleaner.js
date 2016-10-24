import Three from 'three';

function disposeGeometry(geometry) {
  geometry.dispose();
}

function disposeTexture(texture) {
  if (!texture) {
    return;
  }
  texture.dispose();
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
}

function disposeMesh(mesh) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
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
