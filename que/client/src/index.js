import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { deepOrange, amber, red } from "@material-ui/core/colors";
// import * as Sentry from '@sentry/browser';

//Initializes Sentry to track errors on the frontend
// Sentry.init({dsn: "https://d3487404651c418bbc3ba3d2b5720c4a@sentry.io/1319256"});


const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#0C0C2F',
        },
        secondary: {
          main: '#f4511e',
        },
      },
  });

ReactDOM.render(
<MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
