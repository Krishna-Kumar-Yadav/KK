                                          /* Needle Clock */

setInterval(neddleClock,1000)

function neddleClock() {
  let hourNeedle = document.querySelector(".clockHour");
  let minuteNeedle = document.querySelector(".clockMinute");
  let secondNeedle = document.querySelector(".clockSecond");

  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  const hoursRotate = (hours * 30) + (minutes * 0.5);
  const minutesRotate = minutes * 6;
  const secondsRotate = seconds * 6;

  hourNeedle.style.transform = `rotate(${hoursRotate}deg)`;
  minuteNeedle.style.transform = `rotate(${minutesRotate}deg)`;
  secondNeedle.style.transform = `rotate(${secondsRotate}deg)`;


}

                                       /* Analog Clock */

setInterval(analogClock,1000)                                 

function analogClock(){

const hoursBox = document.querySelector('.hourBox').innerText = new Date().getHours();
const minutesBox = document.querySelector('.minuteBox').innerText = new Date().getMinutes();
const secondsBox = document.querySelector('.secondBox').innerText = new Date().getSeconds();

}         




