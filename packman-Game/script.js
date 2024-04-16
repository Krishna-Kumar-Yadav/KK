let canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  //window.location.reload()
});

let c = canvas.getContext("2d");
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let collision = false;

class Boundary {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.velocity = 5;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "green";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    if (leftPressed) {
      this.x -= this.velocity;
    }
    if (rightPressed) {
      this.x += this.velocity;
    }
    if (upPressed) {
      this.y -= this.velocity;
    }
    if(downPressed) {
      this.y += this.velocity;
    }
  }
}

let boundaryArray = [];
const player1 = new Player(canvas.width / 2 -80, 110);

function boundaryInit() {
  let w = 10;
  let gap = w + 30;
  boundaryArray = [
    new Boundary(0, 30, w, canvas.height, "blue"),
    new Boundary(canvas.width - 10, 30, w, canvas.height, "blue"),
    new Boundary(0, 30, canvas.width, w, "blue"),
    new Boundary(0, canvas.height - w, canvas.width, w, "blue"),
    new Boundary(gap, gap + 30, w, canvas.height - 110, "blue"),
    new Boundary(
      canvas.width - 10 - gap,
      gap + 30, w, canvas.height - 110, "blue"
    ),
    new Boundary(gap, gap + 30, canvas.width - 90, w, "blue"),
    new Boundary(gap, canvas.height - w - gap, canvas.width - 90, w, "blue"),
    new Boundary(125, 130, 50, 50),
    new Boundary(canvas.width - 175, 130, 50, 50),
    new Boundary(260, 130, 50, 100),
    new Boundary(canvas.width - 310, 130, 50, 100),
    new Boundary(125, 415, 50, 50),
    new Boundary(canvas.width - 175, 415, 50, 50),
    new Boundary(260, 365, 50, 100),
    new Boundary(canvas.width - 310, 365, 50, 100),
    new Boundary(canvas.width / 2 - 25, canvas.height / 2 - 65, 50, 150),
    new Boundary(canvas.width / 2 - 75, canvas.height / 2 - 15, 150, 50),
    new Boundary(canvas.width / 2 - 25, 120, 50, 50),
    new Boundary(canvas.width / 2 - 25, 425, 50, 50),
    new Boundary(125, 230, 50, 140),
    new Boundary(canvas.width - 175, 230, 50, 140),
    new Boundary(170, canvas.height / 2 - 10, 150, 35),
    new Boundary(canvas.width - 320, canvas.height / 2 - 10, 150, 35),
    new Boundary(375, 140, 30, 310),
    new Boundary(950, 140, 30, 310),
    new Boundary(450, 140, 30, 130),
new Boundary(450, 320, 30, 130),
    new Boundary(480, 240, 80, 30),
    new Boundary(480, 320, 80, 30),
    new Boundary(800, 240, 80, 30),
    new Boundary(800, 320, 70, 30),
    new Boundary(480, 240, 70, 30),
    new Boundary(860, 140, 30, 130),
    new Boundary(860, 320, 30, 130),
  ];
}

function boundaryPlayerCollision() {
  for (let i = 0; i < boundaryArray.length; i++) {
    if (
      player1.y - player1.radius - player1.velocity <= boundaryArray[i].y + boundaryArray[i].height &&
      player1.y + player1.radius + player1.velocity >= boundaryArray[i].y &&
      player1.x - player1.radius - player1.velocity <= boundaryArray[i].x + boundaryArray[i].width &&
      player1.x + player1.radius + player1.velocity >= boundaryArray[i].x
    ) {
  collision = true;
  player1.velocity = 0;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  boundaryArray.forEach((side) => {
    side.update();
  });

  player1.update();

  boundaryPlayerCollision();

}

boundaryInit();
animate();

setInterval(()=>{
  collision = false
},2000)

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  } else if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  }
});

addEventListener("keyup", (event) => {
  
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  } else if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
});

addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY,canvas.width/2);
});