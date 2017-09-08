import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import { searchArtist, searchAlbum } from './spotifyService';

class App extends Component {
    state = {
        query: '',
        artist: null,
        tracks: null
    };

    search = () => {
        // console.log('this.state', this.state);
        searchArtist(this.state.query)
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});

            searchAlbum(artist.id)
            .then(json => {
                const { tracks } = json;
                this.setState({tracks});
            });
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={this.search}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                        <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <div className="Gallery">
                                Gallery
                            </div>
                        </div>
                    :   <div></div>
                }
            </div>
        );
    }
}

export default App;