# Music Player (音乐播放器)

A modern, responsive web-based music player built with vanilla JavaScript, HTML5, and CSS3. Features a beautiful UI with animated album covers, playlist management, and complete playback controls.

![Music Player](https://via.placeholder.com/800x400/667eea/ffffff?text=Music+Player)

## 🎵 Features

- **Playback Controls**: Play, pause, next, previous with seamless transitions
- **Progress Management**: Interactive progress bar with click-to-seek functionality
- **Volume Control**: Adjustable volume slider (0-100%)
- **Playlist**: Dynamic playlist with click-to-play and visual highlighting
- **Animated UI**: Rotating album cover animation during playback
- **Time Display**: Current time and total duration in MM:SS format
- **Auto-progression**: Automatically plays next song when current song ends
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Glass morphism effect with gradient background

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome 70+, Firefox 65+, Safari 12+, Edge 79+)
- No server required - runs locally in browser

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd music-player
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Add your music**
   - Edit the `songs` array in `script.js`
   - Update with your own music file URLs and album covers

## 📁 Project Structure

```
music-player/
│
├── index.html              # Main HTML structure
├── script.js               # JavaScript functionality
├── style.css               # Styling and animations
├── README.md               # Project overview (this file)
└── API_DOCUMENTATION.md    # Comprehensive API documentation
```

## 🎯 Usage

### Basic Setup

1. **Configure Your Playlist**

   Edit the `songs` array in `script.js`:

   ```javascript
   const songs = [
       {
           title: "Song Title",
           artist: "Artist Name",
           src: "path/to/audio.mp3",
           cover: "path/to/cover.jpg"
       },
       // Add more songs...
   ];
   ```

2. **Open in Browser**
   
   The player will automatically initialize and load the first song.

3. **Controls**
   - Click **播放** (Play) to start playback
   - Use **上一首** (Previous) and **下一首** (Next) to navigate
   - Click on the **progress bar** to seek
   - Adjust **volume slider** for volume control
   - Click any song in the **playlist** to play it

## 📚 Documentation

For detailed API documentation, including:
- Function references
- Component descriptions
- Event listeners
- Usage examples
- Advanced customization

See **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## 🎨 UI Components

### Main Components

| Component | Description |
|-----------|-------------|
| **Album Cover** | Circular rotating image (rotates during playback) |
| **Song Info** | Displays current song title and artist |
| **Progress Bar** | Shows playback progress with time display |
| **Control Buttons** | Play/Pause, Previous, Next |
| **Volume Control** | Slider for volume adjustment (0-100%) |
| **Playlist** | Scrollable list of all songs |

### Visual States

- **Playing**: Album cover rotates, play button shows "暂停" (Pause)
- **Paused**: Album cover stops, play button shows "播放" (Play)
- **Active Song**: Highlighted in playlist with green background

## 🛠️ API Overview

### Core Functions

```javascript
// Playback control
togglePlay()    // Toggle play/pause
playSong()      // Start playback
pauseSong()     // Pause playback

// Navigation
nextSong()      // Go to next song
prevSong()      // Go to previous song
loadSong(index) // Load specific song

// UI Updates
renderPlaylist()              // Render playlist UI
updatePlaylistHighlight(index) // Highlight current song
updateProgress()               // Update progress bar
updateDuration()               // Update duration display

// Utilities
formatTime(seconds)  // Format time to MM:SS
setVolume()         // Set audio volume
setProgress(event)  // Seek to position
```

For detailed documentation of all functions, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🎓 Examples

### Example 1: Add Custom Songs

```javascript
const songs = [
    {
        title: "夏天的风",
        artist: "温岚",
        src: "https://example.com/song1.mp3",
        cover: "https://via.placeholder.com/300/FF6B6B/FFFFFF"
    },
    {
        title: "晴天",
        artist: "周杰伦",
        src: "https://example.com/song2.mp3",
        cover: "https://via.placeholder.com/300/4ECDC4/FFFFFF"
    }
];
```

### Example 2: Keyboard Controls

Add keyboard shortcuts:

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') togglePlay();        // Spacebar: Play/Pause
    if (e.key === 'ArrowRight') nextSong(); // Right Arrow: Next
    if (e.key === 'ArrowLeft') prevSong();  // Left Arrow: Previous
});
```

### Example 3: Programmatic Control

```javascript
// Play specific song
currentSongIndex = 2;
loadSong(currentSongIndex);
playSong();

// Set volume to 75%
volumeSlider.value = 75;
setVolume();
```

More examples available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🎨 Customization

### Change Color Scheme

Edit `style.css`:

```css
/* Background gradient */
body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}

/* Accent color (progress bar, highlights) */
.progress {
    background: #YOUR_ACCENT_COLOR;
}
```

### Modify Album Cover Animation

```css
.album-cover img {
    animation: rotate 20s linear infinite; /* Change 20s to adjust speed */
}
```

### Adjust Player Size

```css
.music-player {
    max-width: 400px; /* Change this value */
}
```

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Structure and Audio API
- **CSS3**: Styling, animations, glass morphism effects
- **JavaScript (ES6)**: Functionality and DOM manipulation

### Browser Requirements

- HTML5 Audio API support
- ES6 JavaScript support
- CSS3 (flexbox, animations, backdrop-filter)

### Audio Format Support

- MP3 ✅
- WAV ✅
- OGG ✅
- AAC ✅ (browser dependent)

## 📱 Responsive Design

The player is fully responsive and works on:
- Desktop computers (optimized for)
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Audio Not Playing

1. Verify audio file URLs are correct and accessible
2. Check browser console for errors
3. Ensure audio format is supported
4. Check CORS settings for external files

### Progress Bar Not Working

1. Ensure audio has loaded metadata
2. Check that `timeupdate` event is firing
3. Verify `updateProgress()` is being called

### Styling Issues

1. Ensure `style.css` is properly linked
2. Clear browser cache
3. Check for CSS conflicts

For more troubleshooting tips, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🚀 Advanced Features

Want to extend the player? Check out these ideas:

- **Shuffle Mode**: Randomize playlist order
- **Repeat Modes**: Loop one song or entire playlist
- **Equalizer**: Add audio visualization
- **Search**: Filter songs in playlist
- **Favorites**: Mark and filter favorite songs
- **Playlists**: Multiple playlist support
- **Lyrics**: Display synchronized lyrics

Examples and implementation guides in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 📄 Files Description

### index.html
Main HTML structure containing:
- Album cover container
- Song information display
- Progress bar and time display
- Control buttons
- Volume slider
- Playlist container

### script.js
JavaScript functionality including:
- Song data structure
- Player initialization
- Playback controls
- Event listeners
- UI updates
- Time formatting

### style.css
Styling definitions including:
- Layout and positioning
- Glass morphism effects
- Animations
- Responsive design
- Color scheme

### API_DOCUMENTATION.md
Comprehensive documentation including:
- Complete API reference
- Component descriptions
- Event listeners
- Usage examples
- Advanced customization guides

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional playback features
- Enhanced UI/UX
- Performance optimizations
- Accessibility improvements
- Cross-browser compatibility

## 📝 License

This project is provided as-is for educational and personal use.

## 📧 Support

For detailed documentation and API reference, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🎉 Acknowledgments

Built with vanilla JavaScript - no frameworks or libraries required!

---

**Version**: 1.0.0  
**Last Updated**: 2025-11-05  
**Language**: JavaScript (ES6), HTML5, CSS3
