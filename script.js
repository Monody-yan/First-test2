/**
 * Music Player Application
 * A fully-featured web-based music player with playlist management,
 * playback controls, and animated UI elements.
 * 
 * @version 1.0.0
 * @author Music Player Team
 */

/**
 * Song data structure
 * @typedef {Object} Song
 * @property {string} title - The title of the song
 * @property {string} artist - The artist name
 * @property {string} src - URL or path to the audio file
 * @property {string} cover - URL or path to the album cover image
 */

/**
 * Array of all available songs in the playlist
 * @type {Song[]}
 */
const songs = [
    {
        title: "夏天的风",
        artist: "温岚",
        src: "https://example.com/song1.mp3", // 替换为实际音乐URL
        cover: "https://via.placeholder.com/300/FF6B6B/FFFFFF?text=夏天的风"
    },
    {
        title: "晴天",
        artist: "周杰伦",
        src: "https://example.com/song2.mp3", // 替换为实际音乐URL
        cover: "https://via.placeholder.com/300/4ECDC4/FFFFFF?text=晴天"
    },
    {
        title: "光年之外",
        artist: "G.E.M.邓紫棋",
        src: "https://example.com/song3.mp3", // 替换为实际音乐URL
        cover: "https://via.placeholder.com/300/45B7D1/FFFFFF?text=光年之外"
    }
];

// ========================
// DOM Element References
// ========================

/**
 * HTML5 Audio element for playing music
 * @type {HTMLAudioElement}
 */
const audio = new Audio();
/** @type {HTMLImageElement} Album cover image element */
const cover = document.getElementById('cover');

/** @type {HTMLElement} Song title display element */
const songTitle = document.getElementById('song-title');

/** @type {HTMLElement} Artist name display element */
const artist = document.getElementById('artist');

/** @type {HTMLElement} Progress bar fill element */
const progress = document.getElementById('progress');

/** @type {HTMLElement} Current time display element */
const currentTimeEl = document.getElementById('current-time');

/** @type {HTMLElement} Total duration display element */
const durationEl = document.getElementById('duration');

/** @type {HTMLElement} Progress bar container element */
const progressBar = document.querySelector('.progress-bar');

/** @type {HTMLButtonElement} Play/Pause button */
const playBtn = document.getElementById('play-btn');

/** @type {HTMLButtonElement} Previous song button */
const prevBtn = document.getElementById('prev-btn');

/** @type {HTMLButtonElement} Next song button */
const nextBtn = document.getElementById('next-btn');

/** @type {HTMLInputElement} Volume control slider */
const volumeSlider = document.getElementById('volume-slider');

/** @type {HTMLUListElement} Playlist container element */
const songList = document.getElementById('song-list');

/** @type {HTMLElement} Album cover container for animation */
const albumCover = document.querySelector('.album-cover');

// ========================
// State Variables
// ========================

/**
 * Index of the currently playing/loaded song
 * @type {number}
 */
let currentSongIndex = 0;

// ========================
// Core Player Functions
// ========================

/**
 * Initializes the music player
 * Sets up the initial song, renders the playlist, and attaches all event listeners
 * This function is automatically called on page load
 * 
 * @function initPlayer
 * @returns {void}
 * 
 * @example
 * // Called automatically on page load
 * initPlayer();
 */
function initPlayer() {
    loadSong(currentSongIndex);
    renderPlaylist();
    
    // 事件监听器
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    volumeSlider.addEventListener('input', setVolume);
    progressBar.addEventListener('click', setProgress);
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', updateDuration);
}

/**
 * Loads a song at the specified index
 * Updates the audio source, album cover, song title, and artist information
 * Also updates the playlist highlighting
 * 
 * @function loadSong
 * @param {number} index - The index of the song in the songs array (0-based)
 * @returns {void}
 * 
 * @example
 * // Load the first song
 * loadSong(0);
 * 
 * @example
 * // Load the third song
 * loadSong(2);
 */
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    cover.src = song.cover;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    
    // 更新播放列表高亮
    updatePlaylistHighlight(index);
}

/**
 * Renders the playlist UI dynamically from the songs array
 * Creates list items for each song and adds click listeners for playback
 * 
 * @function renderPlaylist
 * @returns {void}
 * 
 * @example
 * // Render the playlist after modifying songs array
 * songs.push({ title: "New Song", artist: "Artist", src: "new.mp3", cover: "cover.jpg" });
 * renderPlaylist();
 */
function renderPlaylist() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(li);
    });
}

/**
 * Updates the visual highlighting in the playlist
 * Adds the 'playing' class to the currently active song and removes it from others
 * 
 * @function updatePlaylistHighlight
 * @param {number} index - The index of the song to highlight
 * @returns {void}
 * 
 * @example
 * // Highlight the second song in the playlist
 * updatePlaylistHighlight(1);
 */
function updatePlaylistHighlight(index) {
    const items = songList.querySelectorAll('li');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('playing');
        } else {
            item.classList.remove('playing');
        }
    });
}

// ========================
// Playback Control Functions
// ========================

/**
 * Toggles between play and pause states
 * If the audio is paused, it will play. If playing, it will pause.
 * 
 * @function togglePlay
 * @returns {void}
 * 
 * @example
 * // Toggle playback state
 * togglePlay();
 * 
 * @example
 * // Bind to a custom button
 * document.getElementById('my-toggle-btn').addEventListener('click', togglePlay);
 */
function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

/**
 * Starts audio playback
 * Updates the play button text to "暂停" (Pause) and starts the album cover rotation
 * 
 * @function playSong
 * @returns {void}
 * 
 * @example
 * // Start playing the current song
 * playSong();
 * 
 * @example
 * // Auto-play after loading a song
 * loadSong(0);
 * playSong();
 */
function playSong() {
    audio.play();
    playBtn.textContent = '暂停';
    albumCover.classList.add('playing');
}

/**
 * Pauses audio playback
 * Updates the play button text to "播放" (Play) and stops the album cover rotation
 * 
 * @function pauseSong
 * @returns {void}
 * 
 * @example
 * // Pause the current song
 * pauseSong();
 * 
 * @example
 * // Pause after 10 seconds of playback
 * playSong();
 * setTimeout(pauseSong, 10000);
 */
function pauseSong() {
    audio.pause();
    playBtn.textContent = '播放';
    albumCover.classList.remove('playing');
}

// ========================
// Navigation Functions
// ========================

/**
 * Navigates to and plays the previous song in the playlist
 * Wraps around to the last song if currently on the first song
 * Automatically starts playback of the new song
 * 
 * @function prevSong
 * @returns {void}
 * 
 * @example
 * // Go to previous song
 * prevSong();
 * 
 * @example
 * // Bind to left arrow key
 * document.addEventListener('keydown', (e) => {
 *     if (e.key === 'ArrowLeft') prevSong();
 * });
 */
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

/**
 * Navigates to and plays the next song in the playlist
 * Wraps around to the first song if currently on the last song
 * Automatically starts playback of the new song
 * 
 * @function nextSong
 * @returns {void}
 * 
 * @example
 * // Go to next song
 * nextSong();
 * 
 * @example
 * // Auto-advance when song ends
 * audio.addEventListener('ended', nextSong);
 */
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

// ========================
// Volume Control
// ========================

/**
 * Sets the audio volume based on the volume slider value
 * Reads the slider value (0-100) and converts it to audio volume (0.0-1.0)
 * 
 * @function setVolume
 * @returns {void}
 * 
 * @example
 * // Set volume to 75%
 * volumeSlider.value = 75;
 * setVolume();
 * 
 * @example
 * // Called automatically when slider changes
 * volumeSlider.addEventListener('input', setVolume);
 */
function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

// ========================
// Progress Management
// ========================

/**
 * Updates the progress bar and current time display during playback
 * Called continuously via the audio 'timeupdate' event
 * Calculates the progress percentage and updates both the visual bar and time text
 * 
 * @function updateProgress
 * @returns {void}
 * 
 * @example
 * // Manually trigger progress update
 * updateProgress();
 * 
 * @example
 * // Automatically called during playback
 * audio.addEventListener('timeupdate', updateProgress);
 */
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // 更新时间显示
    currentTimeEl.textContent = formatTime(currentTime);
}

/**
 * Seeks to a specific position in the audio based on progress bar click
 * Calculates the click position relative to the bar width and seeks accordingly
 * 
 * @function setProgress
 * @param {MouseEvent} e - The click event object
 * @returns {void}
 * 
 * @example
 * // Bind to progress bar click
 * progressBar.addEventListener('click', setProgress);
 * 
 * @example
 * // Seek to 50% of the song manually
 * audio.currentTime = audio.duration * 0.5;
 */
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

/**
 * Updates the total duration display when audio metadata is loaded
 * Called via the audio 'loadedmetadata' event
 * 
 * @function updateDuration
 * @returns {void}
 * 
 * @example
 * // Automatically called when metadata loads
 * audio.addEventListener('loadedmetadata', updateDuration);
 */
function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

// ========================
// Utility Functions
// ========================

/**
 * Formats a time value in seconds to MM:SS format
 * Handles edge cases like NaN and ensures proper zero-padding
 * 
 * @function formatTime
 * @param {number} seconds - The time in seconds to format
 * @returns {string} Formatted time string in MM:SS format
 * 
 * @example
 * formatTime(0);      // Returns: "0:00"
 * formatTime(45);     // Returns: "0:45"
 * formatTime(125);    // Returns: "2:05"
 * formatTime(3661);   // Returns: "61:01"
 * formatTime(NaN);    // Returns: "0:00"
 */
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

// ========================
// Application Entry Point
// ========================

/**
 * Initialize the music player on page load
 * This starts the application and sets up all functionality
 */
initPlayer();
