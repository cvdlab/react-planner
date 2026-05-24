import React, { Children, Component } from "react";
import elementResizeDetectorMaker from "element-resize-detector";

export default class ContainerDimensions extends Component {
  static getDomNodeDimensions(node) {
    const { top, right, bottom, left, width, height } =
      node.getBoundingClientRect();
    return { top, right, bottom, left, width, height };
  }

  constructor() {
    super();
    this.state = {
      initiated: false,
    };
    this.sentinelRef = React.createRef();
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.parentNode = this.sentinelRef.current?.parentNode;
    if (!this.parentNode) return;
    this.elementResizeDetector = elementResizeDetectorMaker({
      strategy: "scroll",
      callOnAdd: false,
    });
    this.elementResizeDetector.listenTo(this.parentNode, this.onResize);
    this.componentIsMounted = true;
    this.onResize();
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
    if (this.elementResizeDetector && this.parentNode) {
      this.elementResizeDetector.uninstall(this.parentNode);
    }
  }

  onResize() {
    const clientRect = ContainerDimensions.getDomNodeDimensions(
      this.parentNode,
    );
    if (this.componentIsMounted) {
      this.setState({
        initiated: true,
        ...clientRect,
      });
    }
  }

  render() {
    if (!this.props.children) {
      throw new Error(
        "Expected children to be one of function or React.Element",
      );
    }

    if (!this.state.initiated) {
      return <div ref={this.sentinelRef} />;
    }
    if (typeof this.props.children === "function") {
      const renderedChildren = this.props.children(this.state);
      return renderedChildren && Children.only(renderedChildren);
    }
    return Children.only(React.cloneElement(this.props.children, this.state));
  }
}
