import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

const BASE_STYLE = {
  display: "inline-block",
  fontWeight: "400",
  lineHeight: "1.25",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  cursor: "pointer",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  userSelect: "none",
  padding: "5px 14px",
  fontSize: "14px",
  color: SharedStyle.COLORS.black,
  fonWeight: "400px",
  transition: "background-color 175ms ease, border 175ms ease",
  outline: "none",
  borderRadius: "2px",
  borderWidth: "1px",
  borderType: "solid",
  width: '100%'
};

const BASE_STYLE_SIZE = {
  small: {
    fontSize: "12px",
    padding: "3px 8px",
  },
  normal: {},
  large: {
    padding: "8px 20px",
  },
};

export default class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  render() {
    let {hover} = this.state;
    let {type, style: customStyle, styleHover: customStyleHover, children, size, ...rest} = this.props;
    let styleMerged = Object.assign({}, BASE_STYLE, BASE_STYLE_SIZE[size], hover ? customStyleHover : customStyle);

    return <button
      type={type}
      onMouseEnter={e => this.setState({hover: true})}
      onMouseLeave={e => this.setState({hover: false})}
      style={styleMerged}
      {...rest}>{children}</button>
  }
}

Button.defaultProps = {
  type: "button",
  size: "normal",
  style: {
    backgroundColor: "#e6e6e6",
    borderColor: "#adadad",
  },
  styleHover: {
    backgroundColor: "#d4d4d4",
    borderColor: "#8c8c8c"
  },
};

Button.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  styleHover: PropTypes.object,
  size: PropTypes.oneOf(['large', 'normal', 'small']),
};

