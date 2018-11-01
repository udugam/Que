import React, {Component} from 'react';
import CueSheet from '../CueSheet';
import CueSheetDetail from '../CueSheetDetail';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {FormBtn, Input, Select} from '../../components/Form'
import API from '../../utils/API';


class NewHeader extends Component {
    state = {
        id: 0,
        productionTitle: "",
        type: "",
        productionDuration: 0,
        musicDuration: 0,
        nextPage: false,
        missingInfo: false
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
            API.saveCueSheet(this.state)
                .then(result => {
                    this.setState({id: result.data.id})
                    this.setState({nextPage: true})
                })
        }else{
            this.setState({missingInfo: true})
        }
    };

    render() {
        if(this.state.nextPage === true){
            return <Redirect to={`/cuesheet/${this.state.id}`}/>
        }
        return(

            <Router>
                <div className="container">
                    <h2 className="text-center">Header Form</h2>
                    <form>
                        <Input
                            onChange={this.handleInputChange}
                            name="productionTitle"
                            placeholder="Production Title"
                        />
                        <Select
                            onChange={this.handleInputChange}
                            name="type"
                            placeholder="Production Duration"
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
                        <Route exact path="/cueSheet/" component={CueSheetDetail}/>
                    </form>
                    {this.state.missingInfo ? (
                        <h4>Missing Infomation</h4>
                    ) : (
                        <p></p>
                    )}
                </div>
            </Router>
        )
    } 
}

export default NewHeader