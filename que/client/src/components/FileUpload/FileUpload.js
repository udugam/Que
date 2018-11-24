import React, { Component, Fragment } from 'react'
import {
    // FormGroup,
    Label,
    FormText,
    Progress,
    // Button,
    Row,
    Col
} from 'reactstrap'
import axios from 'axios'
import {
    Grid,
    Paper,
    Typography,
    ListItemSecondaryAction,
    IconButton,
    Card,
    CardHeader,
    CardContent,
    FormGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    Button,
    Icon,
    FormHelperText
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

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
    },
    input: {
        display: 'none',
    },
    extendedIcon: {
        marginLeft: theme.spacing.unit,
    }
});


class FileUpload extends Component {

    state = {
        selectedFile: null,
        loaded: 0
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
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                })
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

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <FormGroup>
                    <Label><h3>Audio File Upload</h3></Label>
                    <Row>
                        <Col md="8">
                            <input type="file" onChange={this.handleSelectedFile} />
                            <FormText color="muted">
                                Upload your audio file here to automatically generate your cues using our song recognition
                        </FormText>
                        </Col>
                        <Col md="4">
                            {this.state.loaded === 0 ?
                                <Button onClick={this.handleUpload}>Upload File</Button>
                                :
                                <Progress value={this.state.loaded}>{this.state.loaded}</Progress>}
                        </Col>

                    </Row>
                </FormGroup>

                <FormControl>

                    <FormLabel component="legend">Audio File Upload</FormLabel>
                    <FormGroup>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            className={classes.input}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="extendedFab"
                                component="span"
                                className={classes.button}
                                color='primary' >
                                Upload
                                <Icon className={classes.extendedIcon}>cloud_upload</Icon>

                            </Button>
                        </label>
                        <Button
                                variant="extendedFab"
                                component="span"
                                className={classes.button}
                                color='primary' >
                                Upload
                                <Icon className={classes.extendedIcon}>cloud_upload</Icon>

                            </Button>

                    </FormGroup>
                    <FormHelperText>
                        Upload your audio file here to automatically generate your cues using our song recognition
                        </FormHelperText>
                </FormControl>



            </Fragment>
        )
    }
}

export default withStyles(styles)(FileUpload)
