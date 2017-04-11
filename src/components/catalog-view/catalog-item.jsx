import React, {PropTypes, Component} from 'react';
import IconAdd from 'react-icons/lib/fa/plus-circle';
import If from '../../utils/react-if';
import {Seq} from 'immutable';

const STYLE_BOX = {
  width: "13.75em",
  height: "13.75em",
  padding: "0.625em",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  margin: "0.3em",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)",
  borderRadius: "2px"
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: "#1ca6fc"
};

const STYLE_IMAGE = {
  background: "#222",
  marginBottom: "5px",
  border: "solid 1px #e6e6e6",
  width: '100%',
  height: '8em',
  backgroundSize: 'contain',
  backgroundPosition:'50% 50%',
  backgroundColor:'#FFF',
  backgroundRepeat:'no-repeat'
};

const STYLE_PLUS_HOVER = {
  marginTop:'1.5em',
  color: "#1ca6fc",
  fontSize: "2em",
  opacity: "0.7",
  width: '100%'
};

const STYLE_DESCRIPTION = {
  fontSize: "0.75em",
};

const STYLE_ICON = {
  position: "absolute",
  bottom: "5px",
  right: "10px"
};

const STYLE_TAGS = {
  listStyle: "none",
  margin: "0px",
  padding: "0px",
  fontSize: "11px",
  marginBottom: "3px"
};

const STYLE_TAG = {
  display: "inline-block",
  background: "#337ab7",
  color: "#fff",
  padding: "1px 4px",
  marginRight: "3px",
  borderRadius: "3px"
};

export default class CatalogItem extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  select() {
    let element = this.props.element;
    let {linesActions, holesActions, itemsActions} = this.context;

    switch (element.prototype) {
      case 'lines':
        linesActions.selectToolDrawingLine(element.name);
        break;
      case 'items':
        itemsActions.selectToolDrawingItem(element.name);
        break;
      case 'holes':
        holesActions.selectToolDrawingHole(element.name);
        break;
    }
  }

  render() {
    let element = this.props.element;
    let hover = this.state.hover;

    return (
      <div style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
           onClick={e => this.select()}
           onMouseEnter={e => this.setState({hover: true})}
           onMouseLeave={e => this.setState({hover: false})}>
        <div style={{ ...STYLE_IMAGE, backgroundImage: 'url(' + element.info.image + ')'}}>
          { hover ? <IconAdd style={STYLE_PLUS_HOVER} /> : null }
        </div>
        <b>{element.info.title}</b>
        <ul style={STYLE_TAGS}>
          {new Seq(element.info.tag).map((tag, index) => <li style={STYLE_TAG} key={index}>{tag}</li>)}
        </ul>
        <div style={STYLE_DESCRIPTION}>{element.info.description}</div>
        <IconAdd style={STYLE_ICON}/>
      </div>
    );
  }
}

CatalogItem.propTypes = {
  element: PropTypes.object.isRequired,
};

CatalogItem.contextTypes = {
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired
};
