import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { Form } from 'reactstrap'
import {TextField, MenuItem} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

const roles = ['Author', 'Composer', 'Composer/Author', 'Publisher', 'Sub-Publisher']

class ShareholderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareholderName:"",
            affiliation:"",
            ipiNumber:"",
            sharePercent:"",
            role:""
            
        };
    };

    handleChange = name => event => {
        this.props.handleShareholderAdd(name, event.target.value)
        this.setState({
            [name]: event.target.value,
        });
    };
      
 
    render() {
        const {shareholderName, affiliation, ipiNumber, sharePercent, role, handleChange} = this.props
        return (
            <div>

                <Container>
                    <Row>
                        <Col size="md-12" >
                            {/* shareholder name, role, affiliation, share %,  */}
                            {/* v2 - allow users to search for existing shareholders */}

                            <Form>
                                {/* might have to add the name attribute to update state - confirm */}
                            <TextField
                                name="shareholderName" 
                                id="shareholderName"
                                required
                                label="Shareholder Name"
                                value={shareholderName}
                                onChange={this.handleChange('shareholderName')}
                                margin="normal"
                                fullWidth
                                // variant="outlined"
                                />
                                <br/>
                                <TextField
                                // required
                                id="role"
                                name="role"
                                label="Role"
                                required
                                select
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                helperText="Please select a Role"
                                value={role}
                                // variant="outlined"
                                > {roles.map(role =>(
                                    <MenuItem key={role} value={role}>{role} </MenuItem>
                                ))}
                                </TextField>
                                <br/>
                                <TextField
                                required
                                label="Affiliation"
                                value={affiliation}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                name="affiliation" 
                                id="affiliation"
                                />
                                      <br/>
                                <TextField
                                label="IPI Number (optional)"
                                value={ipiNumber}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                name="ipiNumber" 
                                id="ipiNumber"
                                />
                                      <br/>
                                <TextField
                                required
                                label="Share Percent"
                                value={sharePercent}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                                fullWidth
                                name="sharePercent" 
                                id="sharePercent"
                                />

                              
                              
                            </Form>

                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default withStyles(styles)(ShareholderForm)