import { useState, useEffect } from 'react';
import spotifyDataJson from '../../public/spotify-data.json';

const SpotifyStats = () => {
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSpotifyData = () => {
      try {
        // Use imported JSON data directly
        setSpotifyData(spotifyDataJson);
        setLoading(false);
      } catch (err) {
        console.error('Error loading Spotify data:', err);
        setError('Failed to load music stats');
        setLoading(false);
      }
    };

    loadSpotifyData();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">MUSIC ANALYTICS</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            <span className="ml-3">Loading music data...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">MUSIC ANALYTICS</h2>
        <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-400">
          <p className="text-red-400 font-semibold">SYSTEM ERROR</p>
          <p className="text-gray-300">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">MUSIC ANALYTICS</h2>
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <p className="text-green-400 font-semibold text-sm tracking-wider">
              SPOTIFY DATA STREAM ACTIVE
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            Last updated: {new Date(spotifyData.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Tracks */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg mb-4">TOP TRACKS (4 weeks)</h3>
            <div className="space-y-3">
              {spotifyData.topTracks.slice(0, 5).map((track, index) => (
                <a
                  key={index}
                  href={track.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <div className="text-blue-400 font-bold text-sm mr-3 w-6">
                    #{index + 1}
                  </div>
                  {track.image && (
                    <img
                      src={track.image}
                      alt={`${track.name} cover`}
                      className="w-12 h-12 rounded mr-3"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">
                      {track.name}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      {track.artist} • {track.album}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Top Artists */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg mb-4">TOP ARTISTS (4 weeks)</h3>
            <div className="space-y-3">
              {spotifyData.topArtists.slice(0, 5).map((artist, index) => (
                <a
                  key={index}
                  href={artist.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <div className="text-blue-400 font-bold text-sm mr-3 w-6">
                    #{index + 1}
                  </div>
                  {artist.image && (
                    <img
                      src={artist.image}
                      alt={`${artist.name}`}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">
                      {artist.name}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      {artist.genres.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mt-6 pt-4 border-t border-gray-700">
          <a 
            href="https://open.spotify.com/user/YOUR_SPOTIFY_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold tracking-wider transition-colors inline-flex items-center"
          >
            VIEW ON SPOTIFY →
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default SpotifyStats;