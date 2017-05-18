import React, {Component} from 'react';


const STYLE_INPUT = {
  display: "block",
  width: "100%",
  padding: "0 2px",
  fontSize: "13px",
  lineHeight: "1.25",
  color: "#55595c",
  backgroundColor: "#fff",
  backgroundImage: "none",
  border: "1px solid rgba(0,0,0,.15)",
  outline: "none",
  height: "30px",
};


export default class FormTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {focus: false};
  }

  render() {
    let {style, ...rest} = this.props;

    return <input
      onFocus={e => this.setState({focus: true})}
      onBlur={e => this.setState({focus: false})}
      style={{
        ...STYLE_INPUT,
        ...style,
        border: this.state.focus ? '1px solid #66afe9' : '1px solid rgba(0,0,0,.15)'
      }}
      type="text"  {...rest}/>
  }
}

FormTextInput.defaultProps = {
  style: {}
};
