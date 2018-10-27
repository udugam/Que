import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import {Btn} from "../../components/Icons"

const ProductionCard = props => (
    <div>

        <Container>
            <Row>

            {/* Production name, Production #, Type, Production year, Production duration 
            Total musical duration - producers, distributors, directors, principal actors */}
                <Col size="md-12" >
                    <div className="card">
                        <div className="card-header">
                            <strong>{props.productionTitle} </strong> 

                        </div>
                        <div className="card-body">
                       <p> Production Number: {props.productionNumber} <br/>
                       Type: {props.productionType} <br></br>
                       <span>Production Year: {props.productionYear}</span> <br/>
                       Production duration: {props.productionDuration} <br/>
                       Total Musical Duration: {props.totalMusicalDuration}
                       
                       </p>
            

                        </div>



                    </div>

                </Col>
            </Row>

        </Container>

    </div>
)

export default ProductionCard