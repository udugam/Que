import React, {Component} from 'react'
import {
    FormGroup,
    Label,
    FormText,
    Progress,
    Button,
    Row,
    Col
} from 'reactstrap'
import axios from 'axios'


class FileUpload extends Component {

    state = {
        selectedFile:null,
        loaded:0
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded:0
        })
    }
    
    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        data.append('cueSheetId', this.props.cueSheetId)

        axios.post("/api/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        })
        .then(res => {
            if(res.data === true) {
                console.log("Scan Completed")
                this.props.getCuesCallBack()
            } else {
                console.log("Error")
            }
        })
    }

    render(){
        return(
            <FormGroup>
                <Label><h3>Audio File Upload</h3></Label>
                <Row>
                    <Col md="8">
                        <input type="file" onChange={this.handleSelectedFile}/>
                        <FormText color="muted">
                            Upload your audio file here to automatically generate your cues using our song recognition
                        </FormText>
                    </Col>
                    <Col md="4">
                        {this.state.loaded===0 ? 
                        <Button onClick={this.handleUpload}>Upload File</Button>
                        :
                        <Progress value={this.state.loaded}>{this.state.loaded}</Progress>}
                    </Col> 

                </Row>
            </FormGroup>
        )
    }
}

export default FileUpload
