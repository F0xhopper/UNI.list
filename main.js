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

const logInBar = document.querySelector("#logInBar");
const UserUiBar = document.querySelector("#UserUiBar");
const logInErrorMessage = document.querySelector("#logInErrorMessage");
const accountDetailsUsernameDisplay = document.querySelector(
  "#accountDetailsUsernameDisplay"
);
const imageInput = document.querySelector("#imageInput");
const imageInputLabel = document.querySelector("#imageInputLabel");
//Account and Data Functions
let loggedIn = false;
let demoAccountLogIn = {
  Username: "1",
  Password: "1",
};
let demoAccountData = [
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
    ],
  },
  {
    playlistName: "Sorrowing",
    Image:
      "https://i.pinimg.com/564x/d3/99/d3/d399d349cb5f5d2d9d5823b6c689c6c5.jpg",
    songs: [
      {
        songName: "Agony - Yung Lean ( sped up )",
        songLink:
          "https://www.youtube.com/watch?v=DizySJ1eznw&ab_channel=hamadisloser",
      },
    ],
  },
  {
    playlistName: "AboveRain Tracks",
    Image:
      "https://i.pinimg.com/564x/7a/70/35/7a70358787a4232419935a902eb4dda0.jpg",
    songs: [
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
      "https://i.pinimg.com/564x/65/2d/fc/652dfc2577c38cbc10a51e3fddc37b54.jpg",
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
  var file = imageInput.files[0];
  await convertingInputedFileToDataURL(file).then((result) => {
    currentAccountArrayOfPlaylistObjects.unshift(
      new playlist(playlistNameInput.value, result)
    );
  });

  playlistNameInput.value = "";
  imageInput.value = "";
  imageInputLabel.textContent = "Select Image";
  imageInputLabel.style.marginLeft = "34px";
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
  if (
    logInUsernameInput.value == demoAccountLogIn.Username &&
    logInPasswordInput.value == demoAccountLogIn.Password
  ) {
    loggedIn = true;
    currentAccountArrayOfPlaylistObjects = demoAccountData;
    logInPasswordInput.value = "";
    logInUsernameInput.value = "";
  } else {
    logInPasswordInput.value = "";
    logInUsernameInput.value = "";
    logInContainer.style.height = "290px";
    logInErrorMessage.style.display = "block";
  }
}
function loggingOutUpdateCurrentAccount() {
  loggedIn = false;
  currentAccountArrayOfPlaylistObjects = "";
  logInContainer.style.height = "230px";
  logInErrorMessage.style.display = "none";
}
//Changin UI/Display Functions

function changeImageInputText() {
  imageInputLabel.textContent = "Image Selected";
  imageInputLabel.style.marginLeft = "24px";
}

function updateDashboardUI() {
  if (loggedIn == true) {
    mainPlaylistContainer.style.display = "block";
    logInContainer.style.display = "none";
    logInBar.style.display = "none";
    UserUiBar.style.display = "block";
    addSongPlaylistSelector.innerHTML =
      "<option disabled selected hidden>Playlist</option>";
    accountDetailsUsernameDisplay.textContent = demoAccountLogIn.Username;
    demoAccountData = currentAccountArrayOfPlaylistObjects;
    currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
      addSongPlaylistSelector.add(
        new Option(playlist.playlistName, playlist.playlistName)
      );
    });

    let string = ``;

    currentAccountArrayOfPlaylistObjects.forEach((playlist) => {
      string += `<div class="PlaylistContainer"id="${playlist.playlistName}"><div class='imageContainer'><img class = 'playlistImage'src="${playlist.Image}"><div class="playlistName">${playlist.playlistName}</div><div  class = 'hidden songsContainer'><button class='deleteButton'>x</button><button class='shareButton'>    Copy</button>`;

      for (let i = 0; i < playlist.songs.length; i++) {
        string += `<div class="playlistsongContainer"><a class='playlistSong' target="_blank"   href='${playlist.songs[i].songLink}'> ${playlist.songs[i].songName}</a></div>`;
      }

      string += "</div></div></div>";
    });
    mainPlaylistContainer.innerHTML = string;

    document.querySelectorAll(".deleteButton").forEach((button) => {
      button.addEventListener("click", (e) => {
        let songContainer = e.target.parentElement;
        let playlist = songContainer.parentElement;
        let playlistName = playlist.childNodes[1];
        let playlistObject = (currentAccountArrayOfPlaylistObjects =
          currentAccountArrayOfPlaylistObjects.filter(
            (playlist) => playlist.playlistName !== playlistName.textContent
          ));
        updateDashboardUI();
      });
    });
    document.querySelectorAll(".shareButton").forEach((button) => {
      button.addEventListener("click", async (e) => {
        let textToCopy = ``;
        let songContainer = e.target.parentElement;
        let allPlaylistsongContainer = songContainer.querySelectorAll(
          ".playlistsongContainer"
        );
        allPlaylistsongContainer.forEach((songContainer) => {
          textToCopy += songContainer.innerText;
          textToCopy += " - ";
          textToCopy += songContainer.lastChild.href;
        });
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            e.target.textContent = "Copied";
            setTimeout(() => {
              e.target.textContent = "  Copy";
            }, 2000);
          })
          .catch(() => {
            alert("something went wrong");
          });
      });
    });
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
    logInBar.style.display = "block";
    UserUiBar.style.display = "none";
    addSongPlaylistSelector.innerHTML = "<option>Playlist</option>";
  }
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
  logInButton.addEventListener("click", () => {
    loggingInUpdateCurrentAccount();
    updateDashboardUI();
  });
  logOutButton.addEventListener("click", () => {
    loggingOutUpdateCurrentAccount();
    updateDashboardUI();
  });
  imageInput.addEventListener("change", changeImageInputText);
}
init();
