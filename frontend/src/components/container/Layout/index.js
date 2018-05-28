import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import Header from '../../presentational/Header'
import LoginLeftBar from '../../presentational/LoginLeftBar'
import error404 from './error404.jpg'
import '../../../App.css'


class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.token,
    }
  }

  checkIt = () => {
    return this.props.children.filter(path => {
      if (path.props.path === this.props.location.pathname) {
        return true
      } else {
        return false
      }
    })
  }

  checkNotFound = () => {
    if (this.checkIt().length === 0) {
      return (
        <div>
          <Header />
          <div className="fourohfourhome">
            <div classname='fourohfour'>
              <div className='bolddd'><b>Oh no!</b></div><br />
              <img src={error404} className="404-logo" width='300px' height='200px' alt="logo" /><br /><br />
              Looks like the page you are trying to access doesn't exist. Stick to the links provided and you should be okay! <br />
              Click <Link to='/'>here</Link> to go back home.
            </div>
          </div>
        </div>
      )
    } else {
      const Token = localStorage.getItem("access_token")
      if (Token) {
        return (
          <div>
            <Header />
            <div className="mainStuff">
              <div className="loginBar">
                <LoginLeftBar />
              </div>
              <div className="everythingElse">
                {this.props.children}
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
          <Header />
          <div className="mainStuff">
            <div className="loginBar">
            </div>
            <div className="everythingElse">
              {this.props.children}
            </div>
          </div>
        </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.checkNotFound()}
      </div>
    )
  }
}

export default connect()(Layout)