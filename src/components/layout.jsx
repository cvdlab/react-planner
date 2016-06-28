import React from 'react';
import Toolbar from './toolbar/toolbar.jsx';

export default function (props) {

  let {width, height, ...rest} = props;

  let toolbarWidth = 30;
  let sidebarWidth = 270;
  let viewerWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}}>
      <Toolbar style={{width: toolbarWidth, height}} {...rest} />
      <div class="viewer" style={{width: viewerWidth, height}}{...rest}></div>
      <div class="sidebar" style={{width: sidebarWidth, height}}{...rest}></div>
    </div>
  );
}
