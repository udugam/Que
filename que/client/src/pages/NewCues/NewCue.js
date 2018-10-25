// What does importing component do here ?? Instead of just react 
import React, {Component} from 'react';
import { Container, Row, Col } from "../../components/Grid";
import CueCard from "../../components/CueCards"
import ProductionCard from "../../components/ProductionCard"

class NewCue extends Component {

    render(){
        return (
            <div>
                {/* We can have a condition to display a new text if it is new or just Cue sheet
                 if its existing */}

                 <Container>
                     <Row>
                     <h1> New Cue Sheet </h1>
                     </Row>
                 </Container>
               

                <ProductionCard productionTitle={"Test Production"}/>
              
                <Container>
                CUE DETAILS
                </Container>
                
                <hr></hr>

                 <CueCard  title="test title" >
                
                 </CueCard>
                
                
          
            </div>
           
        )
    }

}

export default NewCue
