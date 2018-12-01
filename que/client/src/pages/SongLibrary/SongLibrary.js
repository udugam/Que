import React, {Component} from 'react'
import { Container, Row, TableRow } from "../../components/Grid";
import SongTable from '../../components/Tables/SongTable'

class SongLibrary extends Component{
    state = {
        shareholders: [],
        songs: [],
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        modalDetail: {}
    }

    render() {
        return (
            <div>
                <Container>
                    <h3>Songs</h3>
                    <SongTable
                        songs={this.state.songs}
                        shareholders={this.state.shareholders}
                    />
                </Container>
            </div>
        )
    }
}

export default SongLibrary
