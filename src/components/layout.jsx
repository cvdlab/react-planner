import React from 'react';
import Toolbar from './toolbar/toolbar.jsx';
import Viewer from './viewer.jsx';

export default function (props) {

  let {width, height, ...rest} = props;

  let toolbarWidth = 30;
  let sidebarWidth = 270;
  let viewerWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}}>
      <Toolbar style={{width: toolbarWidth, height}} {...rest} />
      <Viewer style={{width: viewerWidth, height}} width={viewerWidth} height={height} {...rest} />
      <div class="sidebar" style={{width: sidebarWidth, height}}{...rest}></div>
    </div>
  );
}
