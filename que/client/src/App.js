import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'

const App = ()=> (
  <Router>
    <div>
      {/* <Nav /> We'll import the navbar here*/}
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </Router>
)

export default App;
