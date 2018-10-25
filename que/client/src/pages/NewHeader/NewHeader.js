import React, {Component} from 'react';
import CueSheet from '../CueSheet';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {FormBtn, Input} from '../../components/Form'
import API from '../../utils/API';


class NewHeader extends Component {
    state = {
        productionId: 0,
        productionTitle: "",
        type: "",
        productionDuration: 0,
        musicDuration: 0
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value.trim()
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        if(!Object.values(this.state).includes("")){
            console.log(this.state)

            API.saveCueSheet(this.state)
                .then(function(result){
                    console.log(result)
                })
        }else{

        }
    };

    render() {
        return(
            <Router>
                <div className="container">
                    <h2 className="text-center">Header Form</h2>
                    <form>
                        <Input
                            onChange={this.handleInputChange}
                            name="productionId"
                            placeholder="ProductionID"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="productionTitle"
                            placeholder="Production Title"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="type"
                            placeholder="Type"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="productionDuration"
                            placeholder="Production Duration"
                        />
                        <Input
                            onChange={this.handleInputChange}
                            name="musicDuration"
                            placeholder="Music Duration"
                        />
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