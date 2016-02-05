import React from 'react';
import NavbarLink from './NavbarLink.jsx';

export default class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <div className="container">
          <NavbarLink path="/" pageName="Home" />
          <NavbarLink path="/about" pageName="About" />
        </div>
      </div>
    );
  }
}
