const platform1 = "img/platform.png";
const background = "img/background.png";
const hills = "img/hills.png";
const platform2 = "img/platformSmallTall.png";
const playerRunLeft = "img/spriteRunLeft.png";
const playerRunRight = "img/spriteRunRight.png";
const playerStandLeft = "img/spriteStandLeft.png";
const playerStandRight = "img/spriteStandRight.png";

let container = document.querySelector('.container');
let btn = document.querySelector('button');
let finalResult = document.querySelector('.result')

window.scrollTo(0, window.document.body.scrollHeight);

let canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight + 200;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight + 200;
});

let platformArray = [];
let leftPressed = false;
let rightPressed = false;
let scrollOffset = 0;

//player class declaration

class player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.gravity = 0.1;
    this.isOnPlatform = false;
    this.velocity = (canvas.height - this.height) / 2;
    this.playerImage = new Image();
    this.boxStand = 0;
    this.boxRun = 0;
  }
  drawRightStand() {
    this.playerImage.src = playerStandRight;
    c.drawImage(
      this.playerImage,
      177 * this.boxStand,
      0,
      177,
      400,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  drawLeftStand() {
    this.playerImage.src = playerStandLeft;
    c.drawImage(
      this.playerImage,
      177 * this.boxStand,
      0,
      177,
      400,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  drawRightRun() {
    this.playerImage.src = playerRunRight;
    c.drawImage(
      this.playerImage,
      341 * this.boxRun,
      0,
      341,
      400,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  drawLeftRun() {
    this.playerImage.src = playerRunLeft;
    c.drawImage(
      this.playerImage,
      341 * this.boxRun,
      0,
      341,
      400,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    if (leftPressed && !rightPressed) {
      this.drawLeftRun();
    } 
    else if (!leftPressed && rightPressed) {
      this.drawRightRun();

    } 
    else{
      this.drawRightStand();
    }

    if (!this.isOnPlatform && this.y + this.height <= canvas.height) {
      this.y += 7;
      //console.log(this.y + this.height,canvas.height);
    }
    if (this.boxStand <= 60) {
      this.boxStand += 1;
    } else {
      this.boxStand = 0;
    }
    if (this.boxRun<= 30) {
        this.boxRun+= 1;
      } else {
        this.boxRun = 0;
      }
  }

  
}

//platform class declaration

class platform {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.platformImage = new Image();
    this.platformImage.src = this.image;
    this.platformImage.onload = () => {
      this.width = this.platformImage.width;
      this.height = this.platformImage.height;
    };
  }
  draw() {
    c.drawImage(this.platformImage, this.x, this.y);
  }
  update() {
    this.draw();
  }
}

//background class set

class backgroundObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.backgroundImage = new Image();
    this.backgroundImage.src = background;
  }
  draw() {
    c.drawImage(this.backgroundImage, this.x, this.y, this.width, this.height);
  }
}

//bacground hill set

class hillObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.backgroundImage = new Image();
    this.backgroundImage.src = hills;
  }
  draw() {
    c.drawImage(this.backgroundImage, this.x, this.y);
  }
}

//background image set

let bgImage = new backgroundObject(0, 0);

//hills image set

let hillArray = [
  new hillObject(100, 300),
  new hillObject(1300, 550),
  new hillObject(2100, 200),
  new hillObject(2200, 330),
  new hillObject(3000, 400),
  new hillObject(3200, 550),
];

const player1 = new player(0, 100);

platformArray = [
  new platform(700, 300, platform2),
  new platform(1200, 500, platform2),
  new platform(1700, 200, platform2),
  new platform(1800, 600, platform2),
  new platform(1250, canvas.height - 170, platform1),
  new platform(3100, 445, platform2),
  new platform(2450, 100, platform2),
  new platform(0, canvas.height - 100, platform1),
  new platform(500, canvas.height - 100, platform1),
  new platform(1800, canvas.height - 50, platform1),
  new platform(2400, canvas.height - 200, platform1),
  new platform(3300, canvas.height - 100, platform1),
];



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height)
  bgImage.draw();

  hillArray.forEach((hill) => {
    hill.draw();
  });

  platformArray.forEach((element) => {
    element.update();
  });

  player1.update();

  // Check for collision between player and platforms

  let playerOnPlatform = false;
  platformArray.forEach((element) => {
    if (
      player1.y + player1.height >= element.y &&
      player1.y < element.y &&
      player1.x + player1.width >= element.x &&
      player1.x <= element.x + element.width
    ) {
      player1.y = element.y - player1.height;
      player1.isOnPlatform = true;
    }
  });
  player1.isOnPlatform = playerOnPlatform;

  // Perform additional actions
  if (player1.y <= 0) {
    player1.y += 0.1;
  }

  // Handle platform movement based on keyboard input
  platformArray.forEach((element) => {
    if (leftPressed && !rightPressed) {
      element.x += 10;
      
    } else if (!leftPressed && rightPressed) {
      element.x -= 10;
      
    }
  });

  //Handle hill movement

  hillArray.forEach((hill) => {
    if (leftPressed && !rightPressed) {
      hill.x += 10;
      scrollOffset -= 1;
    } else if (!leftPressed && rightPressed) {
      hill.x -= 10;
      scrollOffset += 1;
    }
  });


  //lose condition

  if (player1.y + player1.height >= canvas.height) {
    if (!gameOver) {
      gameOver = true;
      container.classList.add('common')
      btn.classList.add('btnCommon');
      btn.textContent = 'Play Again';
      finalResult.textContent = 'OOPs ! Try Again';

    }
  }
  
  //won condition

  if(scrollOffset > 2000){
    container.classList.add('common')
    btn.classList.add('btnCommon');
    btn.textContent = 'Play Again';
    finalResult.textContent = 'Congratulation ! You Won'
  }
  
}
let gameOver = false;

animate();

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    if (player1.y > 0 && player1.y <= canvas.height) {
      if (player1.x < canvas.width / 2) {
        player1.x += player1.width;
      }
      player1.y -= player1.velocity;
      console.log(player1.y);
    }
    leftPressed = false;
    rightPressed = false;
  } else if (event.key === "ArrowLeft") {
    if (player1.x > 200) {
      player1.x -= 10;
      leftPressed = true;
      rightPressed = false;
    }
  } else if (event.key === "ArrowRight") {
    if (player1.x < canvas.width / 2) {
      player1.x += 10;
    }
    leftPressed = false;
    rightPressed = true;
  }
});

addEventListener("keyup", (event) => {
   if (event.key === "ArrowLeft") {
    
      leftPressed = false;
    
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  }
});

addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY, canvas.height);
});


// final result 



btn.addEventListener("click",()=>{
  window.location.reload()
})


