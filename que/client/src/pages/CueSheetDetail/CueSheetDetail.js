// What does importing component do here ?? Instead of just react 
import React, { Component } from 'react';
import { Container, Row, TableRow } from "../../components/Grid";
import CueCard from "../../components/CueCards"
import ProductionCard from "../../components/ProductionCard"
import API from "../../utils/API"
import { Btn } from "../../components/Icons"
import ShareholderForm from "../../components/ShareholderAdd"
import ModalEx from "../../components/ModalsExample/ModalsEx"
import SongsAdd from "../../components/SongandCuesAdd/SongsAdd"
import CueAdd from "../../components/SongandCuesAdd/CueAdd"
import ModalNb from "../../components/ModalsExample/ModalNb"
// import ButtonIons from "react-ions/lib/components/Button"
// import InlineEdit from 'react-ions/lib/components/InlineEdit'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


// NEED TO ADD VALIDATION TO FORM SUBMISSIONS

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
            shareholderId: "",
            isEditing: false,
            value: "example value",
            textInput: "example default",
            addCueModal: false,
            deleteCueModal: false,
            editCueModal: false,
            songTitleValue:"",
            artistNameValue: "",
            usageValue:"",
            durationValue:""

        };
        this.theTextInput = React.createRef();
    }

    // this is a generic modal trigger that will take in a paramter and update the modal 
    modalToggle = (modalParam) => {
        // console.log(this.state[modalParam])
        this.setState({
            [modalParam]: !this.state[modalParam]
            // modal: !this.state.modal
        });
        // console.log(this.state[modalParam])
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
                // console.log(res.data)
                this.setState({
                    cueSheet: res.data.cueSheet,
                    cues: res.data.cues,
                    shareholderName: "",
                    ipiNumber: "",
                    role: "",
                    sharePercent: "",
                    affiliation: "",
                    cueId: "",
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
        // alert(id)
        this.modalToggle("deleteCueModal")
       this.setState({
           cueId: id
       })
    }

    editCue = (props)=>{
        
        console.log("songId: ",props.songId)
        this.modalToggle("editCueModal")
        this.setState({
            cueId: props.cueId,
            artistNameValue: props.artists,
            usageValue: props.usage,
            durationValue: props.duration,
            songTitleValue:props.title,
            songId: props.songId
        })
      
    }

    addShareholder = (cueId, songId) => {
        // console.log(cueId)
        // console.log(this.state.cueId)
        this.modalToggle("modal")
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
            shareholderId: shareholderId,
            songId: songId
        })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log("here: ", event.target.value)
        // console.log("name: ", event.target.name)

        this.setState({
            [name]: value
        });
    };

    // componentDidUpdate() {
    //     console.log("update")
    // }
    // event handler for when the submit button is selected for 

    handleCueAdd = () => {
        let data = {
            songTitle: this.state.songTitle,
            artists: this.state.performingArtist,
            usage: this.state.usage,
            duration: this.state.duration,
            cueSheetId: this.props.match.params.id
        }
        // console.log(data)
        API.addCue(data).then(res => {
            console.log(res)
            this.getCueSheet()
            this.setState({
                addCueModal: false

            });
        })

    }

    handleAddShareholder = ()=> {
        
        API.addShareholder({
            shareholderName: this.state.shareholderName,
            affiliation: this.state.affiliation,
            ipiNumber: this.state.ipiNumber,
            role: this.state.role,
            share: this.state.sharePercent,
            cueId: this.state.cueId,
            songId: this.state.songId

        })
            .then(res => {
                console.log(res)
                this.getCueSheet()
                this.setState({
                    modal: !this.state.modal
                });

            })

       
    };

    handleShareholderDelete = (event) => {
        event.preventDefault();
        console.log({
            shareholderId: this.state.shareholderId,
            songId: this.state.songId
        })

        API.deleteShareholder({
            shareholderId: this.state.shareholderId,
            songId: this.state.songId
        }).then(res => {
            console.log(res)
            this.getCueSheet()
            this.confirmModalToggle();
        })
    }

    handleDeleteCue =()=>{
        console.log(this.artists)
        API.deleteCue({
            cueId: this.state.cueId
        }).then(res =>{
            this.getCueSheet()
            this.modalToggle("deleteCueModal")

        })
    }

    handleEditCue =()=>{
        let data = {
            songTitle: this.state.songTitle,
            artists: this.state.performingArtist,
            usage: this.state.usage,
            duration: this.state.duration,
            cueSheetId: this.props.match.params.id,
            cueId:this.state.cueId,
            songId:this.state.songId
        }
        console.log(data)
       API.editCue(data)
       .then(res=>{
           console.log(res)
           this.getCueSheet()
           this.modalToggle("editCueModal")
       })
    }

    changeEditMode = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
        // console.log("go to edit mode ")
    }
    renderEditView = () => {
        return <div>
            <input
                name="textInput"
                type="text"
                value={this.state.textInput}
                onChange={this.handleInputChange}
                ref={this.theTextInput}>
            </input>
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>

        </div>

    }

    renderDefaultView = () => {
        return <div onClick={this.changeEditMode}>

            {this.state.textInput}
        </div>


    }

    updateComponentValue = (event) => {
        event.preventDefault();

        console.log("_________")

        console.log("_________")
        this.setState({
            isEditing: false,
            // value: this.theTextInput.current.value
        })
        console.log("test:", this.state.textInput)
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


                <Container>
                    CUE DETAILS
                {/* button */}
                    <br></br>
                    <Row>
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
                        <ModalEx
                            dataId={this.props.match.params.id}
                            buttonName={"Add new Cue"}
                            toggle={this.modalToggle}
                            modal={this.state.addCueModal}
                            modalStateName={"addCueModal"}
                            actionButton={"Submit"}
                            cancelButton={"Cancel"}
                            handleSubmit={this.handleCueAdd}
                            modalHeader={"Add a New Cue"}
                            buttonColor={"primary"}>
                            <form>
                                <SongsAdd handleChange={this.handleInputChange} />
                                <CueAdd handleChange={this.handleInputChange} />
                            </form>


                        </ModalEx>


                    </Row>


                </Container>

                <hr></hr>

                {this.state.cues.map(cues => (
                    <CueCard
                        key={cues.id}
                        title={cues.song.songTitle}
                        duration={cues.duration}
                        usage={cues.usage}
                        artists={cues.song.artists}
                        cueId={cues.id}
                        deleteCue={this.deleteCue}
                        editCue= {this.editCue}
                        songId={cues.song.id}

                    >
                     {/*  DeleteCue Modal  */}
                     <ModalNb
                            dataId={cues.id}
                            toggle={this.modalToggle}
                            modal={this.state.deleteCueModal}
                            modalStateName={"deleteCueModal"}
                            actionButton={"Yes"}
                            cancelButton={"Cancel"}
                            handleSubmit={this.handleDeleteCue}
                            modalHeader={"Delete Cue"}
                            buttonColor={"primary"}>

                          Are you sure you want to delete this Cue?
                       
  
                        </ModalNb>

                          {/*  EditCue Modal  */}
                     <ModalNb
                            dataId={cues.id}
                            toggle={this.modalToggle}
                            modal={this.state.editCueModal}
                            modalStateName={"editCueModal"}
                            actionButton={"Submit"}
                            cancelButton={"Cancel"}
                            handleSubmit={this.handleEditCue}
                            modalHeader={"Edit Cue"}
                            buttonColor={"primary"}>

                          <form>
                                <SongsAdd 
                                handleChange={this.handleInputChange}
                                artistNameValue={this.state.artistNameValue} 
                                songTitleValue={this.state.songTitleValue}
                                />
                                <CueAdd 
                                handleChange={this.handleInputChange}
                                durationValue={this.state.durationValue} 
                                usageValue={this.state.usageValue}/>
                            </form>                  
  
                        </ModalNb>


                        TESTING IN LINE EDIT <br></br>
                        {/* if isediting is true then the input text will be displayed with the default value
                        if not then the other option */}
                        {this.state.isEditing ?
                            this.renderEditView() : this.renderDefaultView()

                        }



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

                            </tbody>

                        </table>

                        {/* modal */}

                        <ModalEx
                            dataId={this.props.match.params.id}
                            buttonName={"Add a shareholder"}
                            toggle={() => { this.addShareholder(cues.id, cues.songId) }}
                            modal={this.state.modal}
                            modalStateName={"modal"}
                            actionButton={"Submit"}
                            cancelButton={"Cancel"}
                            handleSubmit={this.handleAddShareholder}
                            modalHeader={"Add a shareholder"}
                            buttonColor={"primary"}>
                            <ShareholderForm
                                handleChange={this.handleInputChange}
                            ></ShareholderForm>
                        </ModalEx>

                        {/* <section>
                            <Button onClick={() => { this.addShareholder(cues.id, cues.songId) }}> Add a shareholder</Button>

                            <Modal isOpen={this.state.modal} toggle={() => { this.modalToggle("modal") }} className={this.props.className}>
                                <ModalHeader toggle={() => { this.modalToggle("modal") }}>Add Shareholder</ModalHeader>
                                <ModalBody>
                                    <ShareholderForm


                                        handleChange={this.handleInputChange}
                                    ></ShareholderForm>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.handleAddShareholder}>Submit</Button>{' '}
                                    <Button color="secondary" onClick={() => { this.modalToggle("modal") }}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </section> */}

                    </CueCard>
                ))}

            </div>

        )
    }

}

export default NewCue
