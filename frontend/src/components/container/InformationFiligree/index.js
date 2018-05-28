import React, { Component } from 'react';
import '../../../App.css'
import mauve from './mauve.jpg'

class InformationFiligree extends Component {
  render() {
    return (
      <div className="homeContainer">
      <h1>
        What is Filigree?
      </h1>
        <div> 
        <img src={mauve} className="mauve" alt="nabokovs_favourite_word_is_mauve" />
          Filigree is a small, web-based text analyzer that has been produced as part of a final project at a full-stack development bootcamp. The idea of the app first came into being with a book called "Nabokov's Favourite Word is 'Mauve'". In the book, the researcher analyzes different writings of famous writers and tests them on what words they typically use.<br /><br />
  Because of the limited amount of time during this bootcamp to develop the app, it unfortunately cannot boast all the features that the book has set forth. In fact, in its current format, it does not include any analyses of this book.<br /><br />
  However, It's free of charge, simple to use and provides a few interesting alternative features to analyze your text, as well as other peoples texts. When writing, you can use it to set yourself word count, readability or unique words goals, which can be useful when trying to emulate other writers. As a parent or teacher, you can use the analyzer to measure the difficulty of reading samples to give to your kids/students.<br /><br />
  As more analyses become available to the user, the program can very quickly become a powerful tool for research or forensic analysis. Until then, you will need to be satisfied with unique words counts and readability score.<br /><br />
  Ciao ragazzi, I hope you enjoy it!<br /><br />
  Michal
        </div>
      </div>
    );
  }
}

export default InformationFiligree;