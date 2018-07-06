import React from 'react';
import PropTypes from 'prop-types';
import { Line, Area, Vertex, Item, Group } from './export';

export default function Layer(_ref) {
  var layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var unit = scene.unit,
      groups = scene.groups;
  var lines = layer.lines,
      areas = layer.areas,
      vertices = layer.vertices,
      holes = layer.holes,
      layerID = layer.id,
      items = layer.items,
      opacity = layer.opacity;


  return React.createElement(
    'g',
    { opacity: opacity },
    areas.valueSeq().map(function (area) {
      return React.createElement(Area, { key: area.id, layer: layer, area: area, unit: unit, catalog: catalog });
    }),
    lines.valueSeq().map(function (line) {
      return React.createElement(Line, { key: line.id, layer: layer, line: line, scene: scene, catalog: catalog });
    }),
    items.valueSeq().map(function (item) {
      return React.createElement(Item, { key: item.id, layer: layer, item: item, scene: scene, catalog: catalog });
    }),
    vertices.valueSeq().filter(function (v) {
      return v.selected;
    }).map(function (vertex) {
      return React.createElement(Vertex, { key: vertex.id, layer: layer, vertex: vertex });
    }),
    groups.valueSeq().filter(function (g) {
      return g.hasIn(['elements', layerID]) && g.get('selected');
    }).map(function (group) {
      return React.createElement(Group, { key: group.get('id'), layer: layer, group: group, scene: scene, catalog: catalog });
    })
  );
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};