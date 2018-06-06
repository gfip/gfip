import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo.svg';
import MenuNavbar from './MenuNavbar';
import OutsideDeactivator from './OutsideDeactivator';
import '../assets/navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };

        this.openMenu = this.openMenu.bind(this);
        this.deactivatedMenu = this.deactivatedMenu.bind(this);
    }

    openMenu() {
        this.setState({menu: true})
    }

    deactivatedMenu() {
        this.setState({menu: false});
    }

    render() {
        let MenuComponent = this.state.menu ? <OutsideDeactivator component={MenuNavbar} callback={this.deactivatedMenu}/> : null;
        return (
            <div id="navbar" className="container verticalCentered spaceBetween">
                <a href="/dashboard"><img src={logo} id="navbarLogo" alt="logo"/></a>
                <img
                    onClick={this.openMenu}
                    src={this.props.user.imageUrl + ".jpg"}
                    alt="userImage"
                    id="userImage"/> {MenuComponent}
            </div>
        );
    }
}

Navbar.propTypes = {
    user: PropTypes.object
}

export default Navbar;
