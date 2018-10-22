import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import CueSheet from './pages/CueSheet';
import NewHeader from './pages/NewHeader';

const App = ()=> (
  <Router>
    <div>
      {/* <Nav /> We'll import the navbar here*/}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cuesheet" component={CueSheet}/>
        <Route exact path="/newheader" component={NewHeader}/>
      </Switch>
    </div>
  </Router>
)

export default App;
