import React, {Component} from 'react'
import { Container, Row, TableRow } from "../../components/Grid";
import API from "../../utils/API"
import { domainToUnicode } from 'url';

class SongLibrary extends Component{
    state = {
        shareholders: [],
        songs: [],
        email: JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email,
        modalDetail: {}
    }

    componentDidMount(){
        this.getSongInfo();
    }

    getSongInfo(){
        API.getSongs(this.state.email)
            .then(data => {
                this.setState({shareholders: data.data[0]})
                this.setState({songs: data.data[1]})
            })
    }

    showShare(songId){
        var index = this.state.shareholders.findIndex(element => {
            return element.song.id === songId
        })

        if(index >= 0){
            var info = {
                song: this.state.shareholders[index].song.songTitle,
                shareholders: [],
            }
            this.state.shareholders[index].song.shareholders.forEach(element => {
                info.shareholders.push({
                    id: element.id,
                    shareholderName: element.shareholderName,
                    shares: element.shareholderSongs.shares,
                    role: element.shareholderSongs.role,
                    affiliation: element.affiliation,
                })
            })
            this.setState({modalDetail: info})
        }

    }

    render() {
        return (
            <div>
                <Container>
                    <h3>Songs</h3>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Shareholder Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.songs.map(element => {
                                return(
                                    <TableRow key={element.id}>
                                        <td>{element.songTitle}</td>
                                        <td>{element.artists}</td>
                                        <td><button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.showShare(element.id)}>Expand</button></td>
                                    </TableRow>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.modalDetail.song}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Shares</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Affiliation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.modalDetail.shareholders? (
                                            this.state.modalDetail.shareholders.map(element => {
                                                return(
                                                    <TableRow key={element.id}>
                                                        <td>{element.shareholderName}</td>
                                                        <td>{element.shares}</td>
                                                        <td>{element.role}</td>
                                                        <td>{element.affiliation}</td>
                                                    </TableRow>
                                                )
                                            })
                                        ) : (
                                            <tr></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default SongLibrary
