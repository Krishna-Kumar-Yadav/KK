let iconPlay = document.querySelector(".icon--play");
let songLine = document.querySelector(".songLine");
let referencevideo = document.querySelector(".referenceVideo");
let equaliser = document.querySelector(".equaliser");
let popularItem = document.querySelectorAll(".popular_item");

//songs
let asItwas = document.querySelector(".as-it-was");

let currenly = "stopped";
iconPlay.addEventListener("click", () => {
  if (currenly == "stopped") {
    asItwas.play();
    currenly = "playing";
    iconPlay.innerText = "pause_circle";
    referencevideo.play();
    equaliser.style.display = "inline";
  } else if (currenly == "playing") {
    asItwas.pause();
    referencevideo.pause();
    equaliser.style.display = "none";
    currenly = "stopped";
    iconPlay.innerText = "play_circle";
  }
});

//songline
let css_of_line = window.getComputedStyle(songLine, "::after");
songLine.style.setProperty("--lineWidth", "20px");
asItwas.addEventListener("timeupdate", () => {
  console.log(Math.floor(asItwas.currentTime));
});

