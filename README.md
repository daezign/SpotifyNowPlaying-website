# Spotify Widget

A live-updating Spotify widget designed for Bento-style website layouts. 

It displays what you are currently listening to in real-time. If you pause or close Spotify, it gracefully falls back to showing your last played track with a static equalizer.

An example of this can be found here: [daezign](https://daezign.daezign.workers.dev/).

---

## Prerequisites

Before starting, make sure you have:
- A [Spotify Account](https://spotify.com).
- A free [Cloudflare Account](https://dash.cloudflare.com).
- A code editor (like VS Code).

---

## Step-by-Step Setup Guide

### Step 1: Create a Spotify Developer App
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in.
2. Click **Create App**.
3. Fill in the details:
   - **App Name:** `Spotify Widget`
   - **App Description:** `Spotify widget for personal website`
   - **Redirect URI:** `https://spotify-refresh-token-generator.netlify.app/` *(or `http://localhost:3000` if generating manually)*
4. Save the app, then go to **Settings**.
5. Copy your **Client ID** and **Client Secret**.

---

### Step 2: Generate a Refresh Token
1. Open the [Spotify Refresh Token Generator](https://spotify-refresh-token-generator.netlify.app/).
2. Enter your **Client ID** and **Client Secret**.
3. Check the following **two scopes** (required):
   - `user-read-currently-playing`
   - `user-read-recently-played`
4. Click **Log In & Get Token** and authorize your app.
5. Copy the generated **Refresh Token**.

---

### Step 3: Deploy the Cloudflare Worker
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create Application** > **Create Worker**.
3. Name your worker (e.g., `spotify-now-playing`) and click **Deploy**.
4. Click **Edit Code**, delete the default template, and paste the contents of `worker.js` from this repository.
5. Click **Save and Deploy**.

#### Add Environment Variables:
1. Go back to your Worker's main page and click **Settings** > **Variables**.
2. Under **Environment Variables**, add the following three secret keys:
   - `SPOTIFY_CLIENT_ID` = *(Your Client ID from Step 1)*
   - `SPOTIFY_CLIENT_SECRET` = *(Your Client Secret from Step 1)*
   - `SPOTIFY_REFRESH_TOKEN` = *(Your Refresh Token from Step 2)*
3. Click **Save and Deploy**.
4. Copy your Worker URL (e.g., `https://spotify-now-playing.yourname.workers.dev/`).

---

### Step 4: Connect the Frontend
1. Clone or download this repository to your computer.
2. Open `script.js` in your text editor.
3. Update line 8 with your Cloudflare Worker URL:
   ```javascript
   const WORKER_URL = '[https://spotify-now-playing.yourname.workers.dev/](https://spotify-now-playing.yourname.workers.dev/)';
