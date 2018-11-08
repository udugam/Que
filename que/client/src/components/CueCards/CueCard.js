import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



class CueCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    };
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {
        return (
            <div>

                <Container>
                    <Row>

                        {/* Sequence #, Title, Usage, Cue duration 
            shareholder name, share%, Affiliation*/}
                        <Col size="md-12" >
                            <div className="card" style={{ marginTop: 30 }}>
                                <div className="card-header" >
                                    <strong>{this.props.title} </strong>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Modify
                                         </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => { this.props.editCue(this.props) }}>Edit</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={() => { this.props.deleteCue(this.props.cueId) }}>Delete</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                </div>
                                <div data-songid={this.props.songId} className="card-body">
                                    Artist(s): {this.props.artists} <br></br>
                                    Duration: {this.props.duration}
                                    <br></br>
                                    Usage: {this.props.usage}

                                </div>
                                {this.props.children}

                            </div>

                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default CueCard