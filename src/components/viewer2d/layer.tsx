import React from 'react';
import Line from './line';
import Area from './area';
import Vertex from './vertex';
import Item from './item';
import Group from './group';

type Props = { layer: any; scene: any; catalog: any };

export default function Layer({ layer, scene, catalog }: Props) {

  let { unit, groups } = scene;
  let { lines, areas, vertices, holes, id: layerID, items, opacity } = layer;

  return (
    <g opacity={opacity}>
      {
        areas.valueSeq().map((area: any) =>
          <Area key={area.id} layer={layer} area={area} unit={unit} catalog={catalog} />)
      }
      {
        lines.valueSeq().map((line: any) =>
          <Line key={line.id} layer={layer} line={line} scene={scene} catalog={catalog} />)
      }
      {
        items.valueSeq().map((item: any) =>
          <Item key={item.id} layer={layer} item={item} scene={scene} catalog={catalog} />)
      }
      {
        vertices
          .valueSeq()
          .filter((v: any) => v.selected)
          .map((vertex: any) => <Vertex key={vertex.id} layer={layer} vertex={vertex} />)
      }
      {
        groups
          .valueSeq()
          .filter((g: any) => g.hasIn(['elements', layerID]) && g.get('selected'))
          .map((group: any) => <Group key={group.get('id')} layer={layer} group={group} scene={scene} catalog={catalog} />)
      }
    </g>
  );

}

