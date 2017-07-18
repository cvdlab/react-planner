import React from 'react';
import Toolbar from './toolbar/toolbar';
import Content from './content';
import Sidebar from './sidebar/sidebar';
import FooterBar from './footerbar/footerbar';

export default function ({width, height, ...rest}) {

  let toolbarWidth = 50;
  let sidebarWidth = 300;
  let contentWidth = width - toolbarWidth - sidebarWidth;

  let footerBarHeight= 20;
  let toolbarHeight = height - footerBarHeight;
  let contentHeight = height - footerBarHeight;
  let sidebarHeight = height - footerBarHeight;

  return (
    <div style={{display: "flex", flexFlow: "row nowrap", height}}>
      <Toolbar width={toolbarWidth} height={toolbarHeight} {...rest} />
      <Content width={contentWidth} height={contentHeight} {...rest} onWheel={event => event.preventDefault()} />
      <Sidebar width={sidebarWidth} height={sidebarHeight} {...rest} />
      <FooterBar width={width} height={footerBarHeight} {...rest}/>
    </div>
  );
}
