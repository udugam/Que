import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CueSheet from '../CueSheet';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Input, Select} from '../../components/Form'
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    createBtn: {
        margin: theme.spacing.unit,
        float: "right",
        backgroundColor: '#0c0d2d',
        color: 'white'
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: '#0c0d2d',
        color: 'white'
    },
    input: {
      display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%',
    },
    paper: {
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        margin: 'auto',
      },
  });

const type = [
    {
        value: 'Movie',
        label: 'Movie',
    },
    {
        value: 'Series',
        label: 'Series',
    },
    {
        value: 'Podcast',
        label: 'Podcast',
    },
    {
        value: 'Radio',
        label: 'Radio',
    },
];

class NewHeader extends Component {

    state = {
        id: 0,
        productionTitle: "",
        productionYear: 0,
        type: "Movie",
        productionDuration: 0,
        musicDuration: 0,
        userEmail:  "",
        nextPage: false,
        missingInfo: false,
        open: false,
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };

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
                    this.handleClose();
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
                <div>
                    <Button background-color="primary" onClick={this.handleOpen} className={classes.createBtn}>Create Cue Sheet</Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <form className={classes.paper} noValidate autoComplete="off">   
                            <TextField
                                onChange={this.handleInputChange}
                                name="productionTitle"
                                placeholder="Production Title"
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                onChange={this.handleInputChange}
                                name="productionYear"
                                placeholder="Production Year"
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                name="type"
                                select
                                className={classes.textField}
                                value={this.state.type}
                                onChange={this.handleInputChange}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                >
                                {type.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                onChange={this.handleInputChange}
                                name="productionDuration"
                                placeholder="Production Duration"
                                margin="normal"
                                className={classes.textField}
                            />
                            <Button
                                color="primary"
                                className={classes.button}
                                onClick={this.handleFormSubmit}   
                            >
                                    Submit
                            </Button>
                            {this.state.missingInfo ? (
                                <h4>Missing Infomation</h4>
                            ) : (
                                <Redirect to={`/cuesheet/${this.state.id}`}/>
                            )}
                        </form>
                    </Modal>
                </div>
            </Router>
        )
    } 
}

NewHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NewHeader);