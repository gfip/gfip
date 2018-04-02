import React, { Component } from 'react';
import logo from '../assets/img/logo.svg';
import '../assets/navbar.css';
class Navbar extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      console.log(this.props.user.imageUrl);
      return (
        <div id="navbar" className="container verticalCentered spaceBetween">
            <img src={logo} id="navbarLogo" alt="logo" />
            <img src={this.props.user.imageUrl + ".jpg"} alt="userImage" id="userImage"/>
        </div>
      );
  }
}

export default Navbar;
