let canvas = document.querySelector('canvas')

import {collision} from './collision.js'


let c = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight

let collid = false
let leftPress = false;
let rightPress = false;


class background{
  constructor(){
    this.x = 0
    this.y = 0
    this.image = new Image()
    this.image.src = 'img/map.png'
    this.width = this.image.width
    this.height = this.image.height
  }
  draw(){
    c.drawImage(this.image,this.x,this.y,this.width,this.height)
    
  }
}

class player{
  constructor(x,y){
    this.x = x
    this.y = y
    this.width = 30
    this.height = 60
    this.gravity = 1
    this.velocity = 0
    this.image = new Image()
    this.i = 0
    this.j = 0
    this.width = 25
    this.height = 50

  }
  drawLeftStand(){
    this.image.src = 'img/spriteStandLeft.png'
    c.drawImage(this.image,this.j * 177,0,177,400,this.x,this.y,this.width,this.height)
  }
  drawRightStand(){
    this.image.src = 'img/spriteStandRight.png'
    c.drawImage(this.image,this.j * 177,0,177,400,this.x,this.y,this.width,this.height)
  }
  drawRightRun(){
    this.image.src = 'img/spriteRunRight.png'
    c.drawImage(this.image,this.i * 341,0,341,400,this.x,this.y,this.width,this.height)
  }
  drawLeftRun(){
    this.image.src = 'img/spriteRunLeft.png'
    c.drawImage(this.image,this.i * 341,0,341,400,this.x,this.y,this.width,this.height)
  }
  update(){
    this.y += this.gravity
    this.gravity += 0.1
    this.x += this.velocity
    
    if(leftPress && !rightPress){
      this.drawLeftRun()
    }
    else if(rightPress && !leftPress){
      this.drawRightRun()
    }
    else{
      this.drawRightStand()
    }

    if (this.j<= 60) {
      this.j += 1;
    } else {
      this.j = 0;
    }
    if (this.i<= 30) {
        this.i+= 1;
      } else {
        this.i = 0;
      }
  }
}

class Enemy{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.image = new Image()
    this.width = 220
    this.height = 300
    this.i = 0
    this.j = 0
    this.k = 0
    this.l = 0
    this.image.src = "img/enemy.png"
  }

  drawEnemyRun(){
    
    c.drawImage(this.image,160 *this.i,128,160,128,this.x,this.y,this.width,this.height)
  }
  drawEnemyAttack(){
    c.drawImage(this.image,160 *this.j,512,160,128,this.x,this.y,this.width,this.height)
  }
  drawEnemyHold(){
    c.drawImage(this.image,160 *this.k,256,160,128,this.x,this.y,this.width,this.height)
  }
  drawEnemyDestroy(){
    c.drawImage(this.image,160 *this.l,768,160,128,this.x,this.y,this.width,this.height)
  }
  
  update(){
    if(leftPress || rightPress){
      this.drawEnemyRun()
      setInterval(()=>{
        this.drawEnemyAttack()
      },3000)
    }
    else if(!leftPress && !rightPress){
      this.drawEnemyHold()
    }
    if(player1.x >= canvas.width-200){
      this.drawEnemyDestroy()
    }

    if(this.i < 8){
      this.i += 1
    }
    else{
      this.i = 0
    }
    if(this.j < 17){
      this.j += 1
    }
    else{
      this.j = 0
    }
    if(this.k < 13){
      this.k += 1
    }
    else{
      this.k = 0
    }
    if(this.l < 9){
      this.l += 1
    }
    else{
      this.l = 0
    }
  }
}

class FireAttack{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.image = new Image()
    
  }
  drawFire(){
    this.width = 20;
    this.height = 20;
    this.image.src = 'img/fire.png'
    c.drawImage(this.image,this.x,this.y,this.width,this.height)
  }

  drawExplode(){
    this.width = 60;
    this.height = 60;
    this.image.src = 'img/explode.png'
    c.drawImage(this.image,this.x,this.y,this.width,this.height)
  }

  update(){
    if(collid){
      this.drawExplode()
    }
    else{
      this.drawFire()
      this.x += Math.sin(7 ) * 3
      this.y += Math.sin(7 * Math.random()) * 3
    }
  }

}

class collisionBox{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = 12
    this.height = 12
  }
  draw(){
    c.beginPath();
    c.fillStyle = 'rgba(0, 0, 0, 1)'
    c.fillRect(this.x,this.y,this.width,this.height)
    c.fill()
    c.closePath()
  }
}

let bg = new background()
let player1 = new player(300,100)
let enemy = new Enemy(-50,-100)
let collisionArray = []
let fireArray = []

function fireInit(x,y){
  fireArray.push(new FireAttack(x,y))
}


function collisionInit(){
  let tileWidth = 12
  let tileHeight = 12
  let rows = -1
  let cols = 0
  for (let i = 0; i < collision.length; i++) {
    cols = i % 700
    if(i % 700 == 0){
      rows += 1
    }
    if(collision[i] !== 0){
      collisionArray.push(new collisionBox(tileWidth * cols,tileHeight * rows ))
    }
  }
}

function collisionDetection(){
  for (let i = 0; i < collisionArray.length; i++) {
    if(player1.x <= collisionArray[i].x + collisionArray[i].width &&
      player1.x + player1.width >= collisionArray[i].x &&
      player1.y <= collisionArray[i].y + collisionArray[i].height &&
      player1.y + player1.height >= collisionArray[i].y
    ){
      player1.gravity = 0     
    }    
  }
}




function animate(){
  requestAnimationFrame(animate);


  collisionDetection()
  bg.draw()
  collisionArray.forEach(box=>{
    box.draw()
  })
  player1.update()
  enemy.update()

  fireArray.forEach(fire=>{
    fire.update()
  })

  if(leftPress ){
    if(player1.x >= 200){
      player1.x -= 1
      enemy.x -= 1
    }
    
    player1.y -= 7
    if(bg.x <= -5){
      bg.x += 3
      collisionArray.forEach(box=>{
        box.x += 3
      })
    }
    
  }
  else if(rightPress){
    console.log(bg.x)
    if(bg.x < -7000){
      player1.x += 3
      enemy.x += 3
    }
    player1.y -= 3
    console.log(bg.x,canvas.width-bg.width);
    if(canvas.width-bg.width <= bg.x){
      bg.x -= 3
      collisionArray.forEach(box=>{
        box.x -= 3
      })
    }
    
    
  }

  if(fireArray.length > 100){
    fireArray = []
  }

}

collisionInit()
animate()


addEventListener("keydown",(event)=>{
  if(event.key === 'ArrowLeft' ){
    leftPress = true
    rightPress = false
    
  }
  else if(event.key === 'ArrowRight'){
    rightPress = true
    leftPress = false
    fireInit(40,90)
  }
  else if(event.key === "ArrowUp"){
    player1.y -= 33
  }
  if(bg.x === 7050){
    player1.x += 21
    player1.y -= 51 
  }
  
})

addEventListener("keyup",(event)=>{
  if(event.key === 'ArrowLeft' ){
    leftPress = false
    
  }
  else if(event.key === 'ArrowRight'){
    rightPress = false
    
  }

})

addEventListener("click",event=>{
  console.log(event.clientX,event.clientY);
})