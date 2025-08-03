const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  });

  const data = await response.json();
  return data.access_token;
}

async function fetchSpotifyData() {
  try {
    console.log('getting access token...');
    const accessToken = await getAccessToken();

    console.log('fetching top tracks and artists...');
    const [topTracksResponse, topArtistsResponse] = await Promise.all([
      fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }),
      fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
    ]);

    const [topTracks, topArtists] = await Promise.all([
      topTracksResponse.json(),
      topArtistsResponse.json()
    ]);

    const spotifyData = {
      topTracks: topTracks.items?.map(track => ({
        name: track.name,
        artist: track.artists[0]?.name,
        album: track.album?.name,
        image: track.album?.images[0]?.url,
        external_url: track.external_urls?.spotify
      })) || [],
      topArtists: topArtists.items?.map(artist => ({
        name: artist.name,
        image: artist.images[0]?.url,
        external_url: artist.external_urls?.spotify,
        genres: artist.genres
      })) || [],
      lastUpdated: new Date().toISOString()
    };

    // ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // write data to public folder
    const filePath = path.join(publicDir, 'spotify-data.json');
    fs.writeFileSync(filePath, JSON.stringify(spotifyData, null, 2));
    
    console.log('Spotify data updated successfully!');
    console.log(`Top tracks: ${spotifyData.topTracks.length}`);
    console.log(`Top artists: ${spotifyData.topArtists.length}`);
    
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    process.exit(1);
  }
}

fetchSpotifyData();