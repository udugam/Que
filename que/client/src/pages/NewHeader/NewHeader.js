import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CueSheet from '../CueSheet';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Input, Select} from '../../components/Form'
import API from '../../utils/API';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class NewHeader extends Component {

    state = {
        id: 0,
        productionTitle: "",
        productionYear: 0,
        type: "",
        productionDuration: 0,
        musicDuration: 0,
        userEmail:  "",
        nextPage: false,
        missingInfo: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value.trim()
        });
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            userEmail: idToken.idToken.claims.email
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(!Object.values(this.state).includes("")){
            API.saveCueSheet(this.state)
                .then(result => {
                    this.setState({id: result.data.id})
                    this.setState({nextPage: true})
                })
        }else{
            this.setState({missingInfo: true})
        }
    };

    render() {
        const { classes } = this.props;
        if(this.state.nextPage === true){
            return <Redirect to={`/cuesheet/${this.state.id}`}/>
        }
        return(

            <Router>
                <div className="container">
                    <h2 className="text-center">Cue Sheet Form</h2>
                    <form>
                        <Input
                            onChange={this.handleInputChange}
                            name="productionTitle"
                            placeholder="Production Title"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="productionYear"
                            placeholder="Production Year"
                        />
                        <Select
                            onChange={this.handleInputChange}
                            name="type"
                            placeholder="Production Duration"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="productionDuration"
                            placeholder="Production Duration"
                        />
                        <Button
                            color="primary"
                            className={classes.button}
                            onClick={this.handleFormSubmit}    
                        >
                            SUBMIT
                        </Button>
                        <Button color="secondary" className={classes.button}>
                            <a href="/cueSheet">
                                Cancel
                            </a>
                        </Button>
                        <Route exact path="/cueSheet" component={CueSheet}/>
                    </form>
                    {this.state.missingInfo ? (
                        <h4>Missing Infomation</h4>
                    ) : (
                        <p></p>
                    )}
                </div>
            </Router>
        )
    } 
}

NewHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NewHeader);