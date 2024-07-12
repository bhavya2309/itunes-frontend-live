import { apiCall } from "./import-file.js";
const playlist = [];
function callLoadMusic() {
  var URL = "https://itunes.apple.com/search?term=rockstar&limit=5";
  loadMusic(URL);
}
function loadMusic(URL) {
  var promise = apiCall(URL);
  promise
    .then(function (checking) {
      var promise2 = checking.json();
      promise2
        .then(function (checkJSON) {
          console.log(checkJSON);
          setMusic(checkJSON.results);
          printMusic(checkJSON.results);
        })
        .catch(function (err) {
          console.log("json error");
        });
    })
    .catch(function (err) {
      console.log("failed");
    });
}
callLoadMusic();

function printMusic(arr) {
  for (let i = 0; i < arr.length; i++) {
    const cardDiv = document.createElement("div"); // <div></div>
    cardDiv.className = "card col-4";
    cardDiv.style.width = "15rem";
    const img = document.createElement("img"); // <img>
    img.src = arr[i].artworkUrl100;
    img.className = "card-img-top";
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    const h5 = document.createElement("h5"); // <h5>
    h5.className = "card-title";
    h5.innerText = arr[i].trackName;
    const pTag = document.createElement("p");
    pTag.className = "card-text";
    pTag.innerText = arr[i].artistName;
    const button = document.createElement("button");
    button.innerText = "Add to Playlist";
    button.setAttribute("song-id", i);
    // console.log(button.id);
    button.className = "btn btn-primary";
    button.addEventListener("click", () => {
      addToPlayList(arr[i]);
    });
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(pTag);
    cardBodyDiv.appendChild(button);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);

    const div = document.getElementById("search-results");
    div.appendChild(cardDiv);
  }
}
const addToPlayList = (track) => {
  console.log(track);
  playlist.push(track);
  printPlaylist();
};
function printPlaylist() {
  const divwq = document.getElementById("playlist");
  divwq.innerText = "";
  for (let i = 0; i < playlist.length; i++) {
    const card = document.createElement("div");
    card.className = "card";

    // Create the card header
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.textContent = playlist[i].trackName;

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the card title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = playlist[i].trackName;

    // Create the card text
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = playlist[i].artistName;

    // Create the button
    const button = document.createElement("a");
    button.className = "btn btn-primary";
    button.textContent = "Play";
    button.addEventListener("click", () => {
      playSong(playlist[i]);
    });

    // Append elements to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    // Append card header and body to main card div
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    // Append the card to the document body or any other container

    divwq.appendChild(card);
  }
}

function setMusic(checkJSON) {
  console.log(checkJSON[0]);
  var music = document.getElementById("music-player");
  music.src = checkJSON[0].previewUrl;
}

function setButtons() {
  var button = document.getElementById("search");
  button.addEventListener("click", showSearchResults);
}
setButtons();

function showSearchResults() {
  const div = document.getElementById("search-results");
  div.innerText = "";
  var searchterm = document.getElementById("myText").value;
  URL = `https://itunes.apple.com/search?term=${searchterm}&limit=5`;
  loadMusic(URL);
}

// function addToPlaylist() {
//   this.getAttribute("song-id");
// }
function playSong(playlist) {
  var music = document.getElementById("music-player");
  music.src = playlist.previewUrl;
  music.autoplay = true;
}
