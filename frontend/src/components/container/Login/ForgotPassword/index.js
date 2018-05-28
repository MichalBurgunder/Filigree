import React, { Component } from 'react';
import { reset_password } from '../../../../store/actions/index.js';
import {connect} from "react-redux"
import { RESET_PASSWORD } from '../../../../store/actions/constants';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }
  }

  handleEmail = (e) => {
    this.setState({
      email: e.currentTarget.value
    })
  }

  send_password = (e) => {
    e.preventDefault();
    this.props.dispatch(reset_password(this.state));
  }

  render() {
    return (
      <div className="Home-container">
        <div>
          To reset your password, type in your email address here, and we will send you instructions on how to reset your password:
          <form action={RESET_PASSWORD} onSubmit={this.send_password}>
          <input type="text" name="password"></input><br />
        </form>
        <button onClick={this.send_password}><p>Send Email</p></button>
        </div>
      </div>
    );
  }
}

export default connect()(ForgotPassword);