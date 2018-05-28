import React, { Component } from 'react';
import filigree from './filigree_2.png';
import '../../../App.css'
import { Link } from "react-router-dom";
import { verifyAccessToken } from '../../../helpers'

class Header extends Component {

  loginRender() {
    try {
      verifyAccessToken()
    }
    catch (e) {
      return (
        <div className="separator">
            <div className="linksRight">
              <Link to="/login" className="linkClassRight">Login</Link>
              <Link to="/registration" className="linkClassRight">Signup</Link>
            </div>
          </div>
      )
    } 
    return 
  }


  render() {
    return (
      <div>
        <div>
          <header className="App-header">
            <Link to="/">
              <img src={filigree} className="App-logo" alt="logo" />
            </Link>
          </header>
        </div>

        <div class="allMyLinks">
          <div className="linksLeft">
            <Link to="/info" className="linkClassLeft">What is Filigree?</Link>
            <Link to="/about" className="linkClassLeft">About Filigree</Link>
            <Link to="/faq" className="linkClassLeft">FAQ</Link>
          </div>
          <div>{this.loginRender()}</div>
        </div>
      </div >
    );
  }
}

export default Header;