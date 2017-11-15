let userAccessToken = undefined;
let userAccessTokenExpire = undefined;
let clientID = '875cadc94aa5452b86650aa2b3270d52';
let redirectURI = 'http://scottJAM.surge.sh/';
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
            userAccessToken = urlAccessToken[1];
            userAccessTokenExpire = urlAccessTokenExpire[1];
            // Clear parameter from URL after token has expired
            window.setTimeout(() => userAccessToken = '', userAccessTokenExpire * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location = spotifyURL;
        }
    },
    
    search(term){
        const spotifySearch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(spotifySearch, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
                }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
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
    
   savePlaylist(name, trackURIs) {
   if (!name || !trackURIs) return;
    const userURL = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${userAccessToken}`
    };
    let userID = undefined;
    let playlistID = undefined;
    fetch(userURL, {
      headers: headers 
    })
   .then(response => response.json())
    .then(jsonResponse => userID = jsonResponse.id)
    .then(() => {
      const makePlaylistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
      fetch(makePlaylistUrl, {
          method: 'POST',
         headers: headers,
          body: JSON.stringify({
           name: name
         })
        })
       .then(response => response.json())
        .then(jsonResponse => playlistID = jsonResponse.id)
        .then(() => {
         const addPlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
          fetch(addPlaylistURL, {
            method: 'POST',
            headers: headers,
           body: JSON.stringify({
             uris: trackURIs
            })
         });
        });
    });
 }
 
 
};
    


export default Spotify;