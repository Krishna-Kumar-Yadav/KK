const playButton = document.querySelector(".icon--play");
const musicCircle = document.querySelector(".musicContainerBox");

function stopButtonHandle(){
  playButton.textContent = "Stop_Circle";
  musicCircle.classList.add("rotate")
  
}
function playButtonHandle(){
  playButton.textContent = "Play_Circle";
  musicCircle.classList.remove("rotate")
}

playButton.addEventListener("click",function(){
  if(playButton.textContent === "Stop_Circle"){
    playButtonHandle();
  }
  else if(playButton.textContent === "Play_Circle"){
    stopButtonHandle();
  }
})

function music(){

  
}


