let canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let platformArray;

class player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.gravity = 0.1;
    this.isOnPlatform = false
  }
  draw() {
    c.beginPath();
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    //console.log(this.y, canvas.height);
    if (!this.isOnPlatform && (this.y + this.height) <= canvas.height) {
      this.y += this.gravity;
      this.gravity += 0.08;
    } 
    //console.log(this.y + this.height,canvas.height);
  }
}

class platform{
  constructor(x,y,width){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 30;
  }
  draw(){
    c.beginPath();
    c.fillStyle = "blue";
    c.fillRect(this.x,this.y,this.width,this.height);
    c.fill();
    c.closePath();
  }
  update(){
    this.draw()
  }
}


function platformsGeneration(){
  platformArray = [];
  for (let i = 0; i < 30; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let width = Math.random() * 100 + 50;

    if(i !== 0){
      for (let i = 0; i < platformArray.length; i++) {
        if(x < platformArray[i].x + platformArray[i].width){
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;

        }     
      }
    }

    platformArray.push(new platform(x,y,width));
    
  }
}

const player1 = new player(200, 100);
const platform1 = new platform(400,100,200)

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  player1.update();
  platform1.update();

 /*  platformArray.forEach(element=>{
    element.update();
  }) */

  if (
    player1.y + player1.height >= platform1.y &&
    player1.x + player1.width >= platform1.x &&
    player1.x <= platform1.x + platform1.width
  ) {
    player1.isOnPlatform = true;
  }
  else{
    player1.isOnPlatform = false
  }
  /* if(platform1.y + platform1.height >= player1.y &&
    player1.x>= platform1.x &&
    player1.x <= platform1.x + platform1.width){
    player1.y += player1.gravity;
  } */

  if(player1.y <= 0){
    player1.y += 0.1;
  }
  
}

//platformsGeneration();
animate();

addEventListener("keydown", (event) => {
  //console.log(event.key);
  switch (event.key) {
    case "ArrowUp":
      player1.y = canvas.height - player1.y;
      player1.x += player1.width; 
      break;
    case "ArrowDown":
      break;
    case "ArrowLeft":
      player1.x -= 10;
      break;
    case "ArrowRight":
      player1.x += 10;
      break;
  }
});

/* addEventListener("mousemove",()=>{
  //console.log(event.clientX,event.clientY);
  
}) */