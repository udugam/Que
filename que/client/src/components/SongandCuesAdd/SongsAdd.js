import React, { Component } from "react";
import { Label, Input, FormGroup } from 'reactstrap'




class SongAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <FormGroup>
                    <Label check>
                        Song/Cue Title
                    <Input defaultValue={this.props.songTitleValue} onChange={this.props.handleChange} type="text" name="songTitle" />{' '}

                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label check>
                        Performing Artist (Optional)
                    <Input defaultValue={this.props.artistNameValue} onChange={this.props.handleChange} type="text" name="performingArtist" />{' '}

                    </Label>
                </FormGroup>
            </div>
        )
    }
}

export default SongAdd


    // import React, { Component } from "react";

    // class SongsAdd extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {

    //         };
    //     };

    //     render(){
    //         return(
    //             <div></div>
    //         )
    //     }
    // }

    //     export default SongsAdd