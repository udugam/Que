import React from "react";
import { Col, Row, Container } from "../../components/Grid";

const ProductionCard = props => (
    <div>

        <Container>
            <Row>

            {/* Production name, Production #, Type, Production year, Production duration 
            Total musical duration - producers, distributors, directors, principal actors */}
                <Col size="md-12" >
                    <div class="card">
                        <div class="card-header">
                            <strong>{props.productionTitle} </strong> 

                        </div>
                        <div class="card-body">
                       <p> Production Number: {props.productionNumber} <br/>
                       <span>Production Year: {props.ProductionYear}</span> <br/>
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