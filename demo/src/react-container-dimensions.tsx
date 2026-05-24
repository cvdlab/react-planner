import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import elementResizeDetectorMaker from "element-resize-detector";
import invariant from "invariant";

export default class ContainerDimensions extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
  };

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
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.parentNode = ReactDOM.findDOMNode(this).parentNode;
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
    this.elementResizeDetector.uninstall(this.parentNode);
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
    invariant(
      this.props.children,
      "Expected children to be one of function or React.Element",
    );

    if (!this.state.initiated) {
      return <div />;
    }
    if (typeof this.props.children === "function") {
      const renderedChildren = this.props.children(this.state);
      return renderedChildren && Children.only(renderedChildren);
    }
    return Children.only(React.cloneElement(this.props.children, this.state));
  }
}
