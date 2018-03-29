import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

const toggleButtonStyle = {
  width: '5.5em',
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid transparent',
  margin: '-1px 5px 0 5px',
  borderRadius: '2px',
  display: 'inline-block'
};

const toggleButtonStyleOver = {
  ...toggleButtonStyle,
  backgroundColor: '#1c82c6',
  border: '1px solid #FFF',
  color: SharedStyle.COLORS.white
};

export default class FooterToggleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      over: false,
      active: this.props.toggleState || false
    };
  }

  toggleOver(e) { this.setState({ over: true }); }
  toggleOut(e) { this.setState({ over: false }); }

  toggle(e) {
    let isActive = !this.state.active;
    this.setState({ active: isActive });

    if (isActive)
    {
      this.props.toggleOn();
    }
    else
    {
      this.props.toggleOff();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if( this.state.over != nextState.over ) return true;
    if( this.state.active != nextState.active ) return true;
    if( this.props.toggleState != nextProps.toggleState ) return true;

    return false;
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.toggleState != this.props.toggleState  )
      this.state.active = nextProps.toggleState;
  }

  render() {

    return (
      <div
        style={this.state.over || this.state.active ? toggleButtonStyleOver : toggleButtonStyle}
        onMouseOver={e => this.toggleOver(e)}
        onMouseOut={e => this.toggleOut(e)}
        onClick={e => this.toggle(e)}
        title={this.props.title}
      >
        {this.props.text}
      </div>
    );
  }
}

FooterToggleButton.propTypes = {
  state: PropTypes.object.isRequired,
  toggleOn: PropTypes.func.isRequired,
  toggleOff: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string
};

FooterToggleButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
