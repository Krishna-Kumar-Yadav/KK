let inputDisplay = document.querySelector(".input");

document.getElementById("0").addEventListener("click", display);
document.getElementById("1").addEventListener("click", display);
document.getElementById("2").addEventListener("click", display);
document.getElementById("3").addEventListener("click", display);
document.getElementById("4").addEventListener("click", display);
document.getElementById("5").addEventListener("click", display);
document.getElementById("6").addEventListener("click", display);
document.getElementById("7").addEventListener("click", display);
document.getElementById("8").addEventListener("click", display);
document.getElementById("9").addEventListener("click", display);
document.getElementById("+").addEventListener("click", display);
document.getElementById("-").addEventListener("click", display);
document.getElementById("/").addEventListener("click", display);
document.getElementById(".").addEventListener("click", display);
document.getElementById("*").addEventListener("click", display);
document.getElementById("Clear").addEventListener("click", clear);
document.getElementById("equal").addEventListener("click", equal);

function display() {
  inputDisplay.value += this.innerText;
}

function clear(){
  inputDisplay.value = '';
}

function equal(){
  inputDisplay.value = eval(inputDisplay.value)
}
