import React, { Component } from 'react';
import {Route, Switch, withRouter } from 'react-router-dom'
import './App.css';
import Landing from './Components/Landing'
import ResultsCont from './Components/ResultsCont';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Switch>
         <Route path="/" component={Landing}/>
         <Route exact path="/results" component={ResultsCont}/>
       </Switch>
      </div>
    );
  }
}

export default withRouter(App);
