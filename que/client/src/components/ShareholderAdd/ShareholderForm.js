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
            
        };
    };
    // toggle =()=>{

    // }
      
 
    render() {
        const {shareholderValue, handleChange, affiliationValue, ipiValue, shareValue, role} = this.props
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
                                value={shareholderValue}
                                onChange={handleChange}
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
                                value={affiliationValue}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                name="affiliation" 
                                id="affiliation"
                                // variant="outlined"
                                />
                                      <br/>
                                <TextField
                                label="IPI Number (optional)"
                                value={ipiValue}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                name="ipiNumber" 
                                id="ipiNumber"
                                // variant="outlined"
                                />
                                      <br/>
                                <TextField
                                required
                                label="Share Percent"
                                value={shareValue}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                                fullWidth
                                name="sharePercent" 
                                id="sharePercent"
                                // variant="outlined"
                                />

                              
                                {/* <FormGroup>
                                    <Label for="exampleSelect">Role</Label>
                                    <Input onChange={this.props.handleChange}  type="select" name="role" id="role">
                                        <option value="default" > Select One</option>
                                        <option value="Author">Author</option>
                                        <option value="Composer">Composer</option>
                                        <option value="Composer/Author">Composer/Author</option>
                                        <option value="Publisher">Publisher</option>
                                        <option value="Sub-Publisher">Sub-Publisher</option>
                                    </Input>
                                </FormGroup> */}
                              
                              
                            </Form>

                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default withStyles(styles)(ShareholderForm)