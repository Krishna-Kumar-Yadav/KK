let canvas = document.querySelector("canvas");
let scoreBox = document.querySelector('.score');
let container = document.querySelector('.container');
let playBtn = document.querySelector('button');
let finalScore = document.querySelector('.finalScore');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.location.reload();
});

let c = canvas.getContext("2d");
let shootParticles = [];
let bubbles = [];
let gameStatus = false;
let score = 0;

let mouse = {
  x: undefined,
  y: undefined,
};

class particle {
  constructor(x, y, radius, color, angle, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  drawImage() {
    const image = new Image();
    image.src = 'Bird.png'; 

    image.onload = function() {
      c.drawImage(image, this.x ,this.y, 100,100);
    };
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    //console.log(this.x, this.y);
  }
  updateBubble(){

    this.drawImage();

    this.y += Math.random()
  }
}

function shooter() {
  c.beginPath();
  c.arc(canvas.width / 2, canvas.height - 55, 50, 0, Math.PI, false);
  c.fillStyle = "white";
  c.fill();
  c.closePath();

  c.beginPath();
  c.moveTo(canvas.width / 2, canvas.height - 120);
  c.lineTo(canvas.width / 2 + 50, canvas.height - 55);
  c.lineTo(canvas.width / 2 - 50, canvas.height - 55);
  c.lineTo(canvas.width / 2, canvas.height - 120);
  c.fillStyle = "blue";
  c.fill();
  c.closePath();
}

function getDistance(x1, x2, y1, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let result = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  return result;
}

function init() {
  for (let i = 0; i < 30; i++) {
    let x = Math.random() * canvas.width;
    let radius = Math.random() * 5 + 10;
    let y =  canvas.height -(canvas.height - radius);
    let color = `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.8)`;
    let angle = 0;
    let velocity = 0.5;

    if (i !== 0) {
      for (let j = 0; j < bubbles.length; j++) {
        if (getDistance(x, bubbles[j].x, y, bubbles[j].y) - (radius + bubbles[j].radius) < 0 ) {
          x = Math.random() * canvas.width;
          radius = Math.random() * 5 + 10;
          y =  canvas.height -(canvas.height - radius);

          j = -1;

          
        }
      }
    }
    bubbles.push(new particle(x, y, radius, color, angle, velocity));
  }
}

let yAxis;

function collisionDetection() {
  for (let i = 0; i < shootParticles.length; i++) {
    for (let j = 0; j < bubbles.length; j++) {
      let distance = getDistance(shootParticles[i].x, bubbles[j].x, shootParticles[i].y, bubbles[j].y);
      let minDistance = bubbles[j].radius + shootParticles[i].radius;
      yAxis =  canvas.height - bubbles[j].y ;

      if (distance - minDistance < 0 ) {
        if(bubbles[j].radius < 12){
          score += 1;
        }
        else if(bubbles[j].radius > 12 && bubbles[j].radius < 14){
          score += 3;
        }
        else{
          score += 5;
        }

        bubbles.splice(j,1);
        
        break; 
      }
    }  
    if(bubbles.length === 0){
      gameStatus = true;
      
      //console.log("won");
    }
  } 
//scoreBox.textContent = `Score : ${score}`;
}



addEventListener("click", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  const particleCount = 30;
  let x = event.clientX - canvas.width / 2;
  let y = event.clientY - (canvas.height - 120);
  let color = "white";
  let radius = 7;
  let angle = Math.atan2(y, x);
  let velocity = {
    x: Math.cos(angle) * 20,
    y: Math.sin(angle) * 20,
  };
  //console.log(angle * (180/Math.PI));

  shootParticles.push(
    new particle(
      canvas.width / 2,
      canvas.height - 120,
      radius,
      color,
      angle,
      velocity
    )
  );
});

function animate() {
  c.fillStyle = "rgba(0,0,0,0.3)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  shooter();

  requestAnimationFrame(animate);
  shootParticles.forEach((element) => {
    if (shootParticles.length > 10) {
      shootParticles.shift();
    } else {
      element.update();
    }
  });

  bubbles.forEach((bubble) => {
    bubble.updateBubble();
  });
  //console.log(bubbles);

  collisionDetection()

  if(bubbles.length === 0 || yAxis < 0){
    container.classList.add('containerResult');
    finalScore.textContent = `Your Score : ${score}`;
    bubbles = [];
    shootParticles = [];
  }
}

/* playBtn.addEventListener("click",()=>{
  window.location.reload()
}) */

init();
//animate();
