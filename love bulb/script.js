let btnOn = document.querySelector(".btnOn");
let btnOff = document.querySelector(".btnOff");
let btnSlider = document.querySelector(".btnSlider");
let eyeBefore = document.querySelectorAll(".eye1");
let eyeAfter = document.querySelectorAll(".eye2");
let eye = document.querySelectorAll
(".eye");

btnOn.addEventListener("click", off);
btnOff.addEventListener("click",on);

document.addEventListener("keydown",function upKey(e){
  if(e.key === "ArrowUp"){
    on()
  }
})


function on() {
  btnOn.classList.add("btnOn");
  btnOff.classList.remove("btnOff");
  btnOn.innerText = "ON"

  eye.forEach(element => {
    element.classList.add("eyeAfter");
  });
  eyeBefore.forEach(element => {
    element.classList.add("eyeAfter");
  });
  eyeAfter.forEach(element => {
    element.classList.add("eyeAfter");
  });
}

document.addEventListener("keydown",function upKey(e){
  if(e.key === "ArrowDown"){
    off()
  }
})

function off() {
  btnOn.classList.remove("btnOn");
  btnOff.classList.add("btnOff");
  btnOn.innerText = ""

  eye.forEach(element => {
    element.classList.remove("eyeAfter");
  });
  eyeBefore.forEach(element => {
    element.classList.remove("eyeAfter");
  });
  eyeAfter.forEach(element => {
    element.classList.remove("eyeAfter");
  });
}

let myInput = document.querySelector(".myInput")

//key-down
myInput.addEventListener("keydown", function (eve) {
  console.log(eve);
});

//key-up
myInput.addEventListener("keyup", function (eve) {
  console.log(eve);
});

//key-press
myInput.addEventListener("keypress", function (eve) {
  console.log(eve);
});