// What does importing component do here ?? Instead of just react 
import React, { Component } from 'react';
import { Container, Row, TableRow } from "../../components/Grid";
import CueCard from "../../components/CueCards"
import ProductionCard from "../../components/ProductionCard"
import API from "../../utils/API"
import { Btn } from "../../components/Icons"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ShareholderForm from "../../components/ShareholderAdd"
import FileUpload from '../../components/FileUpload'

class NewCue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cueSheet: {},
            cues: [],
            dropdownOpen: false,
            modal: false,
            confirmModal: false,
            shareholderName: "",
            ipiNumber: "",
            role: "",
            sharePercent: "",
            affiliation: "",
            cueId: "",
            songId: "",
            shareholderId: ""
        };
    }

    modalToggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    confirmModalToggle = () => {
        this.setState({
            confirmModal: !this.state.confirmModal
        });
    };

    // function to get the cue sheet data
    getCueSheet = () => {
        // console.log(this.props.match.params.id)
        API.getCueSheet(this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({
                    cueSheet: res.data.cueSheet,
                    cues: res.data.cues,
                    shareholderName: "",
                    ipiNumber: "",
                    role: "",
                    sharePercent: "",
                    affiliation: "",
                    cueId: ""
                });

            })
            .then(result => {
                console.log(`result:
               ${this.state.cues}`)
            })
    }

    componentDidMount() {
        this.getCueSheet()
    };

    deleteCue = id => {
        alert(id)
    }

    addShareholder = (cueId, songId) => {
        // console.log(cueId)
        // console.log(this.state.cueId)
        this.modalToggle()
        // modal
        this.setState({
            cueId: cueId,
            songId: songId
        })


    };

    deleteShareholder = (shareholderId, songId) => {
        this.confirmModalToggle();
        console.log(shareholderId)
        console.log(songId)
        this.setState({
            shareholderId:shareholderId,
            songId: songId
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log("here: ", event.target.value)

        this.setState({
            [name]: value
        });
    };


// event handler for when the submit button is selected for 
    handleAddShareholder = event => {
        event.preventDefault();
        // alert(`Shareholder name: ${this.state.shareholderName}
        // IPI Number: ${this.state.ipiNumber}
        // Role: ${this.state.role}
        // share: ${this.state.sharePercent}
        // affiliation: ${this.state.affiliation}
        // cue Id: ${this.state.cueId}`);
        // songId
        // this.setState({ username: "", password: "" });
        API.addShareholder({
            shareholderName: this.state.shareholderName,
            affiliation: this.state.affiliation,
            ipiNumber: this.state.ipiNumber,
            role: this.state.role,
            share: this.state.sharePercent,
            cueId: this.state.cueId,
            songId: this.state.songId

        }).then(res => {
            this.getCueSheet()
            this.modalToggle()
        })
    };

    handleShareholderDelete =(event)=>{
        event.preventDefault();
        console.log({
            shareholderId:this.state.shareholderId,
            songId: this.state.songId
        })

        API.deleteShareholder({
            shareholderId:this.state.shareholderId,
            songId: this.state.songId
        }).then(res =>{
            console.log(res)
        })
    }



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

                <hr></hr>

                <Container>
                    <Row>
                        <FileUpload cueSheetId={this.state.cueSheet.id}/>
                    </Row>
                </Container>

                <hr></hr>
                <Container>
                    <Button color="primary" data-id={this.props.match.params.id}>  Add new cue</Button>
                </Container>
                {this.state.cues.map(cues => (
                    <CueCard
                        key={cues.id}
                        title={cues.song.songTitle}
                        duration={cues.duration}
                        usage={cues.usage}
                        artists={cues.song.artists}
                        deleteId={cues.id}
                        deleteCue={this.deleteCue}
                    >

                        {/* shareholder information  */}
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Shareholder Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Share %</th>
                                    <th scope="col">Affiliation</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody className="cueInfo">
                                {cues.song.shareholders.map(shareholders => (
                                    <TableRow key={shareholders.id}>

                                        <td> {shareholders.shareholderName}</td>
                                        <td> {shareholders.shareholderSongs.role}</td>
                                        <td> {shareholders.shareholderSongs.shares}</td>
                                        <td> {shareholders.affiliation} </td>
                                        <td>

                                            <section>
                                                <Button color="success" onClick={() => { this.deleteShareholder(shareholders.id, cues.songId) }} >delete</Button>
                                                <Modal isOpen={this.state.confirmModal} toggle={this.confirmModalToggle} className={this.props.className}>
                                                    <ModalHeader toggle={this.confirmModalToggle}>Delete Shareholder</ModalHeader>
                                                    <ModalBody>
                                                        Are you sure you want to remove this shareholder?
                                                         </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.handleShareholderDelete}>Yes</Button>{' '}
                                                        <Button color="secondary" onClick={this.confirmModalToggle}>Cancel</Button>
                                                    </ModalFooter>
                                                </Modal>

                                            </section>

                                            {/* <Button> edit</Button> */}
                                        </td>


                                    </TableRow>
                                ))}
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

                        {/* modal */}
                        <section>
                            <Button onClick={() => { this.addShareholder(cues.id, cues.songId) }}> Add a shareholder</Button>
                            {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                            <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
                                <ModalHeader toggle={this.modalToggle}>Add Shareholder</ModalHeader>
                                <ModalBody>
                                    <ShareholderForm

                                        // shareholderValue={this.state.shareholderName}
                                        // roleValue  = {this.state.role}
                                        // ipiValue={this.state.ipiNumber}
                                        // affiliationValue = {this.state.affiliation}
                                        // shareValue = {this.state.sharePercent}
                                        handleChange={this.handleInputChange}
                                    ></ShareholderForm>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.handleAddShareholder}>Submit</Button>{' '}
                                    <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </section>

                    </CueCard>
                ))}

            </div>

        )
    }

}

export default NewCue
