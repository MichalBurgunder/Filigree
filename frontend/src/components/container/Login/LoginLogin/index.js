import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom';
import { login } from '../../../../store/actions/currentUser';
import '../../../../App.css'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault();
      this.props.login({ ...this.state }).then((data) => {
        if(data === 2) {
          this.setState({
            message: "Wrong credentials! Please try again"
          })
        } else {
          this.props.history.push("/")
        }
      })
  }

  render() {
    return (
      <div>
        <div className="homeContainer">
          <h1>Login</h1>
          <div>
            Here you can log into your account. Unfortunately, I have not managed to implement a forgotten password feature, to remember it well!<br /><br />
            <form>
              Email: <br /><input onChange={this.handleChange} id="username" className="textInput" type="text" name="username"></input><br /><br />
              Password: <br /><input onChange={this.handleChange} id="password" className="textInput" type="password" name="password"></input><br /><br />
              <div className="wrongCredentials">{this.state.message}</div>
              <button className='button loginButton' onClick={this.login}> <p>Login</p> </button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data))
});


export default connect(null, mapDispatchToProps)(withRouter(Login));