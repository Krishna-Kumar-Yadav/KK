document.querySelector(".reset--btn").addEventListener("click", shuffle);

//Function to shuffle the div inside the div having class .container.

function shuffle() {
  const container = document.querySelector(".container");
  const divs = Array.from(container.querySelectorAll(".box"));

  //element will shuffle the div randomly
  for (let i = divs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.insertBefore(divs[j], divs[i]);
  }
  rotateBoxes();
}

//Function to rotate the all .box-Back class span to front and hold for few seconds.

function rotateBoxes() {
  //element will rotate .box-Back class span for 10sec(5sec->show + 5sec->revert)

  const boxes = document.querySelectorAll(".box-Back");
  boxes.forEach((box) => {
    box.classList.add("rotate"); // Apply the rotate class to each box
    setTimeout(() => {
      box.classList.remove("rotate"); // Remove the rotate class after 10 seconds
    }, 10000);
  });

  //element will remove the visibility of .box-Front span for 6sec(3sec->show + 3sec->revert)

  const visibility = document.querySelectorAll(".box-Front");
  visibility.forEach((visible) => {
    visible.classList.add("visibility");
    setTimeout(() => {
      visible.classList.remove("visibility"); // Apply the visibility for 10 sec
    }, 10000);
  });
}

//Function to rotate single span after click on span

/* document.getElementById('1').addEventListener("click",turn);
document.getElementById('2').addEventListener("click",turn);
document.getElementById('3').addEventListener("click",turn);
document.getElementById('4').addEventListener("click",turn);
document.getElementById('5').addEventListener("click",turn);
document.getElementById('6').addEventListener("click",turn);
document.getElementById('7').addEventListener("click",turn);
document.getElementById('8').addEventListener("click",turn);
document.getElementById('9').addEventListener("click",turn);
document.getElementById('10').addEventListener("click",turn);
document.getElementById('11').addEventListener("click",turn);
document.getElementById('12').addEventListener("click",turn);
document.getElementById('13').addEventListener("click",turn);
document.getElementById('14').addEventListener("click",turn);
document.getElementById('15').addEventListener("click",turn); */

/* let boxBack = document.querySelectorAll(".box-Back");


function turnAndHold(element) {
  element.classList.add("turn");
  setTimeout(() => {
    element.classList.remove("turn");
  }, 10000);
}
  boxBack.forEach(box => {
    boxBack.addEventListener("click",turnAndHold);
  });
 */

  const boxBacks = document.querySelectorAll('.box-Back');

  let rotateTimeout;
  
  boxBacks.forEach(boxBack => {
    boxBack.addEventListener('click', () => {
      clearTimeout(rotateTimeout);
      rotateBoxBacks();
    });
  });
  
  function rotateBoxBacks() {
    boxBacks.forEach(boxBack => {
      boxBack.classList.add('turn');
    });
  
    rotateTimeout = setTimeout(() => {
      boxBacks.forEach(boxBack => {
        boxBack.classList.remove('turn');
      });
    }, 3000); // Change the time here to adjust the hold duration (in milliseconds)
  }
  