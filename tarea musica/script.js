
const songList = [
  {
      title: "piramide",
      file: "piramided.mp3",
      cover: "piramide.jpeg"

  },
  {
      title: "piazzolla",
      file: "piazzolla.mp3",
      cover: "piazzolla.jpeg"
  },
  {
      title: "tiempo",
      file: "tiempo.mp3",
      cover: "tiempo.jpeg"
  },
]
let actualSong = null
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)
audio.addEventListener("timeupdate", updateProgress)
play.addEventListener("click", () => {
  if (audio.paused) {
      playSong()   
  } else {
      pauseSong()
  }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())
function loadSongs() {
  songList.forEach((song, index) => {
      const li = document.createElement("li")
      const link = document.createElement("a")
      link.textContent = song.title
      link.href = "#"
      link.addEventListener("click", () => loadSong(index))
      li.appendChild(link)
      songs.appendChild(li)
  })
}
function loadSong(songIndex) {
  if (songIndex !== actualSong) {
      changeActiveClass(actualSong, songIndex)
      actualSong = songIndex
      audio.src = "./audio/" + songList[songIndex].file
      playSong()
      changeSongtitle(songIndex)
      changeCover(songIndex)
  }
}

function updateProgress(event) {
  const {duration, currentTime} = event.srcElement
  const percent = (currentTime / duration) * 100
  progress.style.width = percent + "%" 
}

function setProgress(event) {
  const totalWidth = this.offsetWidth
  const progressWidth = event.offsetX
  const current = (progressWidth / totalWidth) * audio.duration
  audio.currentTime = current
}

function updateControls() {
  if (audio.paused) {
      play.classList.remove("fa-pause")
      play.classList.add("fa-play")
  } else {
      play.classList.add("fa-pause")
      play.classList.remove("fa-play")
  }
}
function playSong() {
  if (actualSong !== null) {
      audio.play()
      updateControls()
  }
}
function pauseSong() {
  audio.pause()
  updateControls()
}
function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("a")
  if (lastIndex !== null) {
      links[lastIndex].classList.remove("active")
  }
  links[newIndex].classList.add("active")
}
function changeCover(songIndex) {
  cover.src = "./img/" + songList[songIndex].cover
}
function changeSongtitle(songIndex) {
   title.innerText = songList[songIndex].title
}
function prevSong() {
  if (actualSong > 0) {
      loadSong(actualSong - 1)
  } else {
      loadSong(songList.length - 1)
  }
}
function nextSong() {
  if (actualSong < songList.length -1) {
      loadSong(actualSong + 1)
  } else {
      loadSong(0)
  }
}
audio.addEventListener("ended", () => nextSong())
loadSongs()


const triangleContainer = document.querySelector(".triangle-container");

document.addEventListener("keydown", event => {
  if (event.key === "p") {
    createTriangle();
  }
});

document.addEventListener("mousemove", event => {
  moveTriangle(event.clientX, event.clientY);
});

function createTriangle() {
  const triangle = document.createElement("div");
  triangle.className = "triangle";
  triangle.style.width = `${getRandomNumber(1, 100)}px`;
  triangle.style.height = `${getRandomNumber(1, 100)}px`;
  triangle.style.backgroundColor = getRandomColor();
  triangle.style.opacity = "0.8";
  triangleContainer.appendChild(triangle);

  setTimeout(() => {
    triangle.style.transform = "translateY(500px)";
    triangle.style.opacity = "0";
  }, 10);

  triangle.addEventListener("transitionend", () => {
    triangle.remove();
  });
}

function moveTriangle(x, y) {
  const triangles = document.querySelectorAll(".triangle");
  triangles.forEach(triangle => {
    triangle.style.left = `${x - 20}px`;
  });
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}