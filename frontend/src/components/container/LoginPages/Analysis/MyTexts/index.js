import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";

import { fetchTexts, analyzeText, deleteText } from "../../../../../store/actions/index"
import '../../../../../App.css'
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class MyTexts extends Component {

  componentDidMount() {
    this.props.dispatch(fetchTexts())
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    var intermediary = Math.round(number * factor) / factor;
    return Number(String(intermediary*1000))/10
  }

  renderTexts = () => {
    if (this.props.myTexts.length) {
      return (
        <div className="homeContainer">
          <h1>My Texts</h1>
          <div>
            Here you will find all Texts that you have uploaded so far. To create a new Text to analyze, press the button below. <br /><br />
            The Dale-Chall scores are as follows:<br /><br />
            4.9 or lower: easily understood by an average 4th-grade student or lower<br />
            5.0–5.9: easily understood by an average 5th or 6th-grade student<br />
            6.0–6.9: easily understood by an average 7th or 8th-grade student<br />
            7.0–7.9: easily understood by an average 9th or 10th-grade student<br />
            8.0–8.9: easily understood by an average 11th or 12th-grade student<br />
            9.0–9.9: easily understood by an average 13th to 15th-grade (university) student<br />
            10- : Only easily understood by university graduates or specialists<br /><br />
            <Link to="/new_text"><button className='normalButton'>Create New Text</button></Link><br /><br />
          </div>
          <div className="dataStructure">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Batch Name</th>
                  <th>Created</th>
                  <th>Author</th>
                  <th>Word Count</th>
                  <th>Unique Words</th>
                  <th>Percentage Unique Words</th>
                  <th>Dale-Chall Score</th>
                  <th>Options</th>
                </tr>
              </thead>
              {
                this.props.myTexts.map(t =>
                  <tbody className="tableEntries">
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.title}</td>
                      <td>{t.created}</td>
                      <td>{t.author}</td>
                      <td>{t.word_count}</td>
                      <td>{t.unique_words}</td>
                      <td>{this.precisionRound(t.word_unique_word_ratio, 3)}%</td>
                      <td>{t.dale_chall}</td>
                      <td ><div className="bitofPadding"><button type="Analyze" className="optionButton" onClick={analyzeText(t.id)}>Analyze</button></div>
                      <div className="bitofPadding"><button type="Delete" className="optionButton" onClick={deleteText(t.id)}>Delete</button></div></td>
                    </tr>
                  </tbody>
                )
              }
            </table>
          </div>
        </div>
      );
    } else {
      return (<p className="homeContainer">You seem to have no Texts. Click <Link to="/new_text">here</Link> to create a new text.</p>)
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
      <div>
        <div>{this.renderTexts()}</div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    myTexts: state.TextReducer
  }
}

export default connect(mapStateToProps)(MyTexts);