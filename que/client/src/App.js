import React from 'react';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home';
import CueSheet from './pages/CueSheet';
import NewHeader from './pages/NewHeader';
import CueSheetDetail from './pages/CueSheetDetail';
import SongLibrary from './pages/SongLibrary'
import Login from './components/auth/Login';
import Navbar from './layout/Navbar';

function onAuthRequired({history}) {
    history.push('/login');
}

const App = () => (
    <Router>
        <div>
            <CssBaseline/>
            <Security
                issuer="https://dev-287479.oktapreview.com/oauth2/default"
                client_id="0oagzd7j0ikYq5pVJ0h7"
                redirect_uri={window.location.origin + '/implicit/callback'}
                onAuthRequired={onAuthRequired}
            >
            {/* SecureRoute -- instead of Route */}
                <Navbar/>
                <Route exact path="/" component={Home}/>
                <SecureRoute exact path="/cuesheet" component={CueSheet}/>
                <SecureRoute exact path="/newheader" component={NewHeader}/>
                <SecureRoute exact path="/cuesheet/:id" component={CueSheetDetail}/>
                <SecureRoute exact path="/songLibrary" component={SongLibrary}/>
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