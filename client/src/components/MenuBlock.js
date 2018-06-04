import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/show_student.css';

class MenuBlock extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let activeClass = this.props.active ? 'show_student_menuActive' : '';
        return (
            <div onClick={ (e) => { this.props.callback(e); } } className={"menuNavbarCell container centered " + activeClass}>
                { this.props.title }
            </div>  
        );
  }
}

MenuBlock.propTypes = {
    active: PropTypes.bool,
    callback: PropTypes.func,
    title: PropTypes.string
}

export default MenuBlock;
