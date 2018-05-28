import React, { Component } from 'react';
import { connect } from "react-redux"

class Logout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  componentDidMount() {
    localStorage.clear();
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="homeContainer">
      <h1>Logout!</h1>
        You've been logged out. Have a good day!!<br /><br />
      </div>
    );
  }
}


export default connect()(Logout);