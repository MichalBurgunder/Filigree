import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/index.js';

import './App.css';

import Layout from './components/container/Layout'

import QuickAnalysis from './components/container/QuickAnalysis';
import InformationFiligree from './components/container/InformationFiligree';
import About from './components/container/About';
import FAQ from './components/container/FAQ';

import Registration from './components/container/Registration/Registration';
import ConfirmCode from './components/container/Registration/ConfirmCode';

import Login from './components/container/Login/LoginLogin/index.js'
import ForgotPassword from './components/container/Login/ForgotPassword';

import AnalysisHistory from './components/container/LoginPages/Analysis/AnalysisHistory';
import MyBatches from './components/container/LoginPages/Analysis/MyBatches';
import NewBatch from './components/container/LoginPages/Analysis/NewBatch';
import MyTexts from './components/container/LoginPages/Analysis/MyTexts';
import NewText from './components/container/LoginPages/Analysis/NewText'
import Account from './components/container/LoginPages/Account';
import DeleteAccountValidation from './components/container/LoginPages/Account/DeleteAccountValidation'
import Logout from './components/container/LoginPages/Logout';

import { fetchTexts, fetchBatches, fetchHistory } from "./store/actions/index"

import { refreshToken, verifyAccessToken } from "./helpers"

store.dispatch(fetchTexts())
store.dispatch(fetchBatches())
store.dispatch(fetchHistory())

class App extends Component {

  componentDidMount() {
    setTimeout(() => {
        try {
            verifyAccessToken()
                .then(data => {
                })
        } catch (e) {
            try {
                refreshToken()
                    .then(data => {
                    })
            } catch (e) {
            }
        }
    }, 2000);
};
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Layout>
              <Route exact path='/' component={QuickAnalysis} />
              <Route exact path='/info' component={InformationFiligree} />
              <Route exact path='/about' component={About} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/registration' component={Registration} />
              <Route exact path='/registration/validation/' component={ConfirmCode} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgotten-password' component={ForgotPassword} />
              <Route exact path='/my_analyses' component={AnalysisHistory} />
              <Route exact path='/my_batches' component={MyBatches} />
              <Route exact path='/my_texts' component={MyTexts} />
              <Route exact path='/new_batch' component={NewBatch} />
              <Route exact path='/new_text' component={NewText} />
              <Route exact path='/account' component={Account} />
              <Route exact path='/deletion_validation' component={DeleteAccountValidation} />
              <Route exact path='/logout' component={Logout} />
            </Layout>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
