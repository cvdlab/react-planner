import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../styles/shared-style';
import { MdUpdate } from 'react-icons/md';
import { KEYBOARD_BUTTON_CODE } from '../../utils/constants';
import ReactPlannerContext from '../../utils/react-planner-context';

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

export default function FormNumberInput({ value, min, max, precision, onChange, onValid, onInvalid, style, placeholder }) {
  const { translator } = useContext(ReactPlannerContext);

  const [focus, setFocus] = useState(false);
  const [valid, setValid] = useState(true);
  const [showedValue, setShowedValue] = useState(value);

  useEffect(() => {
    setShowedValue(value);
  }, [value]);

  let numericInputStyle = { ...STYLE_INPUT, ...style };

  if (focus) numericInputStyle.border = `1px solid ${SharedStyle.SECONDARY_COLOR.main}`;

  let regexp = new RegExp(`^-?([0-9]+)?\\.?([0-9]{0,${precision}})?$`);

  if (!isNaN(min) && isFinite(min) && showedValue < min) setShowedValue(min); // value = min;
  if (!isNaN(max) && isFinite(max) && showedValue > max) setShowedValue(max);; // value = max;

  let currValue = regexp.test(showedValue) ? showedValue : parseFloat(showedValue).toFixed(precision);

  let different = parseFloat(value).toFixed(precision) !== parseFloat(showedValue).toFixed(precision);

  const saveFn = (e) => {
    e.stopPropagation();

    if (valid) {
      let savedValue = (showedValue !== '' && showedValue !== '-') ? parseFloat(showedValue) : 0;

      setShowedValue(savedValue);
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
            setShowedValue(evt.nativeEvent.target.value);
            if (onValid) onValid(evt.nativeEvent);
          }
          else {
            if (onInvalid) onInvalid(evt.nativeEvent);
          }

          setValid(valid);
        }}
        onFocus={e => setFocus(true)}
        onBlur={e => setFocus(false)}
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
        title={translator.t('Confirm')}
        style={{ ...confirmStyle, visibility: different ? 'visible' : 'hidden', opacity: different ? '1' : '0' }}
      >
        <MdUpdate style={{ width: '100%', height: '100%', padding: '0.2em', color: '#FFF' }} />
      </div>
    </div>
  );
}

FormNumberInput.propTypes = {
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

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};
