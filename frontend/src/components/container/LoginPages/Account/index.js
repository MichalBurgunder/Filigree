import React, { Component } from 'react';
import { connect } from "react-redux"
import '../../../../App.css'
import { Link } from "react-router-dom";

import { verifyAccessToken } from '../../../../helpers'
import intruder from '../../LoginPages/intruder.jpg'

class Account extends Component {

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
        <h1>
        Account
        </h1>

        Hey there!<br /><br />

        I'm sorry that you find yourself on this page, as this page is still under construction! I realize that this is not what you wanted to see, but time ran out to add the "delete account" feature.<br /><br />
        If, however, you are still determined to purge all your data, please feel free to contact me at michal_burgunder@yahoo.com and I will do so manually.
        {/* Hey there!<br /><br />
        
        Although I do not not give out any information to any third parties, you must know that <b>this website has very limited security</b>. For this reason, you might want to delete your account.<br /><br />
        Below, you can delete your account. With it, all of your data (including batches, texts, etc.) is <b>permanentely lost</b>.<br /><br />
        <Link to="/deletion_validation"><button className='normalButton'>Delete My Account</button></Link><br /><br /> */}

      </div>
    );
  }
}


export default connect()(Account);