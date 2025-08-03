import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAccessToken() {
  console.log('Requesting access token...');
  
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
    console.error('❌ Token request failed:', data);
    throw new Error(`Token request failed: ${data.error_description || data.error}`);
  }
  
  console.log('✅ Access token obtained');
  return data.access_token;
}

async function fetchSpotifyData() {
  try {
    const accessToken = await getAccessToken();

    console.log('🎵 Fetching top tracks and artists...');
    
    // Test different time ranges
    const timeRanges = ['short_term', 'medium_term', 'long_term'];
    
    for (const timeRange of timeRanges) {
      console.log(`\n📊 Testing time range: ${timeRange}`);
      
      const [topTracksResponse, topArtistsResponse] = await Promise.all([
        fetch(`https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=${timeRange}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch(`https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
      ]);

      console.log(`Tracks response status: ${topTracksResponse.status}`);
      console.log(`Artists response status: ${topArtistsResponse.status}`);

      const [topTracks, topArtists] = await Promise.all([
        topTracksResponse.json(),
        topArtistsResponse.json()
      ]);

      if (!topTracksResponse.ok) {
        console.error(`❌ Tracks API error (${timeRange}):`, topTracks);
      } else {
        console.log(`✅ Tracks found (${timeRange}): ${topTracks.items?.length || 0}`);
      }

      if (!topArtistsResponse.ok) {
        console.error(`❌ Artists API error (${timeRange}):`, topArtists);
      } else {
        console.log(`✅ Artists found (${timeRange}): ${topArtists.items?.length || 0}`);
      }

      // If we found data in any time range, use it
      if (topTracks.items?.length > 0 || topArtists.items?.length > 0) {
        console.log(`🎯 Using data from ${timeRange} time range`);
        
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
          timeRange: timeRange,
          lastUpdated: new Date().toISOString()
        };

        // Save the data
        const projectRoot = path.dirname(__dirname);
        const publicDir = path.join(projectRoot, 'public');
        
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const filePath = path.join(publicDir, 'spotify-data.json');
        fs.writeFileSync(filePath, JSON.stringify(spotifyData, null, 2));
        
        console.log('✅ Spotify data updated successfully!');
        console.log(`📁 File written to: ${filePath}`);
        console.log(`🎵 Top tracks: ${spotifyData.topTracks.length}`);
        console.log(`🎤 Top artists: ${spotifyData.topArtists.length}`);
        
        return; // Exit after saving data
      }
    }
    
    // If we get here, no data was found in any time range
    console.log('⚠️  No listening data found in any time range');
    console.log('💡 This might mean:');
    console.log('   - You haven\'t listened to much music recently');
    console.log('   - Your Spotify listening history is private');
    console.log('   - The account needs more listening activity');
    
    // Save empty data with debug info
    const spotifyData = {
      topTracks: [],
      topArtists: [],
      debug: 'No listening data found in any time range',
      lastUpdated: new Date().toISOString()
    };

    const projectRoot = path.dirname(__dirname);
    const publicDir = path.join(projectRoot, 'public');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, 'spotify-data.json');
    fs.writeFileSync(filePath, JSON.stringify(spotifyData, null, 2));
    
  } catch (error) {
    console.error('💥 Error fetching Spotify data:', error);
    process.exit(1);
  }
}

fetchSpotifyData();