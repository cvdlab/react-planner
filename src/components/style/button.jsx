import React, {PropTypes, Component} from 'react';

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
  padding: ".5rem 1rem",
  fontSize: "1rem",
  color: "#000",
  fonWeight: "400px",
  transition: "background-color 175ms ease, border 175ms ease",
  outline: "none",
  borderRadius: "2px",
  borderWidth: "1px",
  borderType: "solid",
};


export default class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  render() {
    let {hover} = this.state;
    let {type, style: customStyle, styleHover: customStyleHover, children, ...rest} = this.props;

    let styleMerged = Object.assign({}, BASE_STYLE, hover ? customStyleHover : customStyle);

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
};

