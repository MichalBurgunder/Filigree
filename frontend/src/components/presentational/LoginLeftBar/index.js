import React, { Component } from 'react';
import './index.css'
import { Link } from "react-router-dom";

class LoginLeftBar extends Component {
  
  render() {
    return (
      <div className="LeftBar">
        <div>
          <header>
            <div className="sidenav">
              <Link to="/"><div className="barLink">Home</div></Link>
              <Link to="/my_texts"><div className="barLink">My Texts</div></Link>
              <Link to="/my_batches"><div className="barLink">My Batches</div></Link>
              <Link to="/my_analyses"><div className="barLink">My Analyses</div></Link>
              <Link to="/account"><div className="barLink">Account</div></Link>
              <Link to="/logout"><div className="barLink">Logout</div></Link>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default LoginLeftBar;