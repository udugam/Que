import React, {Component} from 'react'
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import CueSheetDetail from '../CueSheetDetail';
import API from "../../utils/API"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {FormBtn, Input} from '../../components/Form'
import {Row} from "../../components/Table"
import downloadCVS from 'download-csv';


class CueSheet extends Component{
    
    state = {
        search: '',
        cueSheet: [],
        goToCueSheet: false,
        goToCueId: 0,
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        headers: [], 
        rows: [],
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
                    console.log(this.state.cueSheet)
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
        console.log(id)
        this.setState({goToCueId: id})
        this.setState({goToCueSheet: true})
    }
    getDownloadInfo = id => {
        API.getAllInfo(id)
            .then(result => {
                console.log(result.data.first)
                console.log(result.data.second)

                var data = [];
                
                for(var i = 0; i < result.data.first.length; i++){
                    for(var j = 0; j < result.data.first[i].cues.length; j++){
                        var index = result.data.second.findIndex(x => x.id === result.data.first[i].cues[j].songId)
                        for(var k = 0; k < result.data.second[index].shareholders.length; k++){
                            var inputing = {
                                productionTitle: result.data.first[i].productionTitle,
                                type: result.data.first[i].type,
                                productionYear: result.data.first[i].productionYear,
                                productionDuration: result.data.first[i].productionDuration,
                                musicDuration: result.data.first[i].musicDuration,
                                cueDuration: result.data.first[i].cues[j].duration,
                                usage: result.data.first[i].cues[j].usage,
                                songTitle: result.data.second[index].songTitle,
                                fingerprintId: result.data.second[index].fingerprintId,
                                artist: result.data.second[index].artist,
                                affiliation: result.data.second[index].shareholders[k].affiliation,
                                ipiNumber: result.data.second[index].shareholders[k].ipiNumber,
                                shareholderName: result.data.second[index].shareholders[k].shareholderName,
                                role: result.data.second[index].shareholders[k].shareholderSongs.role,
                                shares: result.data.second[index].shareholders[k].shareholderSongs.shares,
                            }
                            data.push(inputing)
                        }
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
        downloadCVS(sendingData)
    }    

    render(){
        if(this.state.goToCueSheet === true){
            return <Redirect to={`/cuesheet/${this.state.goToCueId}`}/>
        }

        return(
            <Router>
                <div className="container">
                    <button onClick={() => this.getDownloadInfo(this.state.email)}>
                    {/* <CsvCreator
                            filename='quesheet_csv'
                            headers={this.state.headers}
                            rows={this.state.rows}
                        >
                            <h6>Download CSV</h6>
                        </CsvCreator> */}
                    </button>
                    
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
