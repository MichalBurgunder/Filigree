import React, { Component } from 'react';
import { connect } from "react-redux"

import { registerNewUser } from '../../../../store/actions/index.js'
import '../../../../App.css'


class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }
  }

  register = (e) => {
    e.preventDefault();
    this.props.dispatch(registerNewUser({...this.state})).then(()=>this.props.history.push("/registration/validation/"));
  }
    
  handleEmail = (e) => {
    this.setState({
      email: e.currentTarget.value
    })
  }

  render() {
    return (
      <div className="homeContainer">
        <h1>
          Registration
        </h1>
        <div>
          To register, enter your email address below. You will be redirected to a page to verify your email address. Then you are ready to start working with Filigree!
          <form action={"REGISTRATION"} onSubmit={this.register}><br />
            Email: <br /><br />
            <input onChange={this.handleEmail} type="text" id="user" className="textInput" name="username"></input><br />
          </form> <br />
          <button onClick={this.register} className='normalButton'><p>Send Code</p></button>
        </div>
      </div>
    );
  }
}

export default connect()(Registration);