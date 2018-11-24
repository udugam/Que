// What does importing component do here ?? Instead of just react 
import React, { Component, Fragment } from 'react';
// import { Container, Row, TableRow } from "../../components/Grid";
import { Container } from "../../components/Grid";
// import CueCard from "../../components/CueCards"
import CueCards from '../../components/NewCards/CueCards'
import ProductionCard from "../../components/NewCards/ProductionCard"
import API from "../../utils/API"
import ShareholderForm from "../../components/ShareholderAdd"
import FileUpload from '../../components/FileUpload'
import ModalEx from "../../components/ModalsExample/ModalsEx"
import SongsAdd from "../../components/SongandCuesAdd/SongsAdd"
import CueAdd from "../../components/SongandCuesAdd/CueAdd"
import ModalNb from "../../components/ModalsExample/ModalNb"
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import Button from '@material-ui/core/Button';
// import { PrimaryButton, SecondaryButton } from '../../components/ButtonsAndIcons'
import {
    ButtonBase,
    Grid,
    // Paper,
    Typography,
    // ListItemSecondaryAction,
    // IconButton, 
    // Card,
    // CardHeader,
    // CardContent
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import ShareholdersTable from '../../components/Tables/ShareholderTable'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: 40
    },
    card:{
        // padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        marginTop: 40
    },
    cardHeader:{
        background: '#f4511e'
    },
    buttonTest:{
        margin:'0 auto',
        justify:'center'
    },
    shareholderAdd:{
        marginTop:20,
        marginBottom:20
    },
    section:{
        marginTop:20
    }
});


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
            songTitleValue: "",
            artistNameValue: "",
            usageValue: "",
            durationValue: ""

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
                console.log(res.data)
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

    editCue = (props) => {

        console.log("songId: ", props.songId)
        this.modalToggle("editCueModal")
        this.setState({
            cueId: props.cueId,
            artistNameValue: props.artists,
            usageValue: props.usage,
            durationValue: props.duration,
            songTitleValue: props.title,
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
        console.log("event value: ", event.target.value)
        console.log("name: ", event.target.name)

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

    handleAddShareholder = () => {

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

    handleDeleteCue = () => {
        console.log(this.artists)
        API.deleteCue({
            cueId: this.state.cueId
        }).then(res => {
            this.getCueSheet()
            this.modalToggle("deleteCueModal")

        })
    }

    handleEditCue = () => {
        let data = {
            songTitle: this.state.songTitle,
            artists: this.state.performingArtist,
            usage: this.state.usage,
            duration: this.state.duration,
            cueSheetId: this.props.match.params.id,
            cueId: this.state.cueId,
            songId: this.state.songId
        }
        console.log(data)
        API.editCue(data)
            .then(res => {
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
        const { classes } = this.props;
        return (
            <Fragment >
    
                <ProductionCard productionTitle={this.state.cueSheet.productionTitle}
                    productionNumber={this.state.cueSheet.id}
                    productionYear={this.state.cueSheet.productionYear}
                    productionDuration={this.state.cueSheet.productionDuration}
                    musicDuration={this.state.cueSheet.musicDuration} >
                    <FileUpload getCuesCallBack={this.getCueSheet} cueSheetId={this.state.cueSheet.id}/>

                   
                    </ProductionCard>
                    <Container>
                        <Grid container className={classes.section}>
                            <Grid item >
                            <Typography variant="h5">Cue Information</Typography>
                            <Typography variant="subtitle1">
                            Add all music/cues used in this production and shareholder information.
                            </Typography>
                            <Typography variant="subtitle2">
                            You can either upload the final production or add cues manually. 
                            Uploading your audio file will automatically generate the cue information
                            </Typography>
                            </Grid>
                         
                            <Grid item xs={12} sm={6} className={classes.section}>
                             Audio File upload placeholder
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.section}>
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
                            buttonColor={"primary"}
                            variant={'extendedFab'}
                            style={{padding:'10px'}}
                            usageValue={this.state.usage}>
                            <form>
                                <SongsAdd handleChange={this.handleInputChange} />
                                <CueAdd handleChange={this.handleInputChange} />
                            </form>


                        </ModalEx>
                            </Grid>
                        </Grid>
                   
                    </Container>
                   

                    {/* <Container>
                    <Button color="primary" data-id={this.props.match.params.id}>  Add new cue</Button>
                    <PrimaryButton name="Test"> Test Primary</PrimaryButton>
                    <SecondaryButton name="Test Second"></SecondaryButton>
                </Container> */}

                 {this.state.cues.map(cues => (
                    
                        <CueCards
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
                        <ShareholdersTable
                        shareholders={cues.song.shareholders && cues.song.shareholders}
                        deleteShareholder={this.deleteShareholder}
                        songId={cues.songId}
                        confirmModal={this.state.confirmModal}
                        confirmModalToggle={this.confirmModalToggle}
                        handleShareholderDelete={this.handleShareholderDelete}
                        >
                        </ShareholdersTable>

                     
                        <Grid container justify='center' className={classes.shareholderAdd} >
                        <Grid item >
                        <ModalEx
                            dataId={this.props.match.params.id}
                            buttonName={"Add Shareholders"}
                            toggle={() => { this.addShareholder(cues.id, cues.songId) }}
                            modal={this.state.modal}
                            modalStateName={"modal"}
                            actionButton={"Submit"}
                            cancelButton={"Cancel"}
                            handleSubmit={this.handleAddShareholder}
                            modalHeader={"Add a shareholder"}
                            buttonColor={"primary"}
                            variant={'outlined'}
                            style={{padding:'20px'}}>
                            <ShareholderForm
                                handleChange={this.handleInputChange}
                            ></ShareholderForm>
                        </ModalEx>
    
                       
                        </Grid>
                        </Grid>
                        

                        </CueCards>
                   
                ))}

            </Fragment>

        )
    }

}

export default withStyles(styles)(NewCue)
