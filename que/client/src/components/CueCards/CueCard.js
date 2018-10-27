import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Btn } from "../../components/Icons"

const CueCard = props => (
    <div>

        <Container>
            <Row>


            {/* Sequence #, Title, Usage, Cue duration 
            shareholder name, share%, Affiliation*/}
                <Col size="md-12" >
                    <div className="card" style={{marginTop:30}}>
                        <div className="card-header" >
                            <strong>{props.title} </strong>
                            <Btn> Delete</Btn>
                        </div>
                        <div class="card-body">
                            Duration: {props.duration}
                            <br></br>
                            Usage: {props.usage}

                        </div>
                    {props.children}
                        {/* <div className="card-body">
                            data

                        </div> */}


                    </div>

                </Col>
            </Row>

        </Container>

    </div>
)

export default CueCard