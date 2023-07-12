import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import ReactPlannerContext from '../../utils/react-planner-context';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../utils/constants';
import * as SharedStyle from '../../styles/shared-style';
import {MdSearch} from 'react-icons/md';

const VISIBILITY_MODE = {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
};

const contentArea = {
  height: 'auto',
  maxHeight: '15em',
  overflowY: 'auto',
  padding: '0.25em 1.15em',
  cursor: 'pointer',
  marginBottom: '1em',
  userSelect: 'none'
};

const elementStyle = {
  width: 'auto',
  height: '2.5em',
  margin: '0.25em 0.25em 0 0',
  padding: '0.5em',
  textAlign: 'center',
  display: 'inline-block',
  border: '1px solid #CCC',
  borderRadius: '0.2em'
};

const elementSelectedStyle = {
  ...elementStyle,
  color: SharedStyle.SECONDARY_COLOR.main,
  borderColor: SharedStyle.SECONDARY_COLOR.main,
};

const categoryDividerStyle = {
  paddingBottom: '0.5em',
  borderBottom: '1px solid #888',
};

const tableSearchStyle = {width: '100%', marginTop: '0.8em'};
const searchIconStyle = {fontSize: '1.5em'};
const searchInputStyle = {fontSize: '1em', width: '100%', height: '1em', padding: '1em 0.5em'};

const PanelLayerElement = ({ mode, layers, selectedLayer }) => {
  const { translator, itemsActions, linesActions, holesActions } = useContext(ReactPlannerContext);
  const [matchString, setMatchString] = useState('');
  const [elements, setElements] = useState({ lines: new Map(), holes: new Map(), items: new Map() });
  const [matchedElements, setMatchedElements] = useState(elements);

  useEffect(() => {
    let layer = layers.get(selectedLayer);
    let newElements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items,
    };
    setElements(newElements);
    if (matchString !== '') {
      let regexp = new RegExp(matchString, 'i');
      let filterCb = el => regexp.test(el.get('name'));
      setMatchedElements({
        lines: newElements.lines.filter(filterCb),
        holes: newElements.holes.filter(filterCb),
        items: newElements.items.filter(filterCb)
      });
    } else {
      setMatchedElements(newElements);
    }
  }, [layers, selectedLayer]);
  
  const matchArray = (text) => {
    if (text === '') {
      setMatchString('');
      setMatchedElements(elements);
      return;
    }

    let regexp = new RegExp(text, 'i');
    let filterCb = el => regexp.test(el.get('name'));

    setMatchString(text);
    setMatchedElements({
      lines: elements.lines.filter(filterCb),
      holes: elements.holes.filter(filterCb),
      items: elements.items.filter(filterCb)
    });
  };

  if (!VISIBILITY_MODE[mode]) return null;

  let layer = layers.get(selectedLayer);

  return (
    <Panel name={translator.t('Elements on layer {0}', layer.name)}>
      <div style={contentArea} onWheel={e => e.stopPropagation()}>

        <table style={tableSearchStyle}>
          <tbody>
          <tr>
            <td><MdSearch style={searchIconStyle}/></td>
            <td><input type="text" style={searchInputStyle} onChange={(e) => {
              matchArray(e.target.value);
            }}/></td>
          </tr>
          </tbody>
        </table>

        {
          matchedElements.lines.size ?
            <div>
              <p style={categoryDividerStyle}>{translator.t('Lines')}</p>
              {
                matchedElements.lines.entrySeq().map(([lineID, line]) => {
                  return (
                    <div
                      key={lineID}
                      onClick={e => linesActions.selectLine(layer.id, line.id)}
                      style={line.selected ? elementSelectedStyle : elementStyle}
                    >
                      {line.name}
                    </div>
                  )
                })
              }
            </div>
            : null
        }

        {
          matchedElements.holes.size ?
            <div>
              <p style={categoryDividerStyle}>{translator.t('Holes')}</p>
              {
                matchedElements.holes.entrySeq().map(([holeID, hole]) => {
                  return (
                    <div
                      key={holeID}
                      onClick={e => holesActions.selectHole(layer.id, hole.id)}
                      style={hole.selected ? elementSelectedStyle : elementStyle}
                    >
                      {hole.name}
                    </div>
                  )
                })
              }
            </div>
            : null
        }

        {
          matchedElements.items.size ?
            <div>
              <p style={categoryDividerStyle}>{translator.t('Items')}</p>
              {
                matchedElements.items.entrySeq().map(([itemID, item]) => {
                  return (
                    <div
                      key={itemID}
                      onClick={e => itemsActions.selectItem(layer.id, item.id)}
                      style={item.selected ? elementSelectedStyle : elementStyle}
                    >
                      {item.name}
                    </div>
                  )
                })
              }
            </div>
            : null
        }

      </div>
    </Panel>
  );
}

PanelLayerElement.propTypes = {
  mode: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
};

export default PanelLayerElement;