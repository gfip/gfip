import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../assets/show_student.css';

class MenuBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.callback(e);
    }

    render() {
        let activeClass = this.props.active? 'show_student_menuActive': '';
        return (
            <div
                onClick={this.handleClick}
                className={"menuNavbarCell container centered " + activeClass}>
                {this.props.title}
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
