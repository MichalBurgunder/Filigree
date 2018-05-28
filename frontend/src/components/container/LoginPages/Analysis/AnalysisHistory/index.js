import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"

import { fetchHistory } from "../../../../../store/actions/index" 
import '../../../../../App.css'
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class AnalysisHistory extends Component {

  componentDidMount() {
    this.props.dispatch(fetchHistory())
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    var intermediary = Math.round(number * factor) / factor;
    return Number(String(intermediary*1000))/10
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
    if (this.props.myAnalyses.length) {
      return (
        <div className="homeContainer">
          <h1>Analysis History</h1>
          <div>
          Here you will find all the Analyses that you have done so far. <br /><br />
          The Dale-Chall scores are as follows:<br /><br />
          4.9 or lower: easily understood by an average 4th-grade student or lower<br />
          5.0–5.9: easily understood by an average 5th or 6th-grade student<br />
          6.0–6.9: easily understood by an average 7th or 8th-grade student<br />
          7.0–7.9: easily understood by an average 9th or 10th-grade student<br />
          8.0–8.9: easily understood by an average 11th or 12th-grade student<br />
          9.0–9.9: easily understood by an average 13th to 15th-grade (university) student<br />
          10- : Only easily understood by university graduates or specialists<br /><br />
          </div>
          <div className="dataStructure">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date Created</th>
                  <th>Type</th>
                  <th>Author</th>
                  <th>Word Count</th>
                  <th>Unique words</th>
                  <th>Percentage Unique Words</th>
                  <th>Dale-Chall score</th>
                </tr>
              </thead>
              {
                this.props.myAnalyses.map(t =>
                  <tbody className="tableEntries">
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.title}</td>
                      <td>{t.created}</td>
                      <td>{t.type}</td>
                      <td>{t.author}</td>
                      <td>{t.total_word_count}</td>
                      <td>{t.unique_words}</td>
                      <td>{this.precisionRound(t.word_unique_word_ratio, 3)}%</td>
                      <td>{t.dale_chall_score}</td>
                    </tr>
                  </tbody>
                )
              }
            </table>
          </div>


        </div>
      );
    } else {
      return (
        <div className="homeContainer">
          <h1>Analysis History</h1>
        <div>Oh no! You don't seem to have analyzed any Batches or Texts yet!</div><br />
        <div>Get started by analyzing Texts in <Link to='/my_texts'>My Texts</Link>, 
        or if you already have a few, you can analyze a  Batch in <Link to='/my_batches'>My Batches</Link>.</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    myAnalyses: state.HistoryReducer
  }
}


export default connect(mapStateToProps)(AnalysisHistory);