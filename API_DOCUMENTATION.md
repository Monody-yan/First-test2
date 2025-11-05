# Music Player API Documentation

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Data Structures](#data-structures)
- [Public API Functions](#public-api-functions)
- [UI Components](#ui-components)
- [Event Listeners](#event-listeners)
- [Styling Classes](#styling-classes)
- [Examples](#examples)

---

## Overview

This is a web-based music player application built with vanilla JavaScript, HTML, and CSS. It provides a complete audio playback experience with playlist management, progress tracking, volume control, and a modern UI with animated album covers.

**Features:**
- Play, pause, next, and previous track controls
- Interactive progress bar with seek functionality
- Volume control slider
- Dynamic playlist rendering
- Animated rotating album cover during playback
- Automatic track progression
- Time display (current time and duration)

---

## Getting Started

### Installation

1. Clone or download the project files
2. Ensure you have the following files in your directory:
   - `index.html`
   - `script.js`
   - `style.css`

### Basic Usage

1. Open `index.html` in a web browser
2. The player initializes automatically on page load
3. Add your music files by modifying the `songs` array in `script.js`

### Quick Start Example

```javascript
// Modify the songs array in script.js
const songs = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        src: "path/to/your/audio.mp3",
        cover: "path/to/album/cover.jpg"
    }
];
```

---

## Data Structures

### Song Object

The application uses a song object structure to represent each track in the playlist.

**Structure:**
```javascript
{
    title: String,    // The title of the song
    artist: String,   // The artist name
    src: String,      // URL or path to the audio file
    cover: String     // URL or path to the album cover image
}
```

**Example:**
```javascript
{
    title: "夏天的风",
    artist: "温岚",
    src: "https://example.com/song1.mp3",
    cover: "https://via.placeholder.com/300/FF6B6B/FFFFFF?text=夏天的风"
}
```

### Songs Array

**Type:** `Array<SongObject>`

**Description:** Global array containing all songs in the playlist.

**Location:** `script.js` (lines 2-21)

**Example:**
```javascript
const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "song1.mp3",
        cover: "cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "song2.mp3",
        cover: "cover2.jpg"
    }
];
```

---

## Public API Functions

### initPlayer()

**Description:** Initializes the music player by loading the first song, rendering the playlist, and setting up all event listeners.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
initPlayer();
```

**Called automatically on:** Page load (line 177)

**What it does:**
1. Loads the first song from the playlist
2. Renders the playlist UI
3. Sets up click listeners for play/pause, previous, next buttons
4. Sets up volume slider listener
5. Sets up progress bar click listener
6. Sets up audio event listeners (timeupdate, ended, loadedmetadata)

---

### loadSong(index)

**Description:** Loads a song at the specified index from the songs array and updates the UI with song information.

**Parameters:**
- `index` (Number): The index of the song in the songs array (0-based)

**Returns:** `void`

**Usage:**
```javascript
// Load the first song
loadSong(0);

// Load the third song
loadSong(2);
```

**What it does:**
1. Retrieves the song object from the songs array
2. Sets the audio source to the song's src
3. Updates the album cover image
4. Updates the song title display
5. Updates the artist name display
6. Highlights the song in the playlist

**Example:**
```javascript
// Load and display song at index 1
currentSongIndex = 1;
loadSong(currentSongIndex);
```

---

### renderPlaylist()

**Description:** Dynamically generates and renders the playlist UI from the songs array.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
renderPlaylist();
```

**What it does:**
1. Clears the existing playlist UI
2. Iterates through the songs array
3. Creates list items for each song
4. Adds click listeners to each list item for song selection
5. Appends all items to the playlist container

**Example:**
```javascript
// After updating the songs array
songs.push({
    title: "New Song",
    artist: "New Artist",
    src: "new.mp3",
    cover: "new.jpg"
});
renderPlaylist(); // Re-render to show new song
```

---

### updatePlaylistHighlight(index)

**Description:** Updates the visual highlight in the playlist to indicate which song is currently active.

**Parameters:**
- `index` (Number): The index of the song to highlight

**Returns:** `void`

**Usage:**
```javascript
updatePlaylistHighlight(2); // Highlight the third song
```

**What it does:**
1. Queries all list items in the playlist
2. Removes the 'playing' class from all items
3. Adds the 'playing' class to the item at the specified index

**CSS Effect:** The highlighted item gets a green background and left border (see `.playing` class in CSS)

---

### togglePlay()

**Description:** Toggles between play and pause states.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
togglePlay(); // If playing, pauses. If paused, plays.
```

**What it does:**
- If audio is paused: calls `playSong()`
- If audio is playing: calls `pauseSong()`

**Example:**
```javascript
// Bind to custom button
document.getElementById('my-button').addEventListener('click', togglePlay);
```

---

### playSong()

**Description:** Starts audio playback and updates UI to reflect playing state.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
playSong();
```

**What it does:**
1. Starts audio playback (`audio.play()`)
2. Updates play button text to "暂停" (Pause)
3. Adds 'playing' class to album cover (starts rotation animation)

**Example:**
```javascript
// Auto-play on page load
window.addEventListener('load', () => {
    playSong();
});
```

---

### pauseSong()

**Description:** Pauses audio playback and updates UI to reflect paused state.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
pauseSong();
```

**What it does:**
1. Pauses audio playback (`audio.pause()`)
2. Updates play button text to "播放" (Play)
3. Removes 'playing' class from album cover (stops rotation animation)

---

### prevSong()

**Description:** Navigates to and plays the previous song in the playlist. Wraps around to the last song if currently on the first song.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
prevSong();
```

**What it does:**
1. Decrements `currentSongIndex`
2. If index becomes negative, sets it to the last song (wraps around)
3. Loads the song at the new index
4. Automatically starts playback

**Example:**
```javascript
// Bind to keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSong();
    }
});
```

---

### nextSong()

**Description:** Navigates to and plays the next song in the playlist. Wraps around to the first song if currently on the last song.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
nextSong();
```

**What it does:**
1. Increments `currentSongIndex`
2. If index exceeds array length, sets it to 0 (wraps around)
3. Loads the song at the new index
4. Automatically starts playback

**Example:**
```javascript
// Bind to keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSong();
    }
});

// Called automatically when a song ends
audio.addEventListener('ended', nextSong);
```

---

### setVolume()

**Description:** Adjusts the audio volume based on the volume slider value.

**Parameters:** None (reads from `volumeSlider` element)

**Returns:** `void`

**Usage:**
```javascript
// Called automatically when volume slider changes
// Or manually:
setVolume();
```

**What it does:**
1. Reads the current value from the volume slider (0-100)
2. Converts it to a decimal (0.0-1.0)
3. Sets the audio element's volume property

**Example:**
```javascript
// Set volume programmatically
volumeSlider.value = 75; // Set slider to 75%
setVolume(); // Apply the volume change

// Or directly:
audio.volume = 0.75; // 75% volume
```

---

### updateProgress()

**Description:** Updates the progress bar and current time display as the song plays. Called repeatedly during playback via the `timeupdate` event.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
// Called automatically by audio timeupdate event
// Can be called manually:
updateProgress();
```

**What it does:**
1. Gets current playback time and total duration
2. Calculates progress percentage
3. Updates progress bar width
4. Updates current time text display (formatted as MM:SS)

**Example:**
```javascript
// Manually update progress display
audio.addEventListener('timeupdate', updateProgress);
```

---

### setProgress(e)

**Description:** Seeks to a specific position in the audio when the user clicks on the progress bar.

**Parameters:**
- `e` (Event): The click event object

**Returns:** `void`

**Usage:**
```javascript
// Automatically bound to progress bar click
progressBar.addEventListener('click', setProgress);
```

**What it does:**
1. Gets the width of the progress bar
2. Gets the X position of the click
3. Calculates the corresponding time in the audio
4. Seeks to that time

**Example:**
```javascript
// Seek to 50% of the song
const duration = audio.duration;
audio.currentTime = duration * 0.5;
```

---

### updateDuration()

**Description:** Updates the duration display when audio metadata is loaded.

**Parameters:** None

**Returns:** `void`

**Usage:**
```javascript
// Called automatically when audio metadata loads
audio.addEventListener('loadedmetadata', updateDuration);
```

**What it does:**
1. Gets the total duration of the current audio
2. Formats it using `formatTime()`
3. Updates the duration text display

---

### formatTime(seconds)

**Description:** Formats a time value in seconds to a human-readable MM:SS format.

**Parameters:**
- `seconds` (Number): The time in seconds to format

**Returns:** `String` - Formatted time string (e.g., "3:45")

**Usage:**
```javascript
console.log(formatTime(125));  // Output: "2:05"
console.log(formatTime(61));   // Output: "1:01"
console.log(formatTime(8));    // Output: "0:08"
```

**What it does:**
1. Checks if the input is a valid number
2. Calculates minutes and seconds
3. Pads seconds with leading zero if needed
4. Returns formatted string

**Examples:**
```javascript
formatTime(0);      // "0:00"
formatTime(45);     // "0:45"
formatTime(125);    // "2:05"
formatTime(3661);   // "61:01"
formatTime(NaN);    // "0:00"
```

---

## UI Components

### Album Cover

**HTML Element:** `.album-cover` div containing an `<img>` element

**ID:** `cover`

**Description:** Displays the current song's album artwork with a rotating animation during playback.

**Properties:**
- Circular display (border-radius: 50%)
- Rotates continuously when playing (20s per rotation)
- Animation pauses when music is paused

**CSS Classes:**
- `.album-cover` - Container styling
- `.album-cover.playing` - Triggers rotation animation

---

### Song Information

**HTML Elements:** 
- `<h2>` with ID `song-title`
- `<p>` with ID `artist`

**Description:** Displays the current song title and artist name.

**Updates when:** A new song is loaded via `loadSong()`

---

### Progress Bar

**HTML Structure:**
```html
<div class="progress-container">
    <span id="current-time">0:00</span>
    <div class="progress-bar">
        <div class="progress" id="progress"></div>
    </div>
    <span id="duration">0:00</span>
</div>
```

**Description:** Shows playback progress with current time and total duration.

**Features:**
- Click to seek to any position
- Auto-updates during playback
- Displays formatted time (MM:SS)

---

### Control Buttons

**Buttons:**
1. **Previous Button** (`#prev-btn`) - Plays previous song
2. **Play/Pause Button** (`#play-btn`) - Toggles playback
3. **Next Button** (`#next-btn`) - Plays next song

**Text Changes:**
- Play button text: "播放" (Play) when paused, "暂停" (Pause) when playing

---

### Volume Control

**HTML Element:** `<input type="range" id="volume-slider">`

**Properties:**
- Range: 0-100
- Default: 50
- Updates audio volume in real-time

**Usage:**
```javascript
// Set volume to 80%
document.getElementById('volume-slider').value = 80;
setVolume();
```

---

### Playlist

**HTML Element:** `<ul id="song-list">`

**Description:** Dynamically generated list of all available songs.

**Features:**
- Click any song to play it
- Active song is highlighted with green background
- Scrollable if list exceeds max height (150px)

**CSS Class:**
- `.playing` - Applied to currently playing song

---

## Event Listeners

### User Interaction Events

| Element | Event | Handler | Description |
|---------|-------|---------|-------------|
| Play Button | `click` | `togglePlay()` | Toggle play/pause |
| Previous Button | `click` | `prevSong()` | Go to previous song |
| Next Button | `click` | `nextSong()` | Go to next song |
| Volume Slider | `input` | `setVolume()` | Adjust volume |
| Progress Bar | `click` | `setProgress(e)` | Seek to position |
| Playlist Items | `click` | (inline) | Load and play selected song |

### Audio Events

| Event | Handler | Description |
|-------|---------|-------------|
| `timeupdate` | `updateProgress()` | Update progress bar and time |
| `ended` | `nextSong()` | Auto-play next song |
| `loadedmetadata` | `updateDuration()` | Display total duration |

---

## Styling Classes

### Component Classes

| Class | Applied To | Purpose |
|-------|-----------|---------|
| `.music-player` | Main container | Glass morphism effect, padding, shadow |
| `.album-cover` | Album image container | Centering, spacing |
| `.album-cover.playing` | Album image (when playing) | Triggers rotation animation |
| `.song-info` | Song details container | Text alignment, spacing |
| `.progress-container` | Progress bar wrapper | Flexbox layout for time/bar |
| `.progress-bar` | Progress track | Background, height, cursor |
| `.progress` | Progress fill | Dynamic width, color, animation |
| `.controls` | Buttons container | Flexbox layout, spacing |
| `.volume-container` | Volume control wrapper | Flexbox layout |
| `.playlist` | Playlist container | Spacing, title styling |
| `#song-list li.playing` | Active playlist item | Highlight color, border |

### Animation

**Rotation Animation:**
```css
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```
Applied to album cover when `.playing` class is present.

---

## Examples

### Example 1: Adding Custom Songs

```javascript
// In script.js, modify the songs array
const songs = [
    {
        title: "My Favorite Song",
        artist: "My Favorite Artist",
        src: "/audio/favorite.mp3",
        cover: "/images/favorite.jpg"
    },
    {
        title: "Another Great Track",
        artist: "Another Artist",
        src: "/audio/another.mp3",
        cover: "/images/another.jpg"
    }
];
```

### Example 2: Programmatically Control Playback

```javascript
// Play a specific song
currentSongIndex = 1;
loadSong(currentSongIndex);
playSong();

// Pause after 10 seconds
setTimeout(() => {
    pauseSong();
}, 10000);
```

### Example 3: Adding Keyboard Controls

```javascript
// Add to script.js
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':  // Spacebar
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            prevSong();
            break;
        case 'ArrowUp':
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
            setVolume();
            break;
        case 'ArrowDown':
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
            setVolume();
            break;
    }
});
```

### Example 4: Shuffle Functionality

```javascript
// Add to script.js
function shufflePlaylist() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    renderPlaylist();
    loadSong(0);
}

// Add shuffle button to HTML
// <button id="shuffle-btn">随机播放</button>

// Add event listener
document.getElementById('shuffle-btn')?.addEventListener('click', shufflePlaylist);
```

### Example 5: Loop Single Song

```javascript
// Add to script.js
let loopMode = false; // false = no loop, true = loop current

function toggleLoop() {
    loopMode = !loopMode;
    console.log('Loop mode:', loopMode ? 'ON' : 'OFF');
}

// Modify the audio ended event listener
audio.removeEventListener('ended', nextSong); // Remove old listener
audio.addEventListener('ended', () => {
    if (loopMode) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});
```

### Example 6: Volume Presets

```javascript
// Add preset volume buttons
function setVolumePreset(level) {
    const presets = {
        low: 25,
        medium: 50,
        high: 75,
        max: 100
    };
    volumeSlider.value = presets[level] || 50;
    setVolume();
}

// Usage:
// setVolumePreset('low');    // 25% volume
// setVolumePreset('high');   // 75% volume
```

### Example 7: Progress Tracking

```javascript
// Add progress event for analytics
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    
    // Track when user reaches 25%, 50%, 75%, 100%
    if (progressPercent >= 25 && !window.progress25) {
        console.log('Song 25% complete');
        window.progress25 = true;
    }
    if (progressPercent >= 50 && !window.progress50) {
        console.log('Song 50% complete');
        window.progress50 = true;
    }
    // ... etc
});

// Reset on song change
function resetProgressTracking() {
    window.progress25 = false;
    window.progress50 = false;
    window.progress75 = false;
    window.progress100 = false;
}
```

### Example 8: Custom Playlist Filters

```javascript
// Filter songs by artist
function filterByArtist(artistName) {
    const filtered = songs.filter(song => 
        song.artist.toLowerCase().includes(artistName.toLowerCase())
    );
    
    // Temporarily replace songs array and re-render
    const originalSongs = [...songs];
    songs.length = 0;
    songs.push(...filtered);
    renderPlaylist();
    
    // Return function to restore
    return () => {
        songs.length = 0;
        songs.push(...originalSongs);
        renderPlaylist();
    };
}

// Usage:
// const restore = filterByArtist('周杰伦');
// // ... interact with filtered list
// restore(); // Show all songs again
```

---

## Advanced Customization

### Changing the Color Scheme

Edit `style.css`:

```css
/* Main background gradient */
body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}

/* Play button color */
#play-btn {
    background: #YOUR_COLOR;
}

/* Progress bar and highlights */
.progress, #song-list li.playing {
    background: #YOUR_ACCENT_COLOR;
}
```

### Adding Repeat Modes

```javascript
// Add after global variables
let repeatMode = 'none'; // 'none', 'all', 'one'

function cycleRepeatMode() {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    repeatMode = modes[(currentIndex + 1) % modes.length];
    console.log('Repeat mode:', repeatMode);
    return repeatMode;
}

// Update the ended event handler
audio.addEventListener('ended', () => {
    if (repeatMode === 'one') {
        audio.currentTime = 0;
        playSong();
    } else if (repeatMode === 'all') {
        nextSong();
    } else {
        // Stop at end of playlist
        if (currentSongIndex === songs.length - 1) {
            pauseSong();
            currentSongIndex = 0;
            loadSong(currentSongIndex);
        } else {
            nextSong();
        }
    }
});
```

---

## Browser Compatibility

**Supported Browsers:**
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

**Required Features:**
- HTML5 Audio API
- ES6 JavaScript
- CSS3 (animations, flexbox, backdrop-filter)

---

## Troubleshooting

### Audio Not Playing

1. Check that audio URLs are valid and accessible
2. Verify CORS settings if loading from external domain
3. Check browser console for errors
4. Ensure audio format is supported (MP3, WAV, OGG)

### Progress Bar Not Updating

1. Verify `timeupdate` event is firing (check console)
2. Ensure audio has duration metadata (loadedmetadata event)
3. Check that `updateProgress()` is called

### Album Cover Not Rotating

1. Verify `.playing` class is added to `.album-cover`
2. Check CSS animation is not disabled
3. Ensure CSS is properly linked

---

## Performance Considerations

- **Large Playlists:** For playlists with 100+ songs, consider implementing virtual scrolling
- **Audio Preloading:** Currently loads on demand; consider preloading next track
- **Image Optimization:** Use compressed images for album covers (< 100KB recommended)
- **Memory Management:** Audio objects are reused; no cleanup needed for typical use

---

## License

This project is provided as-is for educational and personal use.

---

## Version

**Current Version:** 1.0.0
**Last Updated:** 2025-11-05

---

For questions or issues, please refer to the source code comments or create an issue in the project repository.
