import React, {PropTypes} from 'react';

const STYLE_BUTTON_UPLOAD = {
  border: "5px",
  backgroundColor: "#28292d",
  margin: "0 auto",
  display: "block",
  fontSize: "20px",
  color: "#fff",
  borderRadius: "0px",
  marginTop: "100px",
  padding: "10px 25px",
  cursor: "pointer"
};

export default function ImageEditor({scene, width, height}, {imagesActions}) {
  return (
    <div style={{width, height}}>
      <button onClick={event => imagesActions.beginUploadingImage()} style={STYLE_BUTTON_UPLOAD}>Upload image</button>
    </div>
  )
}

ImageEditor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scene: PropTypes.object.isRequired
};

ImageEditor.contextTypes = {
  imagesActions: PropTypes.object.isRequired
};
