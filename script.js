// 音乐数据
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

// 获取DOM元素
const audio = new Audio();
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const songList = document.getElementById('song-list');
const albumCover = document.querySelector('.album-cover');

// 当前歌曲索引
let currentSongIndex = 0;

// 初始化播放器
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

// 加载歌曲
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    cover.src = song.cover;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    
    // 更新播放列表高亮
    updatePlaylistHighlight(index);
}

// 渲染播放列表
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

// 更新播放列表高亮
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

// 播放/暂停
function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    audio.play();
    playBtn.textContent = '暂停';
    albumCover.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = '播放';
    albumCover.classList.remove('playing');
}

// 上一首/下一首
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

// 设置音量
function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

// 更新进度条
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // 更新时间显示
    currentTimeEl.textContent = formatTime(currentTime);
}

// 设置进度
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

// 更新总时长
function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

// 格式化时间
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

// 初始化播放器
initPlayer();
