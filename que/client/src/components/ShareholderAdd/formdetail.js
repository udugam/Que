import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



class ShareholderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };
    // toggle =()=>{

    // }
      
 
    render() {
        return (
            <div>

                <Container>
                    <Row>
                        <Col size="md-12" >
                            {/* shareholder name, role, affiliation, share %,  */}
                            {/* v2 - allow users to search for existing shareholders */}

                            <div>
                                <p>Search or Add a new Shareholder</p>
                                <Form>
                                    <Row>
                                        <FormGroup tag="fieldset">
                                            <Col size="md-4">
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        Shareholder Name
                                             </Label>
                                                </FormGroup>

                                            </Col>
                                            <Col size="md-4">
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        IPI Number
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                    </Row>

                                    <FormGroup>
                                        {/* <Label for="exampleEmail">Search for a shareholder</Label> */}
                                        <Input type="text" name="shareholderName" id="shareholderName" placeholder="Shareholder Name/IPI Number" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </FormGroup>
                                </Form>


                            </div>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Shareholder Name</Label>
                                    <Input onChange={this.props.handleChange} value={this.props.shareholderValue} type="text" name="shareholderName" id="shareholderName" placeholder="Shareholder Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Role</Label>
                                    <Input onChange={this.props.handleChange}  type="select" name="role" id="role">
                                        <option value="default" > Select One</option>
                                        <option value="Author">Author</option>
                                        <option value="Composer">Composer</option>
                                        <option value="Composer/Author">Composer/Author</option>
                                        <option value="Publisher">Publisher</option>
                                        <option value="Sub-Publisher">Sub-Publisher</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Affiliation</Label>
                                    <Input onChange={this.props.handleChange} value={this.props.affiliationValue}  type="text" name="affiliation" id="affiliation" placeholder="Affiliation" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">IPI Number (optional)</Label>
                                    <Input onChange={this.props.handleChange} value={this.props.ipiValue} type="text" name="ipiNumber" id="ipiNumber" placeholder="Add IPI Number (optional)" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Share %</Label>
                                    <Input onChange={this.props.handleChange} value={this.props.shareValue}  type="number" name="sharePercent" id="sharePercent" placeholder="Add Share Percent" />
                                </FormGroup>
                            </Form>

                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default ShareholderForm