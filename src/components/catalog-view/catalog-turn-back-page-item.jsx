import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconBack from 'react-icons/lib/md/navigate-before';

const STYLE_BOX = {
  width: '14em',
  height: '14em',
  padding: '0.625em',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  margin: '0.3em',
  cursor: 'pointer',
  position: 'relative',
  boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.11), 0 1px 4px 0 rgba(0, 0, 0, 0.11)',
  borderRadius: '2px'
};

const STYLE_BOX_HOVER = {
  ...STYLE_BOX,
  background: '#1ca6fc'
};

const STYLE_TITLE = {
  width: '100%',
  position: 'absolute',
  textAlign: 'center',
  display: 'block',
  marginBottom: '.5em',
  textTransform: 'capitalize'
};

const STYLE_TITLE_HOVERED = {
  ...STYLE_TITLE,
  opacity: 0.1
};

const STYLE_NEXT_HOVER = {
  position: 'absolute',
  color: '#1ca6fc',
  fontSize: '5em',
  width: '100%',
};

const CONTAINER_DIV = {
  background: '#fff',
  marginBottom: '5px',
  border: 'solid 1px #e6e6e6',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default class CatalogTurnBackPageItem extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  changePage(newPage) {
    this.context.projectActions.goBackToCatalogPage(this.props.page.name)
  }

  render() {
    let page = this.props.page;
    let hover = this.state.hover;

    return (
      <div
        style={hover ? STYLE_BOX_HOVER : STYLE_BOX}
        onClick={e => this.changePage(page.name)}
        onMouseEnter={e => this.setState({hover: true})}
        onMouseLeave={e => this.setState({hover: false})}
      >

        <div style={CONTAINER_DIV}>
          <IconBack style={STYLE_NEXT_HOVER}/>
        </div>

      </div>
    );
  }
}

CatalogTurnBackPageItem.propTypes = {
  page: PropTypes.object.isRequired
};

CatalogTurnBackPageItem.contextTypes = {
  projectActions: PropTypes.object.isRequired
};
