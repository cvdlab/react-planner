import React from 'react';
import { createArea, updatedArea } from './area-factory-3d';
import * as SharedStyle from '../../shared-style';
import Translator from '../../translator/translator';

let translator = new Translator();

export default function AreaFactory(name: string, info: any, textures: any) {

  let areaElement: any = {
    name,
    prototype: 'areas',
    info: {
      ...info,
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    },
    properties: {
      patternColor: {
        label: translator.t('color'),
        type: 'color',
        defaultValue: SharedStyle.AREA_MESH_COLOR.unselected
      },
      thickness: {
        label: translator.t('thickness'),
        type: 'length-measure',
        defaultValue: {
          length: 0,
        }
      }
    },
    render2D: function (element: any, layer: any, scene: any) {
      let path = '';

      ///print area path
      element.vertices.forEach((vertexID: any, ind: number) => {
        let vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach((areaID: any) => {
        let area = layer.areas.get(areaID);

        area.vertices.reverse().forEach((vertexID: any, ind: number) => {
          let vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });

      });

      let fill = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : element.properties.get('patternColor');

      return (<path d={path} fill={fill} />);
    },

    render3D: function (element: any, layer: any, scene: any) {
      return createArea(element, layer, scene, textures);
    },

    updateRender3D: (element: any, layer: any, scene: any, mesh: any, oldElement: any, differences: any, selfDestroy: any, selfBuild: any) => {
      return updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  if (textures && textures !== {}) {

    let textureValues: any = { 'none': 'None' };

    for (let textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    areaElement.properties.texture = {
      label: translator.t('texture'),
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };

  }

  return areaElement;

}
