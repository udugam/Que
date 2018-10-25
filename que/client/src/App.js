import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import CueSheet from './pages/CueSheet';
import NewHeader from './pages/NewHeader';
import NewCue from './pages/NewCues'

const App = ()=> (
  <Router>
    <div>
      {/* <Nav /> We'll import the navbar here*/}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cuesheet" component={CueSheet}/>
        <Route exact path="/newheader" component={NewHeader}/>
        <Route exact path="/newcue" component={NewCue}/>
      </Switch>
    </div>
  </Router>
)

export default App;
