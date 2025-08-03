import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  
  if (!response.ok) {
    throw new Error(`Token request failed: ${data.error_description || data.error}`);
  }
  
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

    // save to public folder
    const projectRoot = path.dirname(__dirname);
    const publicDir = path.join(projectRoot, 'public');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, 'spotify-data.json');
    fs.writeFileSync(filePath, JSON.stringify(spotifyData, null, 2));
    
    console.log('Spotify data updated successfully!');
    console.log(`Top tracks: ${spotifyData.topTracks.length}`);
    console.log(`Top artists: ${spotifyData.topArtists.length}`);
    
  } catch (error) {
    console.error('error fetching Spotify data:', error);
    process.exit(1);
  }
}

fetchSpotifyData();