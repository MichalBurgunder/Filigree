import React, { Component } from 'react';
import { connect } from "react-redux"
import '../../../../../App.css'
import { Link } from "react-router-dom";

import { deleteAccount } from "../../../../../store/actions/index"
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class DeleteAccountValidation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    try {
      verifyAccessToken()
    }
    catch (e) {
      return (<div>
        <div className="fourohfourhome">
          <div classname='fourohfour'>
            <div className='bolddd'><b>Hang on!</b></div><br />
            <img src={intruder} className="404-logo" width='300px' height='200px' alt="logo" /><br /><br />
            What are you doing?! You shouldn't be here! Stick to the links provided and you should be okay! <br />
            Click <Link to='/'>here</Link> to go back home.
        </div>
        </div>
      </div>)
    }
    return (
      <div className="homeContainer">
      <h1>Confirm Account deletion</h1>
        Are you sure you want to delete your account? All data will be lost.<br /><br />
        <Link to="/goodbye"><button onClick={deleteAccount()} className='normalButton'>Confirm Account Deletion</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      myDetails: state.AccountReducer
    }
  }



export default connect(mapStateToProps)(DeleteAccountValidation);