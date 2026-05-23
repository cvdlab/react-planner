import * as Three from 'three';

function disposeGeometry(geometry: any) {
  geometry.dispose();
}

function disposeTexture(texture: any) {
  if (!texture) {
    return;
  }
  texture.dispose();
}

function disposeMultimaterial(material: any) {
  if (!(material instanceof (Three as any).MultiMaterial)) {
    return;
  }
  material.materials.forEach((material: any) => {
    disposeMaterial(material);
  });

}

function disposeMaterial(material: any) {
  if (!(material instanceof Three.Material)) {
    return;
  }

  disposeTexture(material.map);
  material.map = null;
  material.dispose();
}

function disposeMesh(mesh: any) {
  if (!(mesh instanceof Three.Mesh || mesh instanceof Three.BoxHelper || mesh instanceof Three.LineSegments)) {
    return;
  }
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);

  mesh.geometry = null;
  mesh.material = null;
}

export function disposeScene(scene3D: any) {
  scene3D.traverse((child: any) => {
    disposeMesh(child);
    child = null;
  });
}

export function disposeObject(object: any) {
  object.traverse((child: any) => {
    disposeMesh(child);
    child = null;
  });
}
