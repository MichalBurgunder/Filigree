import React, { Component } from 'react';
import '../../../App.css';

class About extends Component {
  render() {
    return (
      <div className="homeContainer">
      <h1>
        About Filigree
        </h1>
          Like many other websites on the internet, this website is free of charge, without hidden costs. I have built this website as part of a project at Propulsion Academy, a full-stack development bootcamp. You can read more about their excellent program <a href="https://propulsionacademy.com/">here.</a><br /><br />
          As I move on with my career, this website will only rarely be updated. This is not to say that you cannot anaylze your texts any further than what is here; There are plenty of websites online that you can use get more in depth analyses of your text. 
          You can find an overview of these on <a href="https://www.softwareadvice.com/resources/easiest-to-use-free-and-open-source-text-analysis-software/"> this Website</a>. 
          Because I only spent 3 weeks to build this website from scratch, virtually any other text analyzer that you can find will have more functionality and be more robust (especially those tools which have been worked on across many years). <br /><br />
          If you have questions, concerns, opinions or anything else, please feel free to contact me: michal_burgunder@yahoo.com
          
        </div>
    );
  }
}

export default About;