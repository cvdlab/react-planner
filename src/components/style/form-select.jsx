import React from 'react';
import * as SharedStyle from '../../shared-style';

const BASE_STYLE = {
  display: "block",
  width: "100%",
  padding: "0px 4px",
  fontSize: "13px",
  color: SharedStyle.PRIMARY_COLOR.input,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: "none",
  border: "1px solid rgba(0,0,0,.15)",
  outline: "none",
  borderRadius: "0px",
  height: "30px",
  WebkitAppearance: "none",
  WebkitBorderRadius: "0px",
  background: `url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'><path fill='#444' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>") #fff`,
  backgroundPosition: "100% 50%",
  backgroundRepeat: "no-repeat",
};

export default function FormSelect({children, style, ...rest}) {
  return <select type="text" style={{...BASE_STYLE, ...style}} {...rest}>{children}</select>;
}
