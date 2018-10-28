// What does importing component do here ?? Instead of just react 
import React, { Component } from 'react';
import { Container, Row, TableRow } from "../../components/Grid";
import CueCard from "../../components/CueCards"
import ProductionCard from "../../components/ProductionCard"
import API from "../../components/API/API"
import { Btn } from "../../components/Icons"

class NewCue extends Component {

    state = {
        cueSheet: {},
        cues: []
    }

    handleFileUpload() {
        API.sendFile()
    }

    componentDidMount() {
        // console.log(this.props.match.params.id)
        API.getCueSheet(this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({ cueSheet: res.data.cueSheet, cues: res.data.cues });
                // console.log(`${res.data.cues}`)
            })
            .then(result =>{
                console.log(`result:
                ${this.state.cues}`)
            })
    
    };

    render() {
        return (
            <div>
                {/* We can have a condition to display a new text if it is new or just Cue sheet
                 if its existing */}

                <Container>
                    <Row>
                        <h1> New Cue Sheet </h1>
                    </Row>
                </Container>


                <ProductionCard productionTitle={this.state.cueSheet.productionTitle}
                    productionNumber={this.state.cueSheet.id}
                    productionYear={this.state.cueSheet.productionYear}
                    productionDuration={this.state.cueSheet.productionDuration}
                    totalMusicalDuration={this.state.cueSheet.musicDuration} />


                <Container>
                    CUE DETAILS
                {/* button */}
                    <br></br>
                    <Row>
                        {/* <div className="file btn btn-lg btn-primary">
                            Upload

							<input type="file" name="file" />
                        </div> */}
                        <div>
                            <form ref='uploadForm' 
                                id='uploadForm' 
                                action='/api/upload' 
                                method='post' 
                                encType="multipart/form-data">
                                    <input type="file" name="audioFile" />
                                    <input type='submit' value='Upload!' />
                            </form>   
                        </div>


                        <Btn data-id={this.props.match.params.id}>Add new</Btn>
                    </Row>


                </Container>

                <hr></hr>

                {this.state.cues.map(cues => (
                    <CueCard
                        key={cues.id}
                        title={cues.song.songTitle}
                        duration={cues.duration}
                        usage={cues.usage}>
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
                                {/* {this.cues.song.shareholders.map(shareholders =>(
                                  <TableRow></TableRow>
                                ))} */}
                                {/* <tr>
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
                                </tr> */}
                            </tbody>

                        </table>

                    </CueCard>
                ))}

            </div>

        )
    }

}

export default NewCue
