import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
});
