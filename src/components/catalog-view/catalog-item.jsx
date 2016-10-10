import React, {PropTypes, Component} from 'react';
import IconAdd from 'react-icons/lib/fa/plus-circle';
import If from '../../utils/react-if';
import {Seq} from 'immutable';

const STYLE_BOX = {
  width: "200px",
  height: "200px",
  padding: "10px",
  background: "#f7f7f9",
  border: "1px solid #e1e1e8",
  margin: "5px",
  cursor: "pointer",
  position: "relative",
  boxShadow: "rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px",
  borderRadius: "2px"
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: "#1ca6fc"
};

const STYLE_IMAGE = {
  width: "200px",
  height: "130px",
  background: "#222",
  marginBottom: "5px",
  border: "solid 1px #e6e6e6"
};

const STYLE_NAME = {
  fontSize: "16px",
  fontWeight: "bold"
};

const STYLE_DESCRIPTION = {
  fontSize: "12px",
};

const STYLE_ICON = {
  position: "absolute",
  bottom: "5px",
  right: "10px"
};

const STYLE_SELECT = {
  position: "absolute",
  top: "55px",
  color: "#1ca6fc",
  textAlign: "center",
  width: "200px",
  fontSize: "30px",
  opacity: "0.7"
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
    let {element} = this.props;
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
    let {element} = this.props;
    let {hover} = this.state;

    return (
      <div style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
           onClick={event => this.select()}
           onMouseEnter={e => this.setState({hover: true})}
           onMouseLeave={e => this.setState({hover: false})}>
        <img style={STYLE_IMAGE} src={element.info.image}/>
        <If condition={hover}>
          <div style={STYLE_SELECT}><IconAdd /></div>
        </If>
        <div style={STYLE_NAME}>{element.name}</div>
        <ul style={STYLE_TAGS}>
          {new Seq(element.info.tag).map((tag, index) => <li style={STYLE_TAG} key={index}>{tag}</li>)}
        </ul>
        <div style={STYLE_DESCRIPTION}>{element.info.description}</div>
        <div style={STYLE_ICON}>
          <IconAdd />
        </div>
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
