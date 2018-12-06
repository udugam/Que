import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrage from '@material-ui/core/colors/deepOrange';

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


class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        authenticated: null
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

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
        const theme = createMuiTheme({
            palette: {
              primary: deepOrage,
              secondary: {
                main: '#f44336',
              },
            },
          });
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        // function for authentication 
        if (this.state.authenticated === null) return null;

        const LoginButton = this.state.authenticated ? (
            // <button className="btn btn-link" onClick={this.logout}>
            //     Logout
            //     </button>
            <Button color="inherit" onClick={this.logout}>Logout</Button>
        ) : (
                // <button className="btn btn-link" onClick={this.login}>
                //     Login
                // </button>
                <Button color="inherit" onClick={this.login}>Login</Button>
            );



        return (
            <div className={classes.root}>
                {/* <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup> */}
                <AppBar position="sticky">
                    <Toolbar>
                       
                        <Link className="navbar-brand" to="/">
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Que
                        </Typography>
                        </Link>
                        {/* figure out how to float right */}
                        {/* <Typography variant="h6" color="inherit" className={classes.grow}>
                            Cue App
                        </Typography> */}

                        <Link to="/cuesheet">
                            <Button color="inherit">Cue Sheets</Button>
                        </Link>
                        <Link to="/songLibrary">
                            <Button color="inherit">Song Library</Button>
                        </Link>

                        {LoginButton}
                        {/* {auth && (
                            <div>
                                <Button color="inherit">Login</Button>

                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )} */}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withAuth(withStyles(styles)(MenuAppBar));
