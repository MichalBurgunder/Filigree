import React, { Component } from 'react';
import { connect } from "react-redux"
import {  Link } from "react-router-dom";

import { fetchBatches, analyzeBatch, deleteBatch } from "../../../../../store/actions/index"
import '../../../../../App.css'
import { verifyAccessToken } from '../../../../../helpers'
import intruder from '../../intruder.jpg'

class MyBatches extends Component {

  componentDidMount() {
    this.props.dispatch(fetchBatches())
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    var intermediary = Math.round(number * factor) / factor;
    return Number(String(intermediary*1000))/10
  }

  renderTextFiles(t) {
    var string = ''
    for (var i = 0; i <= t.text_files.length - 1; i++) {
      string += t.text_files[i] + ', '
    }
    return string.slice(0, -2)
  }

  renderBatches = () => {
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
    if (this.props.myBatches.length) {
      return (
        <div className="homeContainer">
          <h1>
            My Batches
          </h1>
          Here you will find all the Batches that you have created so far. To create a new Batch, press the button below. <br /><br />
          The Dale-Chall scores are as follows:<br /><br />
          4.9 or lower: easily understood by an average 4th-grade student or lower<br />
          5.0–5.9: easily understood by an average 5th or 6th-grade student<br />
          6.0–6.9: easily understood by an average 7th or 8th-grade student<br />
          7.0–7.9: easily understood by an average 9th or 10th-grade student<br />
          8.0–8.9: easily understood by an average 11th or 12th-grade student<br />
          9.0–9.9: easily understood by an average 13th to 15th-grade (university) student<br />
          10- : Only easily understood by university graduates or specialists<br /><br />
          <Link to="/new_batch"><button className='normalButton'>Create New Batch</button></Link><br /><br />
          <div className="dataStructure">
            <table className='dataTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Batch Name</th>
                  <th>Date Created</th>
                  <th>Included text-files</th>
                  <th>Author</th>
                  <th>Word Count</th>
                  <th>Unique words</th>
                  <th>Percentage Unique Words</th>
                  <th>Dale-Chall score</th>
                  <th>Options</th>
                </tr>
              </thead>
              {
                this.props.myBatches.map(t =>
                  <tbody className="tableEntries">
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.name}</td>
                      <td>{t.created}</td>
                      <td>{this.renderTextFiles(t)}</td>
                      <td>{t.author}</td>
                      <td>{t.word_count}</td>
                      <td>{t.unique_words}</td> 
                      <td>{this.precisionRound(t.word_unique_word_ratio, 3)}%</td>
                      <td>{t.dale_chall}</td>
                      <td><div className="bitofPadding"><button type="Analyze" class="optionButton" onClick={analyzeBatch(t.id)}>Analyze</button></div>
                      <div className="bitofPadding"><button type="Delete" class="optionButton" onClick={deleteBatch(t.id)}>Delete</button></div></td>
                    </tr>
                  </tbody>
                )
              }
            </table>
          </div>
        </div>
      )

    } else {
      return (<p className="homeContainer">You seem to have no Batches. Click <Link to="/new_batch">here</Link> to create a new Batch.</p>)
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderBatches()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myBatches: state.BatchReducer
  }
}


export default connect(mapStateToProps)(MyBatches);