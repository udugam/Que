import React, {Component} from 'react';
import CueSheet from '../CueSheet';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {FormBtn, Input} from '../../components/Form'


class NewHeader extends Component {
    state = {
        name: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)
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

    render() {
        return(
            <Router>
                <div className="container">
                    <h2 className="text-center">Header Form</h2>
                    <form>
                        <Input
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            name="name"
                            placeholder="Name"
                        />
                        <Input/>
                        <Input/>
                        <Input/>
                        <FormBtn
                            onClick={this.handleFormSubmit}    
                        >
                            SUBMIT
                        </FormBtn>
                        <button className="btn btn-secondary float-right">
                            <a href="/cueSheet">
                                Cancel
                            </a>
                        </button>
                        <Route exact path="/cueSheet" component={CueSheet}/>
                    </form>
                </div>
            </Router>
        )
    } 
}

export default NewHeader