import React from 'react';
import Toolbar from './toolbar/toolbar';
import Content from './content';
import Sidebar from './sidebar/sidebar';

export default function ({width, height, ...rest}) {

  let toolbarWidth = 50;
  let sidebarWidth = 270;
  let contentWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}} onWheel={event => event.preventDefault()}>
      <Toolbar style={{width: toolbarWidth, height}} {...rest} />
      <Content style={{width: contentWidth, height}} width={contentWidth} height={height} {...rest} />
      <Sidebar style={{width: sidebarWidth, height}}{...rest} width={sidebarWidth} height={height} />
    </div>
  );
}
