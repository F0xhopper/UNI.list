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
const logInButton = document.querySelector("#logInButton");
const logInPasswordInput = document.querySelector("#logInPasswordInput");
const logInUsernameInput = document.querySelector("#logInUsernameInput");
const logInContainer = document.querySelector("#logInContainer");
const logOutButton = document.querySelector("#logOutButton");
const accountDetailsDisplayCon = document.querySelector(
  "#accountDetailsDisplayCon"
);
const addSongDisplayCon = document.querySelector("#addSongDisplayCon");
const createPlaylistDisplayCon = document.querySelector(
  "#createPlaylistDisplayCon"
);
//Account and Data Functions
const demoAccountData = [
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
let currentAccountArrayOfPlaylistObjects = [];

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
//logging In/out

function loggingInUpdateCurrentAccount() {
  if (logInUsernameInput.value == "1" && logInPasswordInput.value == "1") {
    currentAccountArrayOfPlaylistObjects = demoAccountData;
  } else console.log("wrong");
}
function loggingOutUpdateCurrentAccount() {
  currentAccountArrayOfPlaylistObjects = "";
}
//Changin UI/Display Functions

function updateDashboardUI() {
  if (currentAccountArrayOfPlaylistObjects.length != 0) {
    mainPlaylistContainer.style.display = "block";
    logInContainer.style.display = "none";
    accountDetailsDisplayCon.style.display = "block";
    addSongDisplayCon.style.display = "block";
    createPlaylistDisplayCon.style.display = "block";
    addSongPlaylistSelector.innerHTML = "<option>Playlist</option>";
    currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
      addSongPlaylistSelector.add(
        new Option(playlist.playlistName, playlist.playlistName)
      );
    });

    let string = ``;

    currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
      string += `<div class="PlaylistContainer"id="${playlist.playlistName}"><div class='imageContainer'><img class = 'playlistImage'src="${playlist.Image}"><div class="playlistName">${playlist.playlistName}</div><div  class = 'hidden songsContainer'>`;

      for (let i = 0; i < playlist.songs.length; i++) {
        string += `<div class="playlistsongContainer"><a class='playlistSong' target="_blank"   href='${playlist.songs[i].songLink}'> ${playlist.songs[i].songName}</a></div>`;
      }

      string += "</div></div></div>";
    });
    mainPlaylistContainer.innerHTML = string;

    document.querySelectorAll(".PlaylistContainer").forEach((playlist) => {
      playlist.addEventListener("mouseenter", (e) => {
        if (e.target.classList.contains("PlaylistContainer")) {
          let target = e.target;
          let song = target.querySelector(".songsContainer");
          let image = target.querySelector(".playlistImage");
          let imageContainer = target.querySelector(".imageContainer");

          imageContainer.style.height = "100%";
          imageContainer.style.width = "100%";
          imageContainer.style.marginTop = "0";
          image.classList.toggle("blurred");
          song.classList.toggle("hidden");
        } else false;
      });
      playlist.addEventListener("mouseleave", (e) => {
        if (e.target.classList.contains("PlaylistContainer")) {
          let target = e.target;

          let song = target.querySelector(".songsContainer");
          let image = target.querySelector(".playlistImage");
          let imageContainer = target.querySelector(".imageContainer");

          imageContainer.style.height = "80%";
          imageContainer.style.width = "80%";
          imageContainer.style.marginTop = "42px";
          image.classList.toggle("blurred");
          song.classList.toggle("hidden");
        } else false;
      });
    });
  } else {
    mainPlaylistContainer.style.display = "none";
    logInContainer.style.display = "block";
    accountDetailsDisplayCon.style.display = "none";
    addSongDisplayCon.style.display = "none";
    createPlaylistDisplayCon.style.display = "none";
    addSongPlaylistSelector.innerHTML = "<option>Playlist</option>";
  }
}
function logInUiChange() {}
function logOutUiChange() {}
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
  logInButton.addEventListener("click", () => {
    loggingInUpdateCurrentAccount();
    updateDashboardUI();
  });
  logOutButton.addEventListener("click", () => {
    loggingOutUpdateCurrentAccount();
    updateDashboardUI();
  });
}
init();
