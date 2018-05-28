import React, { Component } from 'react';
import { registerValidate } from '../../../../store/actions/index.js'
import {connect} from "react-redux"
import '../../../../App.css'
class ConfirmCode extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      verification_code: '',
      first_name: '',
      last_name: '',
      error_message: '',
    }
  }

  registerConfirmation = (e) => {
    e.preventDefault()
    this.props.dispatch(registerValidate(this.state)).then((data) => {
      if(data === 2) {
        this.setState({
          error_message: "Wrong credentials... Please try again"
        })
      } else {
        this.props.history.push("/")
      }
    }) 
  }

  handleEmail = (e) => {
    this.setState({
      email: e.currentTarget.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.currentTarget.value
    })
  }

  handlePasswordValidation = (e) => {
    this.setState({
      password_repeat: e.currentTarget.value
    })
  }

  handleVerificationCode = (e) => {
    this.setState({
      code: e.currentTarget.value
    })
  }

  handleFirst = (e) => {
    this.setState({
      first_name: e.currentTarget.value
    })
  }

  handleLast = (e) => {
    this.setState({
      last_name: e.currentTarget.value
    })
  }

  render() {
    return (
      <div className="homeContainer">
      <h1>Registration Validation</h1>
      Here you can type in all of your information that you would like to save on the account. In order to activate your account, you will need to type in your email adress and the verification code which we have sent you. <br /><br />
        <form action={"CONFIRMCODE"}>
          Email: <input type="text" onChange={this.handleEmail} className="textInput" id="username" name="username"></input><br /><br />
          Password: <input type="password" onChange={this.handlePassword} className="textInput" id="password" name="password"></input><br /><br />
          Repeat Password: <input type="password" onChange={this.handlePasswordValidation} className="textInput" id="password_repeat" name="password_repeat"></input><br /><br />
          Verification Code: <input type="text" onChange={this.handleVerificationCode} className="textInput" id="code" name="code"></input><br /><br />
          First Name: <input type="text" id="firstname" onChange={this.handleFirst} className="textInput" name="first_name"></input><br /><br />
          Last Name:  <input type="text" id="lastname" onChange={this.handleLast} className="textInput" name="last_name"></input><br /><br />
        </form>
        <div className="wrongCredentials">{this.state.error_message}</div>
        <button onClick={this.registerConfirmation} className='normalButton'> <p>Submit</p> </button>
      </div>
    );
  }
}

export default connect()(ConfirmCode);