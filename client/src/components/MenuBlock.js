import React, { Component } from 'react';
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

export default MenuBlock;
