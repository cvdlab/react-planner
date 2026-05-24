import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { PlannerContext } from '../../context';

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

type Props = {
  state: any;
  toggleOn: () => any;
  toggleOff: () => any;
  text: string;
  toggleState?: boolean;
  title?: string;
};

type State = {
  over: boolean;
  active: boolean;
};

export default class FooterToggleButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      over: false,
      active: this.props.toggleState || false
    };
  }

  toggleOver(e: any) { this.setState({ over: true }); }
  toggleOut(e: any) { this.setState({ over: false }); }

  toggle(e: any) {
    let isActive = !this.state.active;
    this.setState({ active: isActive });

    if (isActive) {
      this.props.toggleOn();
    }
    else {
      this.props.toggleOff();
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.state.over != nextState.over) return true;
    if (this.state.active != nextState.active) return true;
    if (this.props.toggleState != nextProps.toggleState) return true;

    return false;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.toggleState != this.props.toggleState)
      this.state.active = nextProps.toggleState as boolean;
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

(FooterToggleButton as any).propTypes = {
  state: PropTypes.object.isRequired,
  toggleOn: PropTypes.func.isRequired,
  toggleOff: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleState: PropTypes.bool,
  title: PropTypes.string
};

(FooterToggleButton as any).contextType = PlannerContext;
