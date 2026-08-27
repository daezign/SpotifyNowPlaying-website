const spotifyCard = document.getElementById('spotify-card');
const albumArtEl = document.getElementById('spotify-album-art');
const statusEl = document.getElementById('spotify-status');
const songEl = document.getElementById('spotify-song');
const artistEl = document.getElementById('spotify-artist');
const equalizerEl = document.getElementById('equalizer');

// Replace with your deployed Cloudflare Worker endpoint
const WORKER_URL = 'https://YOUR_WORKER_SUBDOMAIN.workers.dev/';

async function updateSpotifyWidget() {
  try {
    const response = await fetch(WORKER_URL);
    const data = await response.json();

    if (data && data.song) {
      spotifyCard.href = data.songUrl;
      albumArtEl.src = data.albumArtUrl;
      songEl.textContent = data.song;
      artistEl.textContent = data.artist;
      statusEl.textContent = data.status;

      if (data.isPlaying) {
        equalizerEl.classList.remove('is-paused');
      } else {
        equalizerEl.classList.add('is-paused');
      }
    } else {
      // Offline or error state fallback
      statusEl.textContent = "Offline";
      songEl.textContent = "Spotify";
      artistEl.textContent = "Not Playing";
      equalizerEl.classList.add('is-paused');
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    equalizerEl.classList.add('is-paused');
  }
}

// Fetch on initial page load
updateSpotifyWidget();

// Refresh data every 30 seconds
setInterval(updateSpotifyWidget, 30000);
