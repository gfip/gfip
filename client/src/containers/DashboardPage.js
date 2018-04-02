import React, { Component } from 'react'; 
import Navbar from '../components/Navbar';

class DashboardPage extends Component {
  render() {
    return (
      <div>
          <Navbar user={this.props.user}/>
      </div>
    );
  }
}

export default DashboardPage;
