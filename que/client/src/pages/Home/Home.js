import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser.js'
import Sendemail from '../../components/Sendemail/Sendemail.js'
import VideoCover from 'react-video-cover'
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage.js'


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
            const videoStyle = {
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
              };

            if (this.state.authenticated === null) return null;

            const videoOptions = {
                src: 'https://staging.coverr.co/s3/mp4/Major-Tom.mp4',
                autoPlay: true,
                loop: true,
            }

            const homeContent = this.state.authenticated ? (
                <div>
                    <WelcomeUser />
                </div>
            ) : (
                <div style={videoStyle}>
                    <VideoCover videoOptions={videoOptions}/>
                    <WelcomeMessage />
                </div>
            );

            

            return (
                // <div className="jumbotron">
                //     <h2 className="display-4">Cue App</h2>
                // </div>
                    <div> {homeContent} </div>
            );
        }

        
    }
);
