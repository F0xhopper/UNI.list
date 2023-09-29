import axios, { AxiosRequestConfig } from "axios";

const allPlaylist = document.querySelectorAll(".PlaylistContainer");
const firstsongs = document.querySelector(".songsContainer");
const playListImage = document.querySelectorAll(".playlistImage");
const addSongButton = document.querySelector("#addSongButton");
const songUrlInput = document.querySelector("#songUrlInput");
const playlistNameInput = document.querySelector("#playlistNameInput");
const platylistImageInput = document.querySelector("#platylistImageInput");
const playlistCreateButton = document.querySelector("#playlistCreateButton");
const mainPlaylistContainer = document.querySelector("#mainPlaylistContainer");
const addSongPlaylistSelector = document.querySelector(
  "#addSongPlaylistSelector"
);

//Account and Data Functions
const demoAccountData = [];

let currentAccountArrayOfPlaylistObjects = [
  {
    playlistName: "Ethereal Momentum",
    Image:
      "https://i.pinimg.com/564x/64/d8/1b/64d81b27e077759f2d522ca5e34f8c51.jpg",
    songs: [
      {
        songName: "Agony - Yung Lean ( sped up )",
        songLink:
          "https://www.youtube.com/watch?v=DizySJ1eznw&ab_channel=hamadisloser",
      },
      {
        songName: "Agony - Yung Lean ( sped up )",
        songLink:
          "https://www.youtube.com/watch?v=DizySJ1eznw&ab_channel=hamadisloser",
      },
      {
        songName: "Agony - Yung Lean ( sped up )",
        songLink:
          "https://www.youtube.com/watch?v=DizySJ1eznw&ab_channel=hamadisloser",
      },
      {
        songName: "Agony - Yung Lean ( sped up )",
        songLink:
          "https://www.youtube.com/watch?v=DizySJ1eznw&ab_channel=hamadisloser",
      },
    ],
  },
  {
    playlistName: "GrapInward",
    Image:
      "https://i.pinimg.com/564x/56/a4/44/56a4441be348a477d43a3fb231050038.jpg",
    songs: [],
  },
];

class playlist {
  constructor(playlistName, imgPath) {
    this.playlistName = playlistName;
    this.Image = imgPath;
    this.songs = [];
  }
}
class song {
  constructor(songName, songLink) {
    this.songName = songName;
    this.songLink = songLink;
  }
}

async function convertingInputedFileToDataURL(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  let result;
  await new Promise((resolve) => {
    reader.onload = function () {
      result = reader.result;
      resolve();
    };
  });
  return result;
}

async function createPlaylist() {
  var file = platylistImageInput.files[0];
  await convertingInputedFileToDataURL(file).then((result) => {
    currentAccountArrayOfPlaylistObjects.unshift(
      new playlist(playlistNameInput.value, result)
    );
  });
  playlistNameInput.value = "";
  platylistImageInput.value = "";
}
async function gettingYTSongFromUrl(enteredURl) {
  const requestUrl = `http://youtube.com/oembed?url=${enteredURl}&format=json`;
  const result = await axios
    .get(requestUrl)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return res;
    });
  return result.title;
}
async function gettingSCSongFromUrl(enteredURl) {
  const requestUrl = `https://soundcloud.com/oembed?format=json&url=${enteredURl}`;
  const result = await axios
    .get(requestUrl)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return res;
    });
  return result.title;
}
async function gettingSSongFromUrl(enteredURl) {
  const requestUrl = `https://open.spotify.com/oembed?url=${enteredURl}`;
  const result = await axios
    .get(requestUrl)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return res;
    });
  return result.title;
}

async function processInputedURL(inputtedURL) {
  if (inputtedURL.includes("youtube")) {
    return await gettingYTSongFromUrl(inputtedURL);
  } else if (inputtedURL.includes("soundcloud")) {
    return await gettingSCSongFromUrl(inputtedURL);
  } else if (inputtedURL.includes("spotify")) {
    return await gettingSSongFromUrl(inputtedURL);
  }
}

async function addingSong() {
  if (songUrlInput.value != "") {
    let selectedPlaylist = currentAccountArrayOfPlaylistObjects.filter(
      (obj) => {
        return obj.playlistName == addSongPlaylistSelector.value;
      }
    );
    console.log(selectedPlaylist);
    await processInputedURL(songUrlInput.value).then((result) => {
      console.log(result);
      selectedPlaylist[0].songs.push(new song(result, songUrlInput.value));
    });
  }
  songUrlInput.value = "";
  addSongPlaylistSelector.value = "Playlist";
}
//Changin UI/Display Functions

function updateDashboardUI() {
  addSongPlaylistSelector.innerHTML = "<option>Playlist</option>";
  currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
    addSongPlaylistSelector.add(
      new Option(playlist.playlistName, playlist.playlistName)
    );
  });

  let string = ``;

  currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
    string += `<div class="PlaylistContainer"id="${playlist.playlistName}"><img class = 'playlistImage'src="${playlist.Image}"><div class="playlistName">${playlist.playlistName}</div><div  class = 'hidden songsContainer'>`;

    for (let i = 0; i < playlist.songs.length; i++) {
      string += `<div class="playlistsongContainer"><a class='playlistSong' target="_blank"   href='${playlist.songs[i].songLink}'> ${playlist.songs[i].songName}</a></div>`;
    }

    string += "</div></div>";
  });
  mainPlaylistContainer.innerHTML = string;

  document.querySelectorAll(".PlaylistContainer").forEach((playlist) => {
    playlist.addEventListener("mouseenter", (e) => {
      if (e.target.classList.contains("PlaylistContainer")) {
        let target = e.target;
        let image = target.querySelector(".playlistImage");
        let song = target.querySelector(".songsContainer");
        let playlistName = target.querySelector(".playlistName");
        playlistName.style.display = "none";
        target.style.width = "490px";
        target.style.height = "490px";
        target.style.margin = "0px";
        image.classList.toggle("blurred");
        song.classList.toggle("hidden");
      } else false;
    });
    playlist.addEventListener("mouseleave", (e) => {
      if (e.target.classList.contains("PlaylistContainer")) {
        let target = e.target;
        let image = target.querySelector(".playlistImage");
        let song = target.querySelector(".songsContainer");
        let playlistName = target.querySelector(".playlistName");
        playlistName.style.display = "";
        target.style.margin = "20px";
        target.style.width = "450px";
        target.style.height = "450px";
        image.classList.toggle("blurred");
        song.classList.toggle("hidden");
      } else false;
    });
  });
}

//allPlaylist.addEventListener("mouseover", (e) => {
//firstsongs.classList.toggle("hidden");
//playListImage.classList.toggle("blurred");
//});
//allPlaylist.addEventListener("mouseout", (e) => {
//firstsongs.classList.toggle("hidden");
//.classList.toggle("blurred");
//});

function init() {
  window.addEventListener("load", updateDashboardUI);
  addSongButton.addEventListener("click", async () => {
    await addingSong();
    updateDashboardUI();
  });
  playlistCreateButton.addEventListener("click", async () => {
    await createPlaylist();

    updateDashboardUI();
  });
}
init();
