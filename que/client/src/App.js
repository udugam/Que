import React from 'react';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import CueSheet from './pages/CueSheet';
import NewHeader from './pages/NewHeader';
import CueSheetDetail from './pages/CueSheetDetail';
import Login from './components/auth/Login';
import Navbar from './layout/Navbar';

function onAuthRequired({history}) {
    history.push('/login');
}

const App = () => (
    <Router>
        <div>
            <Security
                issuer="https://dev-287479.oktapreview.com/oauth2/default"
                client_id="0oagzd7j0ikYq5pVJ0h7"
                redirect_uri={window.location.origin + '/implicit/callback'}
                onAuthRequired={onAuthRequired}
            >
                <Navbar/>
                <Route exact path="/" component={Home}/>
                <SecureRoute exact path="/cuesheet" component={CueSheet}/>
                <SecureRoute exact path="/newheader" component={NewHeader}/>
                <SecureRoute exact path="/cuesheet/:id" component={CueSheetDetail}/>
                <Route
                    path="/login"
                    render={() => (
                        <Login baseUrl="https://dev-287479.oktapreview.com"/>
                    )}
                />
                <Route path="/implicit/callback" component={ImplicitCallback}/>
            </Security>

        </div>
    </Router>
);

export default App;