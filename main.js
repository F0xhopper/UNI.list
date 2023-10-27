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
  Username: "Andrew99",
  Password: "8932",
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
      {
        songName: "Alex G - Trash",
        songLink:
          "https://www.youtube.com/watch?v=nOUkqkojb14&ab_channel=Honza%C5%A0t%C4%9Bp%C3%A1n",
      },
      {
        songName: "kilgore doubtfire - escape (slowed + reverb)",
        songLink:
          "https://www.youtube.com/watch?v=j7-jhWlOqqQ&ab_channel=skateboardk",
      },
      {
        songName: "Overfloater",
        songLink:
          "https://open.spotify.com/track/1U8v17QBWhtJqLmJxk4Sr6?si=b5d34f9ce6164339",
      },
      {
        songName: "Persuit Of Happiness(Nightmare)",
        songLink:
          "https://open.spotify.com/track/4kTLpAbhuEGHAAdDjOIWaa?si=4ba6398eeb4c4750",
      },
    ],
  },
  {
    playlistName: "Sorrowing",
    Image:
      "https://i.pinimg.com/564x/03/ca/81/03ca811e499b039bed816a179082b556.jpg",
    songs: [
      {
        songName: "LVL",
        songLink:
          "https://open.spotify.com/track/787rCZF9i4L1cXGMkdyIk4?si=6fb2460427234afa",
      },
      {
        songName: "Im God",
        songLink:
          "https://open.spotify.com/track/0FVuyC9RP5MACjp4lgU3qZ?si=8a07eee7271e467a",
      },
      {
        songName: "You Could Mean Everything To Me",
        songLink:
          "https://soundcloud.com/iphigen/you-could-mean-everything-to-me",
      },
      {
        songName: "I Know What It Feels Like (Headrush)",
        songLink:
          "https://soundcloud.com/agri222222222222/i-know-what-it-feels-like-headrush",
      },
      {
        songName: "Above The Gasoline, Below The Clouds",
        songLink:
          "https://soundcloud.com/monker178/above-the-gasoline-below-the-clouds",
      },
      {
        songName: "the lonely tree (slowed)",
        songLink:
          "https://www.youtube.com/watch?v=MxCrVTmGX1E&ab_channel=ciaffa-Topic",
      },
      {
        songName: "Two Ribbons - Thomas Thatcher, Organ Tapes, Tek Lintowe",
        songLink:
          "https://soundcloud.com/thomas55350/two-ribbons-ft-organ-tapes-tek-lintowe",
      },
      {
        songName: "User 2222 - Tending To The Earthworms In The Meadow",
        songLink:
          "https://soundcloud.com/curiosityshoppp/user-2222-tending-to-the-earthworms-in-the-meadow",
      },
      {
        songName:
          "PARAMORE X WALKING IN THE SNOW - bod [包家巷] (no longing home edit)",
        songLink:
          "https://soundcloud.com/baojiaxiang/paramore-x-walking-in-the-snow",
      },
    ],
  },
  {
    playlistName: "AboveRain Tracks",
    Image:
      "https://i.pinimg.com/564x/7a/70/35/7a70358787a4232419935a902eb4dda0.jpg",
    songs: [
      {
        songName: "p o i s o n t r e e🌿 [slowed + reverb]",
        songLink:
          "https://www.youtube.com/watch?v=_jHSy4fe75Q&ab_channel=blackk_pinkk",
      },
      {
        songName: "Forget Me Nots - Clud Mix",
        songLink:
          "https://open.spotify.com/track/4bXF0ErXw6pcgFJTkYLQuy?si=f345b36f6fb34cfd",
      },
      {
        songName: "slideshow audio pt.1",
        songLink:
          "https://www.youtube.com/watch?v=dmSW8vFh5aE&t=49s&ab_channel=Telnyashka",
      },
    ],
  },

  {
    playlistName: "GrapInward",
    Image:
      "https://i.pinimg.com/564x/65/2d/fc/652dfc2577c38cbc10a51e3fddc37b54.jpg",
    songs: [
      {
        songName: "QKThr",
        songLink:
          "https://www.youtube.com/watch?v=rp4vQjrBKBw&ab_channel=AphexTwin-Topic",
      },
      {
        songName: "GodSpeed",
        songLink:
          "https://open.spotify.com/track/1HvkLRkaMOroP945YFLpAw?si=934f8cb2c95145c3",
      },
      {
        songName: "Kids",
        songLink:
          "https://open.spotify.com/track/3pyyGVqWvRMq43qtJBzxe0?si=773fccf7f47a44f0",
      },
      {
        songName: "DEMO COPLAS CAYAMBEÑAS Y MAS - DJ MISTICO PRO 2019",
        songLink:
          "https://soundcloud.com/dj-mistico/demo-coplas-cayambenas-y-mas-dj-mistico-pro-2019",
      },
    ],
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
