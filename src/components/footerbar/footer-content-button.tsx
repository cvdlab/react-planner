import React, { Component } from 'react';
import * as SharedStyle from '../../shared-style';
import { FaTimes as IconClose } from 'react-icons/fa';
import { PlannerContext } from '../../context';

const labelContainerStyle = {
  width: 'auto',
  display: 'inline-block',
  margin: 0,
  padding: '0px 5px 0px 0px'
};

const toggleButtonStyle = {
  color: '#CCC',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};

const toggleButtonStyleOver = {
  ...toggleButtonStyle,
  color: SharedStyle.COLORS.white
};

const contentContainerStyleActive = {
  position: 'fixed',
  width: 'calc( 100% - 2px )',
  height: '40%',
  left: 0,
  bottom: 20,
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  borderTop: SharedStyle.PRIMARY_COLOR.border,
  zIndex: 0,
  padding: 0,
  margin: 0,
  transition: 'all 300ms ease'
};

const contentContainerStyleInactive = {
  ...contentContainerStyleActive,
  visibility: 'hidden',
  height: 0
};

const contentHeaderStyle = {
  position: 'relative',
  width: '100%',
  height: '2em',
  top: 0,
  left: 0,
  borderBottom: SharedStyle.PRIMARY_COLOR.border
};

const titleStyle = {
  position: 'relative',
  height: '2em',
  lineHeight: '2em',
  marginLeft: '1em'
};

const contentAreaStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc( 100% - 2em )',
  padding: '1em',
  overflowY: 'auto'
};

const iconCloseStyleOut = {
  position: 'absolute',
  width: '2em',
  height: '2em',
  right: 0,
  top: 0,
  padding: '0.5em',
  borderLeft: SharedStyle.PRIMARY_COLOR.border,
  cursor: 'pointer'
};

const iconCloseStyleOver = {
  ...iconCloseStyleOut,
  color: SharedStyle.COLORS.white,
  backgroundColor: SharedStyle.SECONDARY_COLOR.alt
};

const iconStyle = {
  width: '15px',
  height: '15px',
  marginTop: '-2px',
  marginRight: '2px'
};

const textStyle = {
  position: 'relative'
};

type Props = {
  state: any;
  text: string;
  textStyle?: any;
  icon?: any;
  iconStyle?: any;
  content: any[];
  toggleState?: boolean;
  title?: string;
  titleStyle?: any;
};

type State = {
  over: boolean;
  closeOver: boolean;
  active: boolean;
};

export default class FooterContentButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      over: false,
      closeOver: false,
      active: this.props.toggleState || false
    };
  }

  toggleOver(e: any) { this.setState({ over: true }); }
  toggleOut(e: any) { this.setState({ over: false }); }

  toggle(e: any) {
    let isActive = !this.state.active;
    this.setState({ active: isActive });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.state.over != nextState.over) return true;
    if (this.state.closeOver != nextState.closeOver) return true;
    if (this.state.active != nextState.active) return true;

    if (this.props.content.length != nextProps.content.length) return true;
    if (this.props.toggleState != nextProps.toggleState) return true;

    return false;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.toggleState != this.props.toggleState)
      this.state.active = nextProps.toggleState as boolean;
  }

  render() {

    let s = this.state;
    let p = this.props;

    let LabelIcon = p.icon || null;
    let labelIconStyle = p.iconStyle || {};
    let labelTextStyle = p.textStyle || {};
    let inputTitleStyle = p.titleStyle || {};

    return (
      <div style={labelContainerStyle}>
        <div
          style={s.over || s.active ? toggleButtonStyleOver : toggleButtonStyle}
          onClick={e => this.toggle(e)}
          title={p.title}
        >
          <LabelIcon style={{ ...labelIconStyle, ...iconStyle }} />
          <span style={{ ...textStyle, ...labelTextStyle }}>{p.text}</span>
        </div>
        <div style={s.active ? contentContainerStyleActive : contentContainerStyleInactive}>
          <div style={contentHeaderStyle}>
            <b style={{ ...titleStyle, ...inputTitleStyle }}>{p.title}</b>
            <IconClose
              style={s.closeOver ? iconCloseStyleOver : iconCloseStyleOut}
              onMouseOver={e => this.setState({ closeOver: true })}
              onMouseOut={e => this.setState({ closeOver: false })}
              onClick={e => this.toggle(e)}
            />
          </div>
          <div style={contentAreaStyle}>
            {p.content}
          </div>
        </div>
      </div>
    );
  }
}


(FooterContentButton as any).contextType = PlannerContext;
