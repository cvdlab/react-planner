import React from 'react';
import PropTypes from 'prop-types';
import GridHorizontalStreak from './grid-horizontal-streak';
import GridVerticalStreak from './grid-vertical-streak';

type Props = { scene: any };

export default function Grids({ scene }: Props) {

  let { width, height, grids } = scene;

  let renderedGrids = grids.entrySeq().map(([gridID, grid]: any) => {
    switch (grid.type) {
      case 'horizontal-streak':
        return (<GridHorizontalStreak key={gridID} width={width} height={height} grid={grid} />);

      case 'vertical-streak':
        return (<GridVerticalStreak key={gridID} width={width} height={height} grid={grid} />);

      default:
        console.warn(`grid ${grid.type} not allowed`);
    }
  }).toList();

  return (<g>{renderedGrids}</g>);
}

(Grids as any).propTypes = {
  scene: PropTypes.object.isRequired
};
