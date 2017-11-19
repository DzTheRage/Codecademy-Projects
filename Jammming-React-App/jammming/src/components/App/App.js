import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import PreviewPlayer from '../PreviewPlayer/PreviewPlayer';
import Spotify from '../../util/Spotify.js';

Spotify.getAccessToken();

class App extends Component {
    constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.previewTrack = this.previewTrack.bind(this);
    this.state = {
        searchResults: [],
        playlistName: 'Playlist Name',
        previewName: 'Song Name',
        previewArtist: 'Artist Name',
        previewSrc: 'URL',
        playlistTracks: [],
    };
 }
 
addTrack(track){
    let playlistTrackVar = this.state.playlistTracks;
    if (!playlistTrackVar.find(playlistTrack => playlistTrack.id === track.id)){
        playlistTrackVar.push(track);
        this.setState({
            playlistTracks: playlistTrackVar
        });
    }   
}

removeTrack(track){
     let playlistTrackVar = this.state.playlistTracks;
     this.setState({
            playlistTracks: playlistTrackVar.filter(playlistTrack => playlistTrack.id !== track.id)
        });
}

previewTrack(name, artist, preview){
    this.setState({
       previewName: name,
       previewArtist: artist,
       previewSrc: preview,
    });
}

updatePlaylistName(name){
    this.setState({
        playlistName: name
    });
}

savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
        playlistName: 'New Playlist'
    });
    this.setState({
        searchResults: []
    });
}

search(searchTerm){
    Spotify.search(searchTerm)
    .then(TrackSearch => 
        this.setState({
        searchResults: TrackSearch
    }));
}
    
render() {
    return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
            <PreviewPlayer />
            <div className="App-playlist">
              <SearchResults onPreview={this.previewTrack} onAdd={this.addTrack} searchResults={this.state.searchResults}/>
              <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
               onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
            </div>
        </div>
        {console.log(this.state.previewName)}
        {console.log(this.state.previewArtist)}
        {console.log(this.state.previewSrc)}
    </div>
    );
  }
}

export default App;