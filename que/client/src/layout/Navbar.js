import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import NavBarNewLayout from './NavBarNewLayout'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

export default withAuth(
    class Navbar extends React.Component {

        state = { authenticated: null };
        checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();
            if (authenticated !== this.state.authenticated) {
                this.setState({ authenticated });
            }
        };

        async componentDidMount() {
            this.checkAuthentication();
        }

        async componentDidUpdate() {
            this.checkAuthentication();
        }

        login = async () => {
            this.props.auth.login('/');
        };

        logout = async () => {
            this.props.auth.logout('/');
        };
        render() {
            const { classes } = this.props;
            if (this.state.authenticated === null) return null;

            const LoginButton = this.state.authenticated ? (
                <button className="btn btn-link" onClick={this.logout}>
                    Logout
                </button>
            ) : (
                    <button className="btn btn-link" onClick={this.login}>
                        Login
                </button>
                );
            return (
                <div>
                    {/* <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                        <div className="container">
                            <Link className="navbar-brand" to="/">
                                Cue App
                        </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            Home
                                    </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cuesheet">
                                            Create CueSheet
                                </Link>
                                    </li>
                                    <li className="nav-item">
                                        {LoginButton}
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav> */}
                    {/* new nav test */}
                
                    <NavBarNewLayout/>
                    
                </div>
            

            );
        }
    }
);

