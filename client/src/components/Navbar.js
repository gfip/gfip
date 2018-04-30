import React, { Component } from 'react';
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
    }
    
    openMenu = event => {
        this.setState({menu: true})        
    }

    deactivatedMenu(){
        this.setState({menu: false});
    }

    render() {
        let MenuComponent = this.state.menu ? <OutsideDeactivator component={MenuNavbar} callback={this.deactivatedMenu.bind(this)}/> : null;
        return (
            <div id="navbar" className="container verticalCentered spaceBetween">
                <img src={logo} id="navbarLogo" alt="logo" />
                <img onClick={this.openMenu} src={this.props.user.imageUrl + ".jpg"} alt="userImage" id="userImage"/>
                {MenuComponent}
            </div>
        );
  }
}

export default Navbar;
