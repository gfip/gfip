import React, { Component } from 'react';
import '../assets/navbar.css';
import AuthService from './AuthService';
import { withRouter } from "react-router-dom";

class MenuNavbar extends Component {
  
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {
        };
    }

    logout = event => {
        this.AuthService.logout();
        this.props.history.push("/");
    }

    render() {
        let activeClass = this.props.active ? 'active' : 'disabled'
        return (
            <div ref={this.props.refMethod} id="menuNavbar" className={'container column verticalCentered spaceBetween ' + activeClass}>
                <div className="menuNavbarCell container centered">Options</div>  
                <div onClick={this.logout} className="menuNavbarCell container centered">Log out</div>                   
            </div>
        );
    }
}

export default withRouter(MenuNavbar);
