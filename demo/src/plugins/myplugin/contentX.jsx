import React, {PropTypes} from 'react';

export function ContentX({width, height, state}) {
    return (
    <div style={{width, height}}>
      <div style={{marginTop: height/2, marginLeft: width/2}} >MY CONTENT</div>
    </div>
  );
}

ContentX.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};
