import React,{Component} from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PrimaryButton from '../ButtonsAndIcons/PrimaryButton';

const styles = theme =>({
    text:{
        color: theme.palette.primary
    }
})

class WelcomeUser extends Component {

    state = {
        currentUserName: '',
        currentUserEmail: ''
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        });
    }

    render() {
        const messageStyle = {
            width: '30vw',
            height: '30vh',
            position: 'fixed',
            top: '30vh',
            left: '35vw',
            textAlign: 'center'
        }
        const {classes} = this.props
        const { currentUserEmail, currentUserName } = this.state;

        return (
            <div style={messageStyle}>
                <Typography variant='h2' className={classes.text}>
                    Welcome
                </Typography>
                <Typography variant='h5' className={classes.text}>
                    You are Logged-in as: {currentUserEmail}
                </Typography>
                <Link to="/cuesheet">
                    <PrimaryButton name='Create new Cuesheet!' />
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(WelcomeUser)