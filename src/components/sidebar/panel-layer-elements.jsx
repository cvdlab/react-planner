import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import {
  MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_3D_VIEW, MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM
} from '../../constants';
import * as SharedStyle from '../../shared-style';
import MdSearch from 'react-icons/lib/md/search';

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

export default class PanelLayerElement extends Component {

  constructor(props, context) {
    super(props, context);

    let layer = props.layers.get(props.selectedLayer);
    let elements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items,
    };

    this.state = {
      elements,
      matchString: '',
      matchedElements: elements
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.matchString !== nextState.matchString) return true;

    let oldElements = this.state.elements;
    let newElements = nextState.elements;

    if(
      oldElements.lines.hashCode() !== newElements.lines.hashCode() ||
      oldElements.holes.hashCode() !== newElements.holes.hashCode() ||
      oldElements.items.hashCode() !== newElements.items.hashCode()
    ) return true;

    return false;
  }

  componentWillReceiveProps(nextProps) {
    let layer = nextProps.layers.get(nextProps.selectedLayer);

    if ( this.props.layers.hashCode() === nextProps.layers.hashCode() ) return;

    let elements = {
      lines: layer.lines,
      holes: layer.holes,
      items: layer.items,
    };

    if (this.state.matchString !== '') {
      let regexp = new RegExp(this.state.matchString, 'i');
      let filterCb = el => regexp.test(el.get('name'));

      this.setState({
        matchedElements: {
          elements,
          lines: elements.lines.filter(filterCb),
          holes: elements.holes.filter(filterCb),
          items: elements.items.filter(filterCb)
        }
      });
    } else {
      this.setState({elements, matchedElements: elements});
    }
  }

  matcharray(text) {
    if (text === '') {
      this.setState({
        matchString: '',
        matchedElements: this.state.elements
      });
      return;
    }

    let regexp = new RegExp(text, 'i');
    let filterCb = el => regexp.test(el.get('name'));

    this.setState({
      matchString: text,
      matchedElements: {
        lines: this.state.elements.lines.filter(filterCb),
        holes: this.state.elements.holes.filter(filterCb),
        items: this.state.elements.items.filter(filterCb)
      }
    });
  }

  render() {
    if (!VISIBILITY_MODE[this.props.mode]) return null;

    let layer = this.props.layers.get(this.props.selectedLayer);

    return (
      <Panel name={this.context.translator.t('Elements on layer {0}', layer.name)}>
        <div style={contentArea} onWheel={e => e.stopPropagation()}>

          <table style={tableSearchStyle}>
            <tbody>
            <tr>
              <td><MdSearch style={searchIconStyle}/></td>
              <td><input type="text" style={searchInputStyle} onChange={(e) => {
                this.matcharray(e.target.value);
              }}/></td>
            </tr>
            </tbody>
          </table>

          {
            this.state.matchedElements.lines.count() ?
              <div>
                <p style={categoryDividerStyle}>{this.context.translator.t('Lines')}</p>
                {
                  this.state.matchedElements.lines.entrySeq().map(([lineID, line]) => {
                    return (
                      <div
                        key={lineID}
                        onClick={e => this.context.linesActions.selectLine(layer.id, line.id)}
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
            this.state.matchedElements.holes.count() ?
              <div>
                <p style={categoryDividerStyle}>{this.context.translator.t('Holes')}</p>
                {
                  this.state.matchedElements.holes.entrySeq().map(([holeID, hole]) => {
                    return (
                      <div
                        key={holeID}
                        onClick={e => this.context.holesActions.selectHole(layer.id, hole.id)}
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
            this.state.matchedElements.items.count() ?
              <div>
                <p style={categoryDividerStyle}>{this.context.translator.t('Items')}</p>
                {
                  this.state.matchedElements.items.entrySeq().map(([itemID, item]) => {
                    return (
                      <div
                        key={itemID}
                        onClick={e => this.context.itemsActions.selectItem(layer.id, item.id)}
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

}

PanelLayerElement.propTypes = {
  mode: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
};

PanelLayerElement.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};
