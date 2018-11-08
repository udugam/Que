import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser.js'

export default withAuth(

    class Home extends React.Component {
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

        render() {
            if (this.state.authenticated === null) return null;

            const homeContent = this.state.authenticated ? (
                <div>
                    <WelcomeUser />
                    <p>
                        <Link to="/cuesheet"><button>Create new Cuesheet!</button></Link>
                    </p>
                </div>
            ) : (
                <div>
                </div>
            );

            return (
                <div className="jumbotron">
                    <h2 className="display-4">Cue App</h2>
                    <p> {homeContent} </p>
                </div>
            );
        }
    }
);