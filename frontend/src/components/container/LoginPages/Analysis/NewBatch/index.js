import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

import { createBatch } from '../../../../../store/actions/index'
import { runInThisContext } from 'vm';
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class NewBatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      author: '',
      text_files: [],
    }
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeAuthor = (e) => {
    this.setState({
      author: e.target.value
    })
  }
  
  handleChangeTextFiles = (e) => {
    let itemList = document.getElementById("files");
    let options = itemList.selectedOptions
    var arrayMine = [];
    for (var i = 0; i <= options.length-1; i++) {
        arrayMine.push(options[i].value)
    }
    this.setState({
      text_files: arrayMine
    })
  }

  createNewBatch = (e) => {
    e.preventDefault()
    this.props.dispatch(createBatch(this.state)).then(() => this.props.history.push("/my_batches"))
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
          New Batch
          </h1>
        <form>
          Name: <br /><input onChange={this.handleChangeName} className="textInput" id="name"></input><br /><br />
          Text Files:<br />
          <div>
            <select id="files" onChange={this.handleChangeTextFiles} className="textInputFiles" multiple>{
              this.props.myTexts.map(t =>
                <option value={t.id}>{t.title}</option>
              )
            }
            </select>
          </div>
          <br />Author:<br /><input onChange={this.handleChangeAuthor} className="textInput" id="auhtor"></input><br /><br />
          <button onClick={this.createNewBatch} className='normalButton'> <p>Create Batch</p></button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    myTexts: state.TextReducer
  }
}

export default connect(mapStateToProps)(withRouter(NewBatch));