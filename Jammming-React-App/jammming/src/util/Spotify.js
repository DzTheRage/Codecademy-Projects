let userAccessToken = undefined;
let userAccessTokenExpire = undefined;
let clientID = '875cadc94aa5452b86650aa2b3270d52';
let redirectURI = 'http://localhost:3000/';
let spotifyURL = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;

const Spotify = {
    
    getAccessToken(){
        // Check for Token
        if (userAccessToken) {
        return userAccessToken;
        }
        // Check URL for Access Token
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlAccessTokenExpire = window.location.href.match(/expires_in=([^&]*)/);
        
        if (urlAccessToken && urlAccessTokenExpire){
            // Set values 
            userAccessToken = urlAccessToken;
            userAccessTokenExpire = urlAccessTokenExpire;
            // Clear parameter from URL after token has expired
            window.setTimeout(() => userAccessToken = '', userAccessTokenExpire * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location = spotifyURL;
        }
    },
    
    search(term){
        let spotifyEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(spotifyEndpoint, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
                }
        })
        // Convert response to JSON
        .then(response => response.json())
        .then(jsonResponse => {
            // If not tracks return empty array
            if (!jsonResponse.track) return [];
            // Return track id, name, artists, album, and uri
            return jsonResponse.track.items.map(track => {
            return {
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri,
                    };
               });
        });
    },
    
    savePlaylist(playlistName, trackURIs){
        // Check if name and track URI are available
        if (!playlistName || !trackURIs) {
            return;
        }
        // Default variables
        let accessToken = 'https://api.spotify.com/v1/me';
        let headers = {
            Authorization: `Bearer ${accessToken}`
            };
        let userID = undefined;
        let playlistID = undefined;
        // Return spotify username
        return fetch(spotifyURL, {
            headers: headers
            })
        // Create playlist
        .then(response => response.json())
        .then(jsonResponse => userID = jsonResponse.id )
        .then(() => {
              const makePlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists/`;
              fetch(makePlaylistURL, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    name: playlistName
                })
              });
        })
        // Add playlist 
        .then(response => response.json())
        .then(jsonResponse => playlistID = jsonResponse.id)
        .then(() => {
            const addPlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
            fetch (addPlaylistURL, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({
                    uris: trackURIs
                })
            });
        });
    }
    
};

export default Spotify;