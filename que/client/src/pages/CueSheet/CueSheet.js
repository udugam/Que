import React, {Component} from 'react'
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import CsvCreator from 'react-csv-creator';
import CueSheetDetail from '../CueSheetDetail';
import API from "../../utils/API"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {FormBtn, Input} from '../../components/Form'
import {Row} from "../../components/Table"


class CueSheet extends Component{
    
    state = {
        search: '',
        cueSheet: [],
        goToCueSheet: false,
        goToCueId: 0,
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        headers: [
            {id: "first",
            display: 'First column' },
            {id: "second",
            display: 'second column' }
        ], 
        test: [{
            first: 'foo',
            second: 'bar'
          }, {
            first: 'foobar',
            second: null
          }]
    }
 
    componentDidMount(){
        this.loadCueSheet();
    }

    loadCueSheet = () => {
        API.getCues(this.state.email)
            .then(result => {
                console.log(result)
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
                console.log(result)
            })
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
                                <th scope="col">Production Id</th>
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
