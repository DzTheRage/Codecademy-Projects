import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

class App extends Component {
    constructor(props){
    super(props);
    this.state = {
        searchResults: [
            {name: 'Song 1',
             artist: 'Band 1',
             album: 'Album 1'},
             {name: 'Song 2',
              artist: 'Band 2',
              album: 'Album 2'},
            {name: 'Song 3',
              artist: 'Band 3',
             album: 'Album 3'}
        ],
    playlistName: 'Playlist Name',
    playlistTracks: [
            {name: 'Song 1',
             artist: 'Band 1',
             album: 'Album 1'},
             {name: 'Song 2',
              artist: 'Band 2',
              album: 'Album 2'},
            {name: 'Song 3',
              artist: 'Band 3',
             album: 'Album 3'}
        ],
    };
 }
 
addTrack(track){
    if (!track.id === this.state.playlistTracks){
        this.setState({
            playlistTrack: track.id
            });
    }
    else {
        track.push(this.state.playlistTracks);
    }
    
}
    
render() {
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.playlistTracks}/>
          </div>
        </div>
    </div>
    );
  }
}

export default App;