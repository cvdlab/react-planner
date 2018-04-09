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
  disposeGeometry(mesh.geometry);
  disposeMultimaterial(mesh.material);
  disposeMaterial(mesh.material);
}

function disposeNested( obj ) {
  if( obj.children &&  obj.children.length )
  {
    for( let i = obj.children.length - 1; i >= 0; i-- )
    {
      let curr = obj.children[i];
      if( curr.children && curr.children.length ) disposeNested( curr );

      if ((curr instanceof Three.Mesh || curr instanceof Three.BoxHelper || curr instanceof Three.LineSegments)) {
        disposeMesh(curr);
      }
      obj.remove(curr);
      curr = null;
    }
  }
}

export function disposeScene(scene3D) {
  scene3D.traverse(child => {
    disposeNested( child );
    scene3D.remove( child );
    child = null;
  });
}

export function disposeObject(object) {
  object.traverse(child => {
    disposeMesh(child);
  });
}
