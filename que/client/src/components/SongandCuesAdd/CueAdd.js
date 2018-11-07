import React, { Component } from "react";
import { Label, Input, FormGroup } from 'reactstrap'

class CueAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="exampleSelect">Usage</Label>
                    <Input defaultValue={this.props.usageValue} onChange={this.props.handleChange} type="select" name="usage" id="usage">
                        <option value="default" > Select One</option>
                        <option value="Background Instrumental">Background Instrumental</option>
                        <option value="Background Vocal">Background Vocal</option>
                        <option value="Feature Instrumental">Feature Instrumental</option>
                        <option value="Feature Vocal">Feature Vocal</option>
                        <option value="Theme">Theme</option>
                        <option value="Logo">Logo</option>

                    </Input>
                </FormGroup>
                <FormGroup>
                    {/* only support seconds for now - change to hrs and mins */}
                    <Label check> Duration  </Label>
                    <Input defaultValue={this.props.durationValue} onChange={this.props.handleChange} type="number" name="duration" />{' '}
                </FormGroup>


            </div>
        )
    }
}

export default CueAdd