import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { MdUpdate } from 'react-icons/md';
import { KEYBOARD_BUTTON_CODE } from '../../constants';
import { PlannerContext } from '../../context';

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

const confirmStyle = {
  position: 'absolute',
  cursor: 'pointer',
  width: '2em',
  height: '2em',
  right: '0.35em',
  top: '0.35em',
  backgroundColor: SharedStyle.SECONDARY_COLOR.main,
  color: '#FFF',
  transition: 'all 0.1s linear'
};

type Props = {
  value?: number | string;
  style?: any;
  onChange: (event: any) => any;
  onValid?: (event: any) => any;
  onInvalid?: (event: any) => any;
  min?: number;
  max?: number;
  precision?: number;
  placeholder?: string;
};

type State = {
  focus: boolean;
  valid: boolean;
  showedValue: any;
};

export default class FormNumberInput extends Component<Props, State> {

  static defaultProps = {
    value: 0,
    style: {},
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    precision: 3
  };

  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      focus: false,
      valid: true,
      showedValue: props.value
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({ showedValue: nextProps.value });
    }
  }

  render() {

    let { value, min, max, precision, onChange, onValid, onInvalid, style, placeholder } = this.props;
    let numericInputStyle: any = { ...STYLE_INPUT, ...style };

    if (this.state.focus) numericInputStyle.border = `1px solid ${SharedStyle.SECONDARY_COLOR.main}`;

    let regexp = new RegExp(`^-?([0-9]+)?\\.?([0-9]{0,${precision}})?$`);

    if (!isNaN(min as number) && isFinite(min as number) && this.state.showedValue < (min as number)) this.setState({ showedValue: min }); // value = min;
    if (!isNaN(max as number) && isFinite(max as number) && this.state.showedValue > (max as number)) this.setState({ showedValue: max }); // value = max;

    let currValue = regexp.test(this.state.showedValue) ? this.state.showedValue : parseFloat(this.state.showedValue).toFixed(precision);

    let different = parseFloat(this.props.value as any).toFixed(precision) !== parseFloat(this.state.showedValue).toFixed(precision);

    let saveFn = (e: any) => {
      e.stopPropagation();

      if (this.state.valid) {
        let savedValue = (this.state.showedValue !== '' && this.state.showedValue !== '-') ? parseFloat(this.state.showedValue) : 0;

        this.setState({ showedValue: savedValue });
        onChange({ target: { value: savedValue } });
      }
    };

    return (
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={currValue}
          style={numericInputStyle}
          onChange={(evt) => {
            let valid = regexp.test(evt.nativeEvent.target.value);

            if (valid) {
              this.setState({ showedValue: evt.nativeEvent.target.value });
              if (onValid) onValid(evt.nativeEvent);
            }
            else {
              if (onInvalid) onInvalid(evt.nativeEvent);
            }

            this.setState({ valid });
          }}
          onFocus={e => this.setState({ focus: true })}
          onBlur={e => this.setState({ focus: false })}
          onKeyDown={e => {
            var keyCode = e.keyCode || e.which;
            if ((keyCode == KEYBOARD_BUTTON_CODE.ENTER || keyCode == KEYBOARD_BUTTON_CODE.TAB) && different) {
              saveFn(e);
            }
          }}
          placeholder={placeholder}
        />
        <div
          onClick={e => { if (different) saveFn(e); }}
          title={(this.context as any).translator.t('Confirm')}
          style={{ ...confirmStyle, visibility: different ? 'visible' : 'hidden', opacity: different ? '1' : '0' }}
        >
          <MdUpdate style={{ width: '100%', height: '100%', padding: '0.2em', color: '#FFF' }} />
        </div>
      </div>
    );
  }
}

(FormNumberInput as any).propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  precision: PropTypes.number,
  placeholder: PropTypes.string
};

(FormNumberInput as any).contextType = PlannerContext;
