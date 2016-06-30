import React from 'react';
import Toolbar from './toolbar/toolbar.jsx';
import Viewer from './viewer.jsx';
import Sidebar from './sidebar/sidebar.jsx';

export default function ({width, height, ...rest}) {

  let toolbarWidth = 30;
  let sidebarWidth = 270;
  let viewerWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}}>
      <Toolbar style={{width: toolbarWidth, height}} {...rest} />
      <Viewer style={{width: viewerWidth, height}} width={viewerWidth} height={height} {...rest} />
      <Sidebar style={{width: sidebarWidth, height}}{...rest} width={sidebarWidth} height={height}></Sidebar>
    </div>
  );
}
