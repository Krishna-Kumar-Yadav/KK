//intial declaration

const replayBtn = document.querySelector(".reset--btn");
const divBoxes = document.querySelectorAll(".box");
const container = document.querySelector(".container");
const statusDiv = document.querySelector(".status");

//shuffle the divs

function divShuffle() {
  const divs = Array.from(container.querySelectorAll(".box"));
  for (i = divs.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.insertBefore(divs[j], divs[i]);
  }
}

//add image on click

function addImg() {
  for (let i = 0; i < divBoxes.length; i++) {
    const box = divBoxes[i];
    box.textContent = "";
    if (i < 7) {
      box.classList.add("imgBox", `img${i + 1}`);
    } else if (i >= 7 && i < 14) {
      box.classList.add("imgBox", `img${i - 6}`);
    } else {
      box.classList.add("imgBox", `img${i - 13}`);
    }
  }
}

//remove Img

function removeImg() {
  for (let i = 0; i < divBoxes.length; i++) {
    const box = divBoxes[i];
    box.textContent = "🐇";
    if (i < 7) {
      box.classList.remove("imgBox", `img${i + 1}`);
    } else if (i >= 7 && i < 14) {
      box.classList.remove("imgBox", `img${i - 6}`);
    } else {
      box.classList.remove("imgBox", `img${i - 13}`);
    }
  }
}

//  show the Div

function showDiv() {
  for (let index = 0; index < divBoxes.length; index++) {
    divBoxes[index].addEventListener("click", show);
    function show() {
      const box = divBoxes[index];
      box.textContent = "";
      if (index < 7) {
        box.classList.add("imgBox", `img${index + 1}`);
      } else if (index >= 7 && index < 14) {
        box.classList.add("imgBox", `img${index - 6}`);
      } else {
        box.classList.add("imgBox", `img${index - 13}`);
      }
      matchDiv(index + 1);
    }
  }
}

//match the Div
let A = []
function matchDiv(id) {
  
  if (id < 8) {
    firstValue = id;
    secondValue = id + 7;
    thirdValue = id + 14;
  } else if (id > 7 && id < 15) {
    firstValue = id - 7;
    secondValue = id;
    thirdValue = id + 7;
  } else if (id >= 15 && id < 22) {
    firstValue = id - 14;
    secondValue = id - 7;
    thirdValue = id;
  }
  A.push(firstValue,secondValue,thirdValue)
  if(id == A[0] || id == A[1] || id == A[2]){
    console.log(A);
    statusDiv.textContent = "Ohh ! You Won ! Great IQ"
  }

  else{
    statusDiv.classList.add("status1");
    statusDiv.textContent = "Sorry ! Try next time ! Need to work"
    setTimeout(removeImg,3000)
    
  }
}

//function Calling

showDiv();

//add event listener

replayBtn.addEventListener("click", function () {
  divShuffle();
  addImg();
  setTimeout(removeImg, 1000);
});
