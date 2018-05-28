import React, { Component } from 'react';
import { connect } from "react-redux"
import '../../../App.css'
import { Link } from "react-router-dom";

class QuickAnalysis extends Component {

  createTextAnalyze = () => {

  }

  handleText = (e) => {
    this.setState({
      text: e.currentTarget.value
    })
  }

  render() {
    return (
      <div className="homeContainer">
        <h1>
          Welcome to Filigree!
          </h1>
          <div>
            Filigree is a simple text analyzer that does a word, unique word count and a readability check on any text that you put into it. This helps you determine how
            many words and unique there are in a given text and helps you determine how difficult a text is to read, calculating its Dale-Chall readability score.<br /><br />
            To get started, register <Link to="/registration">here</Link>, or if you are already signed up, log in <Link to="/registration">here</Link>.<br /><br />
            Have fun!
        </div>
      </div>
                );
              }
            }
            
export default connect()(QuickAnalysis);