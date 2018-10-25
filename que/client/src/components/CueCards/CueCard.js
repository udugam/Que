import React from "react";
import { Col, Row, Container } from "../../components/Grid";

const CueCard = props => (
    <div>

        <Container>
            <Row>

                This a test from cue card

            {/* Sequence #, Title, Usage, Cue duration 
            shareholder name, share%, Affiliation*/}
                <Col size="md-12" >
                    <div class="card">
                        <div class="card-header">
                            <strong>{props.title} </strong>

                        </div>
                        <div class="card-body">
                            data

                        </div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Shareholder Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Share %</th>
                                    <th scope="col">Affiliation</th>

                                </tr>
                            </thead>
                            <tbody className="cueInfo">
                                <tr>
                                    <td >Test Name</td>
                                    <td > CA - Publisher </td>
                                    <td >50%</td>
                                    <td >SOCAN</td>
                                </tr>
                                <tr>
                                    <td >Test Name</td>
                                    <td > CA - Publisher </td>
                                    <td >50%</td>
                                    <td >SOCAN</td>
                                </tr>
                            </tbody>

                        </table>
                        <div class="card-body">
                            data

                        </div>


                    </div>

                </Col>
            </Row>

        </Container>

    </div>
)

export default CueCard