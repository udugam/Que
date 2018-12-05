import React, { Component, Fragment } from "react";
// import { Label, Input, FormGroup } from 'reactstrap'
import {TextField, MenuItem} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});



class SongAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songTitle:'',
            performingArtist:''

        };
    };
    handleChange = name => event => {
        this.props.handleSongAdd(name, event.target.value)
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { songTitle, artistName } = this.props
        return (
            <Fragment>
                 <TextField
                    name="songTitle"
                    id="songTitle"
                    required
                    label="Song/Cue Title"
                    value={songTitle}
                    onChange={this.handleChange('songTitle')}
                    margin="normal"
                    fullWidth
                // variant="outlined"
                />
                <br/>
                <TextField
                    name="performingArtist"
                    id="performingArtist"
                    label="Performing Artist (optional)"
                    value={artistName}
                    onChange={this.handleChange('artistName')}
                    margin="normal"
                    fullWidth
                // variant="outlined"
                />
            </Fragment>
            // <div>
            //     <FormGroup>
            //         <Label check>
            //             Song/Cue Title
            //         <Input defaultValue={this.props.songTitleValue} onChange={this.props.handleChange} type="text" name="songTitle" />{' '}

            //         </Label>
            //     </FormGroup>
            //     <FormGroup>
            //         <Label check>
            //             Performing Artist (Optional)
            //         <Input defaultValue={this.props.artistNameValue} onChange={this.props.handleChange} type="text" name="performingArtist" />{' '}

            //         </Label>
            //     </FormGroup>
            // </div>
        )
    }
}

export default withStyles(styles)(SongAdd)


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