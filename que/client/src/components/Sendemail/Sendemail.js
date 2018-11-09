import React,{Component} from 'react';
import API from '../../utils/API';


class Sendemail extends Component {

    state = {
        UserName: '',
        UserEmail: ''
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            UserEmail: idToken.idToken.claims.email,
            UserName: idToken.idToken.claims.name
        });
           }

    handleSendEmail = event => {
        event.preventDefault();
        const { UserEmail, UserName } = this.state;
        let emailData = {
            toName: UserName,
            toEmail: 'cue_app@mailinator.com',
            message: 'Hello ' + UserName + '! Your Cue Sheet is Ready! Thank you for your patience!',
            subject: "Cue Sheet Is Ready"
        };
        API.sendEmail(emailData)
            .then(result => {
                if(result && result.data.msg === 'success') {
                    console.log('Your message has been sent. Check your email.');
                } else {
                    console.log('Error. Message has not been sent.');
                }
            })
    };

    render() {

        return (
            <button className="btn btn-danger float-right" onClick={this.handleSendEmail}  >
                Send Email
            </button>
        );
    }
}

export default Sendemail