import React, { Component } from 'react';

class NotFoundPage extends Component {
  render() {
    console.log(this.props.user);
    return (
      <p> 404 NOT FOUND </p>
    );
  }
}

export default NotFoundPage;
