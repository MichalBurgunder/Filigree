import React, { Component } from 'react';
import '../../../App.css'

class FAQ extends Component {
  render() {
    return (
      <div className="homeContainer">
        <h1>
          FAQ
          </h1>
        The problem with FAQs is that many of the questions that are listed there, simply do not answer the question you are trying to answer. With the advance of AI, this might change, but for now, this will have to do.
        <br /><br />
        I have done my best to either keep the questions as informative as I could, and at the very least, humorous.
        <br /><br />
        <b>Where can I find texts to analyze?</b>
        <br />
        You can find many texts on this website: <a href="http://www.fulltextarchive.com/">http://www.fulltextarchive.com/</a>
        <br /><br />
        <b>What is the longest book ever written?</b><br />
        The longest book ever written is NOT War & Peace as many might imagine (clocking in at approx. 600'000 words), but it is in fact "In Search of Lost Time" by Marcel Proust with an astounding 1'200'000 words! That's TWICE AS LONG as War & Peace. Impressive!
        <br /><br />
        <b>Why do FAQs usually never answer questions that are frequently asked?</b><br />
        The reason for this is that end users usually come from other websites and computer programs that function differently. This does not allow them to intuitively make the app work, leading them to ask basic questions like "What is a 404 page?" or "I clicked a button, now my computer screen is black. Why?"
        <br /><br />
        <b>Does God exist?</b><br />
        Probably.
        <br /><br />
        <b>What is your fifth favourite reptile?</b><br />
        I would have to probably go with the turtle.<br /><br />
      </div>
    );
  }
}

export default FAQ