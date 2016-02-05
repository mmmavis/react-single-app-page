import React from 'react';
import Navbar from '../components/Navbar.jsx';

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <div id="main-container" className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
