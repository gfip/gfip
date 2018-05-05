import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Component that desactivate the Component prop passed if you click outside of it
 * OutsideDeactivator needs to have a callback prop that is called when the component passed is deactivated.
 * Component prop must have ref set to props.refMethod
 * Component prop must change from active to disabled class based on the 'active' prop passed to it.
 */
class OutsideDeactivator extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Desactivate element if user clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({active: false});
        this.props.callback();
    }
  }

  insideClose(event) {
    this.setState({active: false});
    this.props.callback();
  }

  render() {
    let Component = this.props.component;
    let active = this.state.active;
    return (
      <Component refMethod={this.setWrapperRef} active={active} closeMe={this.insideClose.bind(this)} {...this.props}/>
    );
  }
}

OutsideDeactivator.propTypes = {
    component: PropTypes.any.isRequired,
    callback: PropTypes.func.isRequired,
    auth: PropTypes.string
}

export default OutsideDeactivator;