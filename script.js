const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const cover = document.getElementById("cover"); // NEW

let songs = [
  {
    title: "Song 1",
    artist: "aditya",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpeg"
  },
  {
    title: "Song 2",
    artist: "namo",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpeg"
  },
  {
    title: "Song 3",
    artist: "unknown",
    src: "songs/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

// Load saved song (BONUS)
let songIndex = localStorage.getItem("songIndex") || 0;

// 🎵 Load song
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover; // update cover

  updatePlaylistUI();
  localStorage.setItem("songIndex", songIndex);
}

// ▶ Play
function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
}

// ⏸ Pause
function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
}

// Toggle play
playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

// ⏭ Next
nextBtn.addEventListener("click", () => {
  songIndex = (Number(songIndex) + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// ⏮ Prev
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// 📊 Progress
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;

  if (duration) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%";
  }

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

// ⏱ Format time
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// ⏩ Seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// 🔊 Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// 🔁 Autoplay next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// 📃 Create Playlist UI
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = `${song.title} - ${song.artist}`;

  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    playSong();
  });

  playlistEl.appendChild(li);
});

// 🎯 Highlight active song
function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll("li");

  items.forEach((li, index) => {
    li.classList.remove("active");
    if (index == songIndex) {
      li.classList.add("active");
    }
  });
}

