const playerImg = "img/spaceship.png";

let canvas = document.querySelector("canvas");
let finalScore = document.querySelector('.score');
let container = document.querySelector('.container');
let result = document.querySelector('.result');
let btn = document.querySelector('button');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let c = canvas.getContext("2d");
let leftPress = false;
let rightPress = false;
let penetrate = false;
let audio = new Audio();
let score = 0;
let gameOver = false;


class player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 79;
    this.playerImage = new Image();
    this.playerImage.src = playerImg;
    this.width = 90;
    this.height = 60;
  }
  draw() {
    c.save();
    c.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (leftPress) {
      c.rotate((Math.PI / 180) * 330);
    } else if (rightPress) {
      c.rotate((Math.PI / 180) * 30);
    }
    c.drawImage(
      this.playerImage,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    c.restore();
  }
  update() {
    this.draw();
  }
}

class bullets {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "img/bullet.png";
    this.velocity = 5;
    this.height = 20;
    this.width = 12;
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.y -= this.velocity;
    /* if(leftPress){
      this.x += 12
    }
    else if(rightPress){
      this.x -= 12
    } */
  }
}

class target {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "img/invader.png";
    this.speed = 2; // Adjust speed as needed
    this.xDirection = Math.random() < 0.5 ? -1 : 1;
    this.width = 40;
    this.height = 40;
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.x <= 15 || this.x + 40 >= canvas.width-15) {
      this.xDirection *= -1;
    }

    this.x += this.xDirection * this.speed;
    this.draw();
  }
}

class enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "img/fire.png";
    this.width = 20;
    this.height = 30;
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += 3;
    this.draw();
  }
}

class background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "img/startScreenBackground.png";
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
  }
}

class stars{
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 4;
    this.alpha  = 0.6;
    this.color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},${this.alpha})`

  }
  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0 ,Math.PI * 2,false);
    c.fillStyle = this.color
    c.fill();
    c.closePath();
  }
  update(){
    this.y += 0.5;
    
    this.draw()
  }
}

let targetArray;
let bulletsArray = [];
let enemeyFireArray = [];
let starsArray = [];
const player1 = new player();
const bg = new background();

function enemeyFire(x) {
  y = Math.random() * (canvas.height / 2);
  enemeyFireArray.push(new enemy(x, y));
}

function bulletInit(x) {
  let a = Math.random() * 25;
  bulletsArray.push(new bullets(x + a, canvas.height - 50));
}

function targetInit() {
  targetArray = [];
  let count = Math.random() * 50 + 20;
  let startX = 50;
  let startY = 50;

  for (let i = 0; i < count; i++) {
    let targetX = startX + (i % 10) * 60;
    let targetY = startY + Math.floor(i / 10) * 40;

    targetArray.push(new target(targetX, targetY));
  }
}

/* function starsInit(){
  for (let i = 0; i < 300; i++) {
    starsArray.push(new stars());
    
  }
}
 */
function bulletTargetCollision() {
  for (let i = 0; i < bulletsArray.length; i++) {
    for (let j = 0; j < targetArray.length; j++) {
      // Calculate the positions of the objects and their boundaries
      let bulletTop = bulletsArray[i].y;
      let bulletBottom = bulletsArray[i].y + bulletsArray[i].height;
      let bulletRight = bulletsArray[i].x + bulletsArray[i].width;
      let bulletLeft = bulletsArray[i].x;

      let targetTop = targetArray[j].y;
      let targetBottom = targetArray[j].y + targetArray[j].height;
      let targetRight = targetArray[j].x + targetArray[j].width;
      let targetLeft = targetArray[j].x;

      // Check for collision
      if (
        bulletBottom >= targetTop &&
        bulletTop <= targetBottom &&
        bulletRight >= targetLeft &&
        bulletLeft <= targetRight
      ) {
        // Remove the collided target and bullet from their arrays
        audio.src = 'audio/bomb.mp3';
        audio.play()
        targetArray.splice(j, 1);
        bulletsArray.splice(i, 1);
        //console.log("test");
        score += 10
        // Decrement the loop counters to account for the removed elements
        j--;
        i--;
      }
    }
  }
}

function bombPlayerCollision() {
  for (let i = 0; i < enemeyFireArray.length; i++) {
    if (
      enemeyFireArray[i].y >= player1.y &&
      enemeyFireArray[i].x <= player1.x + player1.width - 25 &&
      enemeyFireArray[i].x >= player1.x &&
      enemeyFireArray[i].y <= player1.y + player1.height -25
    ) {
      audio.src = 'audio/gameOver.mp3'
      audio.play();
      enemeyFireArray.splice(i, 1);
      i--;
      gameOver = true;
    }
  }
}

function bulletFireCollision() {
  for (let i = 0; i < bulletsArray.length; i++) {
    for (let j = 0; j < enemeyFireArray.length; j++) {
      if (
        bulletsArray[i].y <= enemeyFireArray[j].y + enemeyFireArray[j].height &&
        bulletsArray[i].y + bulletsArray[i].height >=
          enemeyFireArray[j].height &&
        bulletsArray[i].x + bulletsArray[i].width >= enemeyFireArray[j].x &&
        bulletsArray[i].x <= enemeyFireArray[j].x + enemeyFireArray[j].width
      ) {

        audio.src = 'audio/shoot.wav';
        audio.play()
        bulletsArray.splice(i, 1);
        enemeyFireArray.splice(j, 1);
        i--;
        j--;
      }
    }
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.fillStyle =`black`
  c.fillRect(0, 0, canvas.width, canvas.height);

  //background create

  bg.draw()

  //stars create
/* 
  starsArray.forEach(star=>{
    star.update()

  }) */

  //player bullets create

  bulletsArray.forEach((bullet) => {
    bullet.update();
  });

  //player create
  player1.update();

  //target create

  targetArray.forEach((enemey) => {
    enemey.update();
  });

  //enemy fire call

  enemeyFireArray.forEach((fire) => {
    fire.update();
  });

  //console.log(enemeyFireArray);

  // left and right move of bullets

  /* if(leftPress){
    bulletsArray.forEach(bullet=>{
      bullet.x -= 10;
    })
  }
  else if(rightPress){
    bulletsArray.forEach(bullet=>{
      bullet.x += 10;
    })
  } */

  //reset array

  if (bulletsArray.length > 500) {
    bulletsArray = [];
    enemeyFireArray = [];
  }
  //collision function call

  bulletTargetCollision();
  bombPlayerCollision();
  bulletFireCollision();

  finalScore.textContent = `Score : ${score}`

  if(targetArray.length == 0 ){
    gameOver = true;
  }

  if(gameOver){
    container.style.zIndex = '1';
    btn.textContent = 'Play Again'
    result.textContent = `Your Score : ${score}`
    
    setTimeout(()=>{
      audio.pause()
    },1000)
  }

}

btn.addEventListener("click",()=>{
  window.location.reload();
})

setInterval(() => {
  enemeyFire(player1.x);
  audio.pause();
}, 1500);

bulletTargetCollision();
targetInit();
//starsInit();
animate();

let a = canvas.width / 2 + 35;

addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && player1.x > 0) {
    leftPress = true;
    player1.x -= 10;
    a -= 10;
  } else if (
    event.key === "ArrowRight" &&
    player1.x + player1.width < canvas.width
  ) {
    rightPress = true;
    player1.x += 10;
    a += 10;
  } else if (event.key === "ArrowUp") {
    bulletInit(a);
  }
});

addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    leftPress = false;
  } else if (event.key === "ArrowRight") {
    rightPress = false;
  }
});
