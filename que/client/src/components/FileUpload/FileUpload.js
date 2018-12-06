import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {
    Grid,
    FormControl,
    Icon,
    FormHelperText,
    Card,
    CardContent,
    IconButton,
    Typography,
    CircularProgress,
    Snackbar,
    Fade
} from "@material-ui/core";

import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone'
import SnackbarWrapper from '../Snackbars/SnackbarContentWrapper'

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
    card: {
        // padding: theme.spacing.unit * 2,
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        marginTop: 40
    },
    cardHeader: {
        background: '#f4511e'
    },
    button: {
        margin: theme.spacing.unit,
        position:"absolute",
        top:"-5%",
        right:"-1%"

    },
    input: {
        // display: 'none',
    },
    extendedIcon: {
        marginLeft: theme.spacing.unit,
    },
    dropZone: {
        border: "1px dashed #9E9E9E",
        borderRadius: "15px",
        lineHeight: "50px",
        textAlign: "center",
        marginTop: "20px",
        marginLeft: "10%",
        marginRight: "10%"
        // width: "80%"
    },
    dropZoneDragOver: {
        border: "2px dashed #212121",
        borderRadius: "15px",
        lineHeight: "50px",
        textAlign: "center",
        marginTop: "20px",
        marginLeft: "10%",
        marginRight: "10%"
    },
    audioControls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    dropzoneContainer: {
        marginTop: "20px"
    },
    dropzoneItem: {
        // width:"80%"
    },
    audioPaper: {
        marginLeft: "15%",
        marginRight: "15%",
        // padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        overflowX: 'auto',
        position: "relative"
    },
    track: {
        background: "white",
        height: "14px"

    },
    thumb: {
        background: "#f4511e",
        width: "18px",
        height: "18px"

    },
    trackAfter: {
        // background:"#f4511e"
    },
    trackBefore: {

    },
    cardPlayer: {
        background: "#0C0C2F",
        // marginTop: 20,
        position: "relative",
        height: "60px"
    },
    seekBar: {
        width: "100%",
        // maxWidth: "90%",
        // marginTop:"20%"
        position: "absolute",
        bottom: "4px",
        left: "2px"
        // left:"20%",
        // top:"50%"
    },
    playIcon: {
        maxWidth: "90%",
        margin: theme.spacing.unit,
        position: "absolute",
        left: "10%",
        bottom: "1%"
    },
    volumeBar: {
        display: 'flex',
        height: 50,
    },
    volumeContainer: {
        padding: '0px 22px',
    },
    volumeDiv:{
        position:"absolute", 
        left:"60%"
    },
    progress:{
        position:"absolute",
        right:"3%",
        top:"18%",
    }
});


class FileUpload extends Component {

    state = {
        selectedFile: null,
        loaded: 0,
        dropzoneDrag: false,
        audioDisplay: false,
        playing: false,
        soundVolume: "100",
        seekBarValue: 0,
        value: 50,
        maxDuration: 100,
        open: false,
        errorMessage:false
        // seekBarMax: "25"
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ 
            open: false,
            errorMessage: false
        });
      };
      uploadMessage =(amountLoaded) => {
     
        //   console.log(amountLoaded)
          if (amountLoaded===100){
            this.setState({ open: true });
          }
        
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        data.append('cueSheetId', this.props.cueSheetId)

        axios.post("/api/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: Math.ceil((ProgressEvent.loaded / ProgressEvent.total * 100)),
                }, this.uploadMessage(Math.ceil((ProgressEvent.loaded / ProgressEvent.total * 100))))
            },
        })
            .then(res => {
                if (res.data === true) {
                    console.log("Scan Completed")
                    this.props.getCuesCallBack()
                } else {
                    console.log("Error")
                }
            })
    }


    testButton = () => {
        const input = document.getElementById('fileUpload')
        console.log("working")
        // console.log(input.files[0])
        input.addEventListener('change', this.showFile)




    }
    showFile = (event) => {
        console.log(event.srcElement.files[0])
        // console.log(event)
    }

    verifyFiles = (fileCheck, acceptedFile) => {
        // can add specific validation for either audio file or more than one file 

        if (fileCheck.length > 0) {
            console.log("Must be an audio file, and can only upload one file")
            this.setState({
                errorMessage:true
            })
        }
        // only if there is an acceptable file will the user be able to upload 
        else {
            var sound = document.getElementById("sound")
            this.setState({
                selectedFile: acceptedFile,
                loaded: 0,
                audioDisplay: true,
            })

            sound.src = URL.createObjectURL(acceptedFile)
            var audioName = document.getElementById("audioName")
            audioName.innerHTML = acceptedFile.name

            console.log(sound.src)

        }
    }
    handleOnDrop = (files, rejectedFiles) => {
        console.log(files[0])
        console.log(rejectedFiles)
        this.verifyFiles(rejectedFiles, files[0])



    }
    handlePlayButton = () => {
       
        var sound = document.getElementById("sound")
        this.setState({
            playing: !this.state.playing,
        })
        if (this.state.playing) {
            sound.pause()
        }
        else {
            sound.play()
        }
    }

    createSeekBar = () => {
        var sound = document.getElementById("sound")
        var seekbar = document.getElementById("seekBar")
        seekbar.min = 0;
        seekbar.max = sound.duration;
        this.setState({
            seekBarValue: 0,
            maxDuration: sound.duration
        })

    }


    seekBar = () => {
        var sound = document.getElementById("sound")
        var seekbar = document.getElementById("seekBar")
        seekbar.value = sound.currentTime

        this.setState({
            seekBarValue: sound.currentTime
        })

    }
    handleSeekBar = (event, seekBarValue) => {

        this.setState({ seekBarValue });
        var sound = document.getElementById("sound")
        sound.currentTime = this.state.seekBarValue
    };



    componentDidMount() {
        var sound = document.getElementById("sound")
        var duration = document.getElementById("duration")
        sound.addEventListener("timeupdate", () => {
            var s = parseInt(sound.currentTime % 60)
            var m = parseInt((sound.currentTime / 60) % 60)
            var totalMinutes = parseInt(sound.duration / 60)
            var totalSec = parseInt(sound.duration % 60)
            duration.innerHTML = m + ":" + s + "/" + totalMinutes + ":" + totalSec
        }, false)
    }
    soundVolume = (event, soundVolume) => {
        this.setState({ soundVolume });
        var sound = document.getElementById("sound")
        var volume = document.getElementById("volume")
        sound.volume = this.state.soundVolume / 100
        this.setState({
            soundVolume: volume.value
        })

    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                        }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                        >
                        <SnackbarWrapper
                            onClose={this.handleClose}
                            variant="success"
                            message="Your file has been uploaded, we will send you a notifcation once we have analyzed your file"
                        />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                        }}
                    open={this.state.errorMessage}
                    autoHideDuration={8000}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                        >
                        <SnackbarWrapper
                            onClose={this.handleClose}
                            variant="error"
                            message="Please upload an audio file, can only upload one at a time"
                        />
                </Snackbar>

                <FormControl>

                    {/* <FormLabel component="legend">Audio File Upload</FormLabel> */}
                    <FormHelperText>
                        Upload your audio file here to automatically generate your cues using our song recognition.
                        (Limited to commercially released songs. All other cues must be added manually)
                    </FormHelperText>
                </FormControl>

                <Grid container justify='center' >
                    <Grid item xs={12} >
                        <Dropzone
                            accept="audio/*, video/*"
                            className={classes.dropZone}
                            activeClassName={classes.dropZoneDragOver}
                            onDrop={this.handleOnDrop}
                            multiple={false}
                        > Drop files or Browse </Dropzone>

                    </Grid>

                </Grid>
                {/* uploaded audio */}
                <Grid container justify='center' className={classes.dropzoneContainer} >

                    <Grid item className={classes.dropzoneItem} xs={12}>

                        <Card className={classes.audioPaper}
                        style={{ display: this.state.audioDisplay === false ? "none" : "block" }}>
                            <Grid container justify='center'>
                                <CardContent>
                                    <Grid item xs={12}>
                                    <Typography variant="caption" color="secondary">    
                                    <div id="audioName">
                                    
                                   
                                    </div>
                                    </Typography>
                                       
                                    </Grid>
                                  
                                </CardContent>
                            </Grid>
                            {/* card player section */}

                            <CardContent className={classes.cardPlayer}>
                                <span id="duration"></span>
                                <audio id="sound"
                                    onDurationChange={this.createSeekBar}
                                    onTimeUpdate={this.seekBar}
                                     >
                                </audio>
                               
                                <Slider id="seekBar"
                                    classes={{
                                        track: classes.track,
                                        thumb: classes.thumb,
                                        trackBefore: classes.trackBefore,
                                        trackAfter: classes.trackAfter
                                    }}
                                    className={classes.seekBar}
                                    // step="1"
                                    // onInput={this.handleSeekBar} 
                                    onChange={this.handleSeekBar}
                                    value={this.state.seekBarValue}
                                    max={this.state.maxDuration}>
                                </Slider>
                                <div className={classes.audioControls}>

                                    {/* <input id="seekBar" min="0" max="0" step="1"
                                     value={this.state.seekBarValue} type="range"
                                    onInput={this.handleSeekBar} onChange={this.onInput} ></input> */}

                                    <IconButton className={classes.playIcon}
                                        onClick={this.handlePlayButton} color="secondary" aria-label="Edit" >
                                     
                                        <Icon

                                            fontSize="default">{this.state.playing === false ? "play_arrow" : "pause"}  </Icon>
                                    </IconButton>
                                    {/* <div className={classes.volumeDiv}>
                                    <Icon color="secondary">volume_up</Icon>
                                      <Slider
                                                id="volume"
                                                className={classes.volumeBar}
                                                value={this.state.soundVolume}
                                                onChange={this.soundVolume}
                                                vertical
                                                classes={{
                                                    track: classes.track,
                                                    thumb: classes.thumb,
                                                    trackBefore: classes.trackBefore,
                                                    trackAfter: classes.trackAfter,
                                                    container: classes.volumeContainer
                                                }}></Slider>
                                    </div> */}
                                </div>
                                <div  >

                                    {this.state.loaded === 0 ?
                                           <IconButton
                                            
                                            className={classes.button}
                                            color='secondary'
                                            // disabled={!audioDisplay}
                                            onClick={this.handleUpload}> 
                                            <Icon className={classes.extendedIcon}>cloud_upload</Icon></IconButton>
                                       
                                        :
                                        // <Progress value={this.state.loaded}>{this.state.loaded}</Progress>
                                        //<LinearProgress variant="determinate" value={this.state.loaded}>{this.state.loaded}</LinearProgress>
                                        <CircularProgress 
                                        size={28} className={classes.progress} 
                                         color="secondary" variant="static" value={this.state.loaded}> </CircularProgress>
                                        }

                                    </div>
                            </CardContent>
                        </Card>                   
                    </Grid>
                </Grid>







            </Fragment>
        )
    }
}

export default withStyles(styles)(FileUpload)
