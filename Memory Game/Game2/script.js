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

let A = [];

function matchDiv(idd) {
  A.push(idd);
  
  if (idd < 8) {
    firstValue = idd;
    secondValue = idd + 7;
    thirdValue = idd + 14;
  } else if (idd > 7 && idd < 15) {
    firstValue = idd - 7;
    secondValue = idd;
    thirdValue = idd + 7;
  } else if (idd > 14 && idd < 22) {
    firstValue = idd - 14;
    secondValue = idd - 7;
    thirdValue = idd;
  }

  let first = A[0]
  let second = A[1]
  let third = A[2]
  
  if (A.length === 3) {
    
    if (
      A.includes(firstValue) &&
      A.includes(secondValue) &&
      A.includes(thirdValue)
    ) {
     
      setTimeout(function (){
      const elementOne = document.querySelector(`#id${A[0]}`);
      const elementTwo = document.querySelector(`#id${A[1]}`);
      const elementThree = document.querySelector(`#id${A[2]}`);
      elementOne.remove();
      elementTwo.remove();
      elementThree.remove();
      A = []
      },1000)
      
    }}
 if(A.length > 1 )  { 
  if (Math.abs(second-first)%7 !== 0) {
    statusDiv.textContent = "OOPs ! Need to improve";
    statusDiv.classList.add("status1");
   setTimeout(function (){
    window.location.reload()
     
   },2000)
   A = []
  }
}
if (A.length>2){
  if (Math.abs(third-second)%7 !== 0 ) {
    statusDiv.textContent = "OOPs ! Need to improve";
    statusDiv.classList.add("status1");
   setTimeout(function (){
    window.location.reload()
     
   },2000)
   A = []
  }
}
  if (container.textContent.trim() === "") {
    container.textContent = "You have Great IQ than Einstein";
    container.classList.add("status");
    setTimeout(function (){
      
      window.location.reload()
    },2000)
  }
}

//function Calling

showDiv();

//add event listener

replayBtn.addEventListener("click", function () {
  
  divShuffle();
  addImg();
  setTimeout(removeImg, 2000);
  statusDiv.textContent = ""
});
