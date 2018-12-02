import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import API from "../../utils/API"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import downloadCVS from 'download-csv';
import CueTable from '../../components/Tables/CueTable'
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        float: "right"
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });




class CueSheet extends Component{
    
    state = {
        search: '',
        cueSheet: [],
        goToCueSheet: false,
        goToCueId: 0,
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        data: []
    }
 
    componentDidMount(){
        this.loadCueSheet();
        this.getDownloadInfo(this.state.email);
    }

    loadCueSheet = () => {
        API.getCues(this.state.email)
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
        this.setState({goToCueId: id})
        this.setState({goToCueSheet: true})
    }
    getDownloadInfo = id => {
        API.getAllInfo(id)
            .then(result => {
                console.log(result.data)
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

    render(){
        const { classes } = this.props;

        if(this.state.goToCueSheet === true){
            return <Redirect to={`/cuesheet/${this.state.goToCueId}`}/>
        }

        return(
            <Router>
                <div className="container">
                    <Button color="primary" variant="extendedFab" aria-label="Delete" className={classes.button}>
                        <a href="/newHeader" className="newHeaderBtn">
                            Create Cue Sheets
                        </a>
                        <Route exact path="/newHeader" component={NewHeader}/>
                    </Button>
                    <h3>Search Cue</h3>
                    <CueTable
                        cueSheet={this.state.cueSheet}
                        goToCue={this.goToCue}
                        downloadFile={this.downloadCSVFile}
                    />
                </div>
                
            </Router>
        )
    }
}

CueSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CueSheet);