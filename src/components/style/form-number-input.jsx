import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';
import * as SharedStyle from '../../shared-style';

const STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: '#55595c',
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px',
};

export default class FormNumberInput extends Component {

  constructor(props) {
    super(props);
    this.state = {focus: false};
  }

  onChangeCustom(valueAsNumber, valueAsString, input) {
    if( this.refs.realNumber.refs.input.checkValidity() )
    {
      this.props.onChange( { target: { value: valueAsNumber } } );
      this.onValidCustom(valueAsNumber, valueAsString);
    }
    else
    {
      this.onInvalidCustom(valueAsNumber, valueAsString);
    }
  }

  onValidCustom( valueAsNumber, valueAsString ) {
    if( this.refs.realNumber) this.refs.realNumber.refs.input.style.color = STYLE_INPUT.color;

  }

  onInvalidCustom( error, valueAsNumber, valueAsString ) {
    if( this.refs.realNumber) this.refs.realNumber.refs.input.style.color = 'red';
  }

  render() {

    let {value, configs, onChange, onValid, style, ...rest} = this.props;
    let { min, max, precision } = configs;
    let step = 1 / Math.pow(10, precision);

    return <NumericInput
      ref="realNumber"
      onChange={this.onChangeCustom.bind(this)}
      onInvalid={this.onInvalidCustom.bind(this)}
      onInput={(evt) => this.refs.realNumber.refs.input.style.color = evt.nativeEvent.target.checkValidity() ? STYLE_INPUT.color : 'red' }
      step={step}
      precision={precision}
      value={value}
      type={'number'}
      min={min}
      max={max}
      pattern={'^-?([0-9]+)\.?([0-9]+)?'}
      style={
        {
          wrap: { width: '100%'},
          input: {
            ...STYLE_INPUT,
            ...style,
            border: this.state.focus ? '1px solid #66afe9' : '1px solid rgba(0,0,0,.15)'
          }
        }
      }
      snap
    />;
  }
}

FormNumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  configs: PropTypes.object
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  onChange: () => console.log('onValid instead'),
  onValid: () => console.log('onValid not defined'),
  onInvalid: () => console.log('onInvalid not defined'),
  configs: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    precision: 3
  }
};
