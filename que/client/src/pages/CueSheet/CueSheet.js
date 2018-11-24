import React, {Component} from 'react'
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import API from "../../utils/API"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {Row} from "../../components/Table"
import downloadCVS from 'download-csv';


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
        if(this.state.goToCueSheet === true){
            return <Redirect to={`/cuesheet/${this.state.goToCueId}`}/>
        }

        return(
            <Router>
                <div className="container">
                    <button className="btn btn-secondary float-right">
                        <a href="/newHeader" className="newHeaderBtn">
                            <h6>Create Cue Sheets</h6>
                        </a>
                        <Route exact path="/newHeader" component={NewHeader}/>
                    </button>
                    <h3>Search Cue</h3>
                    {/* <form>
                        <Input
                            value={this.state.search}
                            onChange={this.handleInputChange}
                            name="search"
                            placeholder="search"
                        />
                        <Input
                            value={this.state.search}
                            onChange={this.handleInputChange}
                            name="search"
                            placeholder="search"
                        />
                        <FormBtn
                            onClick={this.handleFormSubmit}    
                        >
                            SUBMIT
                        </FormBtn>

                    </form> */}
                
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Production Title</th>
                                <th scope="col">Type</th>
                                <th scope="col">Production Duration</th>
                                <th scope="col">Music Duration</th>
                                <th scope="col">Edit Cue</th>
                                <th scope="col">Download CSV</th>
                            </tr>
                        </thead>
                        <tbody className="cueInfo">
                            {/* Cue info */}
                            {this.state.cueSheet.map(cues => {
                                return(
                                    <Row 
                                        key={cues.id}
                                        productionId={cues.id}
                                        productionTitle={cues.productionTitle}
                                        type={cues.type}
                                        productionDuration={cues.productionDuration}
                                        musicDuration={cues.musicDuration}
                                        goToCue={this.goToCue}
                                        downloadFile={this.downloadCSVFile}
                                    />
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </Router>
        )
    }
}

export default CueSheet
