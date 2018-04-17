In this example we will create a simple cube.

``` es6
import {BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper} from 'three';

import React from 'react';

export default {
  name: 'cube',
  prototype: 'items',

  info: {
    title: 'cube',
    tag: ['demo'],
    description: 'Demo item',
    image: require('./cube.png')
  },

  properties: {
    color: {
      label: 'Color',
      type: 'color',
      defaultValue: '#F48342'
    }
  },

  render2D: (element, layer, scene) => {
    let style = {
      stroke: '#000',
      strokeWidth: element.selected ? '2px' : '0px',
      fill: element.properties.get('color')
    };

    return (
      <g transform="translate(-50, -50)">
        <rect x="0" y="0" width="100" height="100" style={style}/>
      </g>
    );
  },

  render3D: (element, layer, scene) => {
    let geometry = new BoxGeometry(100, 100, 100);
    let material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    let mesh = new Mesh(geometry, material);

    if (element.selected) {
      let box = new BoxHelper(mesh, '#000');
      box.material.linewidth = 1;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      mesh.add(box);
    }

    mesh.position.y = +50;

    return Promise.resolve(mesh);
  }

};

```
## Element:

| Property Name | Type      | Value   | Possible Values               | Optional  |
| ------------- |:---------:|:-------:|:-----------------------------:|:---------:|
| name          | String    | 'cube'  | any                           |           |
| prototype     | String    | 'items' | 'items' \| 'lines' \| 'holes' |           |
| info          | Object    | ...     | ...                           |           |
| properties    | Object    | ...     | ...                           |           |
| render2D      | Function  | ...     | ...                           |           |
| render3D      | Function  | ...     | ...                           |           |
| updateRender3D| Function  | ...     | ...                           |      x    |

## Element's Info:

| Property Name | Type   | Value    | Description                             |
| ------------- |:------:|:--------:|:---------------------------------------:|
| title         | String | 'cube'   | Catalog's tile title                    |
| tag           | Array  | ['demo'] | Catalog's tile tags description         |
| description   | String | 'Demo item'  | Catalog's tile description          |
| image         | String | require('./cube.png')  | Catalog's tile image url  |

## Element's Properties:

You can specify any prevoiusly registered Catalog's Property. For register a property you should call the *Catalog.registerPropertyType* function.
> See [Create a Property](HOW_TO_CREATE_A_PROPERTY.md)

## Element's render2D:

This function take as input parameteres ( element, layer, scene ) and need to return a jsx representation of an svg tag

## Element's render3D:

This function take as input parameteres ( element, layer, scene ) and need to return a Promise containing a [Three.js Mesh](https://threejs.org/docs/#api/objects/Mesh)

## Element's updateRender3D:

This function take as input parameteres ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) and need to return a Promise containing a [Three.js Mesh](https://threejs.org/docs/#api/objects/Mesh). Usually after an Element variation it will be destroyed and recreated. This is a common use while you're manipulating not so complex Elements. You can bypass this approach and specify the Element's updateRender3D function allowing to directly modify the Mesh instead destroying it.
> For an example you can look at *updateRender3D in WallFactory*
