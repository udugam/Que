import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import API from "../../utils/API"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import downloadCVS from 'download-csv';
import CueTable from '../../components/Tables/CueTable'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
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
        margin: 'auto'
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

function getModalStyle() {
    return {
      top: `50px`,
    };
}




class CueSheet extends Component{
    
    state = {
        cueSheet: [],
        goToCueSheet: false,
        goToCueId: 0,
        userEmail: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        data: [],
        open: false,
        id: 0,
        productionTitle: "",
        productionYear: 0,
        type: "Movie",
        productionDuration: 0,
        musicDuration: 0,
        nextPage: false,
        missingInfo: false,
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(!Object.values(this.state).includes("")){
            API.saveCueSheet(this.state)
                .then(result => {
                    this.setState({ id: result.data.id , nextPage: true })
                })
        }else{
            this.setState({missingInfo: true})
        }
    };
 
    componentDidMount(){
        this.loadCueSheet();
        this.getDownloadInfo(this.state.userEmail);
    }

    loadCueSheet = () => {
        API.getCues(this.state.userEmail)
            .then(result => {
                this.setState({cueSheet: result.data}, () => {
                })
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    goToCue = id =>{
        // console.log(id)
        this.setState({goToCueId: id, goToCueSheet: true})
    }

    getDownloadInfo = id => {
        API.getAllInfo(id)
            .then(result => {
                var data = [];
                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].song.shareholders.length){
                        for(var j = 0; j < result.data[i].song.shareholders.length; j++){
                            var input = {
                                productionTitle: result.data[i].cueSheet.productionTitle,
                                type: result.data[i].cueSheet.type,
                                productionYear: result.data[i].cueSheet.productionYear,
                                productionDuration: result.data[i].cueSheet.productionDuration,
                                musicDuration: result.data[i].cueSheet.musicDuration,
                                cueDuration: result.data[i].duration,
                                usage: result.data[i].usage,
                                songTitle: result.data[i].song.songTitle,
                                fingerprintId: result.data[i].song.fingerprintId,
                                artist: result.data[i].song.artist,
                                affiliation: result.data[i].song.shareholders[j].affiliation,
                                ipiNumber: result.data[i].song.shareholders[j].ipiNumber,
                                shareholderName: result.data[i].song.shareholders[j].shareholderName,
                                role: result.data[i].song.shareholders[j].shareholderSongs.role,
                                shares: result.data[i].song.shareholders[j].shareholderSongs.shares
                            }
                            data.push(input)
                        }
                    }else{
                        var inputLess = {
                            productionTitle: result.data[i].cueSheet.productionTitle,
                            type: result.data[i].cueSheet.type,
                            productionYear: result.data[i].cueSheet.productionYear,
                            productionDuration: result.data[i].cueSheet.productionDuration,
                            musicDuration: result.data[i].cueSheet.musicDuration,
                            cueDuration: result.data[i].duration,
                            usage: result.data[i].usage,
                            songTitle: result.data[i].song.songTitle,
                            fingerprintId: result.data[i].song.fingerprintId,
                            artist: result.data[i].song.artist
                        }
                        data.push(inputLess)
                    }
                }
                this.setState({data: data})
            })
    }

    downloadCSVFile = (name) =>{
        var sendingData = []
        for(var i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].productionTitle === name)
                sendingData.push(this.state.data[i])
        }
        if(sendingData.length === 0){
            alert("You At Least One Cue")
        }else{
            downloadCVS(sendingData)
        }
    }    

    deleteCue = (id) =>{
        API.deleteCueSheet(id)
            .then(result => {
                this.componentDidMount()
            })
    }

    render(){
        
        const { classes } = this.props;

        if(this.state.goToCueSheet === true){
            return <Redirect to={`/cuesheet/${this.state.goToCueId}`}/>
        }else if(this.state.nextPage === true){
            return <Redirect to={`/cuesheet/${this.state.id}`}/>
        }

        return(
            <Router>
                <div className="container">
                    <Button background-color="primary" onClick={this.handleOpen} className={classes.createBtn}>Create Cue Sheet</Button>
                    <h3>Search Cue</h3>
                    <CueTable
                        cueSheet={this.state.cueSheet}
                        goToCue={this.goToCue}
                        downloadFile={this.downloadCSVFile}
                        deleteCue={this.deleteCue}
                    />
                    <Modal
                        style={getModalStyle()}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <form className={classes.paper} noValidate autoComplete="off">  
                            <Typography variant="h6" id="modal-title">
                                New Cue Sheet
                            </Typography> 
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
                                <p></p>
                            )}
                        </form>
                    </Modal>
                </div>

                
            </Router>
        )
    }
}

CueSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CueSheet);