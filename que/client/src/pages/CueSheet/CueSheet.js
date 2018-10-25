import React, {Component} from 'react'
import "./CueSheet.css"
import NewHeader from "../NewHeader"
import API from "../../utils/API"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {FormBtn, Input} from '../../components/Form'


class CueSheet extends Component{
    
    state = {
        search: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getsomething();
        // console.log(this.state)
        // if (this.state.title && this.state.author) {
        //     API.saveBook({
        //     title: this.state.title,
        //     author: this.state.author,
        //     synopsis: this.state.synopsis
        //     })
        //     .then(res => this.loadBooks())
        //     .catch(err => console.log(err));
        // }
    };
    
    render(){
        return(
            <Router>
                <div className="container">
                    <button className="btn btn-secondary float-right">
                        <a href="/newHeader" className="newHeaderBtn">
                            New Header
                        </a>
                        <Route exact path="/newHeader" component={NewHeader}/>
                    </button>
                    <form>
                        <h3>Search Cue</h3>
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
                        </thead>
                        <tbody className="cueInfo">
                            {/* Cue info */}
                        </tbody>
                    </table>
                </div>
            </Router>
        )
    }
}

export default CueSheet