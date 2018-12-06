import React, { Component, Fragment } from "react";
// import { Label, Input, FormGroup } from 'reactstrap'
import { TextField, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

const usages =
    [
        'Background Instrumental',
        'Background Vocal',
        'Feature Instrumental',
        'Feature Vocal',
        'Theme',
        'Logo'
    ]

class CueAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usage: '',
            duration: ''

        };
    };
    handleChange = name => event => {
        // console.log("name: ", name)
        // console.log("event: ", event.target.value)
        this.props.handleCueAdd(name, event.target.value)
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { usage, cueDuration } = this.props
        return (

            <Fragment>
                <TextField
                    required
                    // name="usage" 
                    id="usage"
                    label="Usage"
                    select
                    onChange={this.handleChange('usage')}
                    margin="normal"
                    fullWidth
                    helperText="Please select a usage"
                    value={usage}
                // value={this.state.usage}
                // variant="outlined"
                > {usages.map(usage => (
                    <MenuItem key={usage} value={usage}>{usage} </MenuItem>
                ))}
                </TextField>
                <br />
                {/* only support seconds for now - change to hrs and mins */}
                <TextField
                    type="number"
                    // name="duration"
                    id="cueduration"
                    required
                    label="Duration"
                    value={cueDuration}
                    // value={this.state.duration}
                    onChange={this.handleChange('cueDuration')}
                    margin="normal"
                    fullWidth
                // variant="outlined"
                />
            </Fragment>
            /* <FormGroup>
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
            
                <Label check> Duration  </Label>
                <Input defaultValue={this.props.durationValue} onChange={this.props.handleChange} type="number" name="duration" />{' '}
            </FormGroup> */

        )
    }
}

export default withStyles(styles)(CueAdd)