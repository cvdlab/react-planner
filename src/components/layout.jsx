import React from 'react';
import Toolbar from './toolbar/toolbar';
import Content from './content';
import Sidebar from './sidebar/sidebar';

export default function ({width, height, ...rest}) {

  let toolbarWidth = 50;
  let sidebarWidth = 300;
  let contentWidth = width - toolbarWidth - sidebarWidth;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}} onWheel={event => event.preventDefault()}>
      <Toolbar width={toolbarWidth} height={height} {...rest} />
      <Content width={contentWidth} height={height} {...rest} />
      <Sidebar width={sidebarWidth} height={height} {...rest} />
    </div>
  );
}
