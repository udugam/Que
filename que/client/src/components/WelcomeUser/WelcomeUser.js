import React,{Component} from 'react'

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
        const { currentUserEmail, currentUserName } = this.state;

        return (
            <div>
                <p>Welcome {currentUserName}</p>
                <p>You are Logged-in now with Email: {currentUserEmail}</p>
            </div>
        );
    }
}

export default WelcomeUser