import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

const STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.PRIMARY_COLOR.input,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px',
};

export default class FormNumberInput extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      focus: false,
      valid: true
    };
  }

  render() {

    let { value, min, max, precision, onChange, onValid, onInvalid, style, placeholder } = this.props;
    let numericInputStyle = { ...STYLE_INPUT, ...style };

    if (this.state.focus) numericInputStyle.border = `1px solid ${SharedStyle.SECONDARY_COLOR.main}`;

    let regexp = new RegExp(`^-?([0-9]+)\\.?([0-9]{0,${precision}})?$`);
    value = regexp.test(value) ? value : parseFloat(value).toFixed(precision);

    return <input
      type="text"
      value={value}
      style={numericInputStyle}
      onChange={(evt) => {
        let valid = regexp.test(evt.nativeEvent.target.value);

        if (valid) {
          onChange({ target: { value: evt.nativeEvent.target.value } });
          onValid(evt.nativeEvent);
        }
        else {
          onInvalid(evt.nativeEvent);
        }
        this.setState({ valid });
      }}
      onFocus={e => this.setState({ focus: true })}
      onBlur={e => this.setState({ focus: false })}
      placeholder={placeholder}
    />;
  }
}

FormNumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  precision: PropTypes.number,
  placeholder: PropTypes.string
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  onChange: () => console.log('onValid instead'),
  onValid: () => console.log('onValid not defined'),
  onInvalid: () => console.log('onInvalid not defined'),
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};
