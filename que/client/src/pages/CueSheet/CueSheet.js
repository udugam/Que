import React from 'react'
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const CueSheet = ()=> (
    <Router>
        <div className="container">
            <button className="btn btn-secondary float-right">
                <a href="/newHeader" className="newHeaderBtn">
                    New Header
                </a>
                <Route exact path="/newHeader" component={NewHeader}/>
            </button>
            <form>
                <div className="form-group">
                    <h2 className="text-md-left">Search Cue</h2>
                    <input className="form-control"/>
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button>
            </form>


            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    <tbody className="cueInfo">
                        {/* Cue info */}
                    </tbody>
                </thead>
            </table>
        </div>
    </Router>



)

export default CueSheet