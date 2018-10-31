import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { Button, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



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
                            {/* v2 - allow users to search for existing shareholders  */}
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Shareholder Name</Label>
                                    <Input type="text" name="shareholderName" id="exampleEmail" placeholder="Shareholder Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Role</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                    <option> Select One</option>
                                        <option>Author</option>
                                        <option>Composer</option>
                                        <option>Composer/Author</option>
                                        <option>Publisher</option>
                                        <option>Sub-Publisher</option>
                                    </Input>
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