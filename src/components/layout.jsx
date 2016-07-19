import React from 'react';
import Toolbar from './toolbar/toolbar.jsx';
import Content from './content.jsx';
import Sidebar from './sidebar/sidebar.jsx';

export default function ({width, height, ...rest}) {

  let toolbarWidth = 30;
  let sidebarWidth = 270;
  let contentWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}}>
      <Toolbar style={{width: toolbarWidth, height}} {...rest} />
      <Content style={{width: contentWidth, height}} width={contentWidth} height={height} {...rest} />
      <Sidebar style={{width: sidebarWidth, height}}{...rest} width={sidebarWidth} height={height}></Sidebar>
    </div>
  );
}
