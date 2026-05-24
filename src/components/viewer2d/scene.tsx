import React, { Component } from 'react';
import Layer from './layer';
import Grids from './grids/grids';

type Props = { scene: any; catalog: any };

export default class Scene extends Component<Props, any> {

  shouldComponentUpdate(nextProps: Props, nextState: any) {
    return this.props.scene.hashCode() !== nextProps.scene.hashCode();
  }

  render() {
    let { scene, catalog } = this.props;
    let { height, layers } = scene;
    let selectedLayer = layers.get(scene.selectedLayer);

    return (
      <g>
        <Grids scene={scene} />

        <g style={{ pointerEvents: 'none' }}>
          {
            layers
              .entrySeq()
              .filter(([layerID, layer]: any) => layerID !== scene.selectedLayer && layer.visible)
              .map(([layerID, layer]: any) => <Layer key={layerID} layer={layer} scene={scene} catalog={catalog} />)
          }
        </g>

        <Layer key={selectedLayer.id} layer={selectedLayer} scene={scene} catalog={catalog} />
      </g>
    );
  }
}

