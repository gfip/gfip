import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import '../assets/navbar.css';
import AuthService from './AuthService';

class MenuNavbar extends Component {

    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {};

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.AuthService.logout();
        this.props.history.push("/");
    }

    render() {
        let activeClass = this.props.active ? 'active' : 'disabled'
        return (
            <div
                ref={this.props.refMethod}
                id="menuNavbar"
                className={'container column verticalCentered spaceBetween ' + activeClass}>
                <div className="menuNavbarCell container centered">Options</div>
                <div onClick={this.logout} className="menuNavbarCell container centered">Log out</div>
            </div>
        );
    }
}

MenuNavbar.propTypes = {
    refMethod: PropTypes.func,
    active: PropTypes.bool,
    history: PropTypes.object
}

export default withRouter(MenuNavbar);
