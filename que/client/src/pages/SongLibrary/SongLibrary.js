import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, TableRow } from "../../components/Grid";
import SongTable from '../../components/Tables/SongTable'

const styles = theme => ({
    title: {
        marginTop: '20px',
    }
  });

class SongLibrary extends Component{
    state = {
        shareholders: [],
        songs: [],
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        modalDetail: {}
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container>
                    <h3 className={classes.title}>Songs</h3>
                    <SongTable
                        songs={this.state.songs}
                        shareholders={this.state.shareholders}
                    />
                </Container>
            </div>
        )
    }
}

SongLibrary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SongLibrary)
