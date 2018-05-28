import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";
import '../../../../../App.css'
import { createText } from '../../../../../store/actions/index'
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class NewText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      content: '',
    }
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleChangeAuthor = (e) => {
    this.setState({
      author: e.target.value
    })
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  createNewText = (e) => {
    e.preventDefault()
    this.props.dispatch(createText(this.state)).then(() => this.props.history.push("/my_texts"))
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
        <h1>New Text</h1>
        <form onSubmit={() => this.createNewText()} >
          Title: <br /><input onChange={this.handleChangeTitle} className="textInput" id="title"></input><br /><br />
          Author: <br /><input onChange={this.handleChangeAuthor} id="author" className="textInput"></input><br /><br />
          Content: <br /><textarea row="40" cols="50" className="TextFieldText" onChange={this.handleChangeContent} id="content"></textarea><br /><br />
          <button onClick={this.createNewText} className='normalButton'> <p>Create Text</p></button>
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

export default connect(mapStateToProps)(withRouter(NewText));