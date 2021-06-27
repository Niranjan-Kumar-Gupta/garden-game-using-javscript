const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let girlSpeed = 1;
let life = [];
let hit = 0;

//=================================Make enviorment=====================================

class Layer{
    constructor(image,x,y,speedModifier,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed =girlSpeed*this.speedModifier;
    }
    update(){
        this.speed =girlSpeed*this.speedModifier;
        if (this.x <= -this.width) {
           this.x = this.width + this.x2 - this.speed; 
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed; 
         }
         this.x = Math.floor(this.x - this.speed); 
         this.x2 = Math.floor(this.x2 - this.speed); 
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
    }
}

const backgroundLayer0 = new Image();
backgroundLayer0.src = 'img/back3.png';
 
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/mouantain2.png';
 
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/mouantain.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/middle2.png';

const backgroundLayer31 = new Image();
backgroundLayer31.src = 'img/river.png';


const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/tree2.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/tree1.png';

const backgroundLayer6 = new Image();
backgroundLayer6.src = 'img/platform1.png';

const backgroundLayer7 = new Image();
backgroundLayer7.src = 'img/frontflower1.png';

const layer0 = new Layer(backgroundLayer0,0,0,0,canvas.width/1.5,canvas.height/1.5);
const layer1 = new Layer(backgroundLayer1,0,canvas.height/5,1,canvas.width,canvas.height/2);
const layer2 = new Layer(backgroundLayer2,0,canvas.height/5,1.5,canvas.width,canvas.height/3.5);
const layer3 = new Layer(backgroundLayer3,0,canvas.height/4.2,2.5,canvas.width,canvas.height/3.2);
const layer31 = new Layer(backgroundLayer31,0,canvas.height/2.52,3.5,canvas.width,canvas.height/3.2);
const layer4 = new Layer(backgroundLayer4,0,canvas.height/6,4.5,canvas.width,canvas.height/1.3);
const layer5 = new Layer(backgroundLayer5,0,20,5.5,canvas.width,canvas.height);
const layer6 = new Layer(backgroundLayer6,0,30,6.5,canvas.width,canvas.height);
const layer7 = new Layer(backgroundLayer7,0,120,8.5,canvas.width,canvas.height/1.2);

let layer = [layer0,layer1,layer2,layer3,layer31,layer4,layer5,layer6,layer7];

function handleLayer(){
    layer.forEach((object,index)=>{
        object.draw();
        object.update();
    });
}

//=================================enviorment End=====================================

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}



//===============================Big Animal===================================================


let bigAnimalImg = new Image();
bigAnimalImg.src = 'img/animal.png';
let bigAnimalWidth = 2395;
let bigAnimalHeight = 1750;
let framex = 0;
let gameframe = 0;
let animalSound = 0;


class BigAnimal{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sound = new Audio();
        this.sound.src = 'img/bear.mp3';
    }
    draw(){
        ctx.drawImage(bigAnimalImg,bigAnimalWidth*framex,0,bigAnimalWidth,bigAnimalHeight,this.x,this.y,300,250);
    }
    update(){
       
        this.x += 0.5;
        
    }
   
}
let bigAnimal = [];
bigAnimal.push(new BigAnimal(-300,canvas.height/2.7));
function handelbigAnimal(){
    bigAnimal[0].draw();
    bigAnimal[0].update();
    if (gameframe % 10 == 0) {
        if (framex < 2) {
            framex++;
        }else{
            framex = 0;
        }
    }
    if(animalSound%515 === 0)
    {
        bigAnimal[0].sound.play();
    }
    gameframe++;
    animalSound++;
    if (animalSound > 2000) {
        animalSound = 0;
    }
}

//===============================Big Animal End===================================================

//===============================Big Animal===================================================

let player = {
    x:580,
    y:140,
    speed:5
}


let girlImg = new Image();
girlImg.src = 'img/girlWalking1.png';

let girlImgJumping = new Image();
girlImgJumping.src = 'img/girlJumping2.png';

let girlWidth = 425;
let girlHeight = 1550;
let girlframex = 0;
let girlgameframe = 0;

class Girl{
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.img = img;
        this.speedY = -8;
        this.girlFramex = 0;
        this.width = 150;
        this.height = 440;
        this.sound = new Audio();
        this.sound.src = 'img/edm1.mp3';
    }
    draw(){
        ctx.drawImage(this.img,girlWidth*girlframex,0,girlWidth,girlHeight,this.x,this.y,this.width,this.height);
    }
   
    movePlayer() {
        this.sound.play();
        if (this.y == player.y) {
            this.img = girlImg;
        }
        if (keys[38] && this.y > -45){
            this.y += this.speedY;
            girlSpeed= 1.5;
            girlframex = 3;
            this.img = girlImgJumping;
        } else if(girlgameframe % 7 == 0) {
            if (girlframex < 5) {
                girlframex++;
            }else{
                girlframex = 0;
            }
        }
        if (keys[37] && this.x > 50){
            girlSpeed = 0.6;
            this.x -= player.speed*0.002;
        }
        if (keys[40] && this.y < canvas.height-200){
            //this.y += player.speed;   
        }
        if (keys[39] && this.y < canvas.width){
            girlSpeed= 2;
            this.x += player.speed*0.002; 
            bigAnimal[0].x -= 1.0;  
        }
       
        girlgameframe++;
    }  
}

let girl = [];
girl.push(new Girl(player.x,player.y,girlImg));

let keys = [];
window.addEventListener("keydown",function (e) {

    keys[e.keyCode] = true;
  })
window.addEventListener("keyup",function (e) {
    girl[0].y = player.y;
    girlSpeed= 1;
    delete keys[e.keyCode];
})

function handelgirl(){
    girl[0].draw();
    girl[0]. movePlayer();
    if (girlgameframe > 100) {
        girlgameframe = 0;  
    }
    let dx  =  (girl[0].x - (bigAnimal[0].x+170)) ;
    if (dx<40) {
        document.getElementById('gameover').style.display = 'block';
        girl = [];
        life = [];
    }
}

//===============================Big Animal End===================================================

//=================================coin==============================================================
let coinImg = new Image();
coinImg.src = 'img/coin.png';
let coinWidth = 84;
let coinHeight = 84;
let coinframex = 0;
let coingameframe = 0;

let score = 0;
class Coin{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speedx = 5;
    }
    draw(){
        ctx.drawImage(coinImg,coinWidth*coinframex,0,coinWidth,coinHeight,this.x,this.y,70,70);
    }
    update(){
        this.x -= this.speedx*girlSpeed;
    }
}
let coin = [];
function addCoin(){
    let posy = 360;
    for (let k = 0; k < 5; k++) {
        coin.push(new Coin(canvas.width*1.3+coinWidth*k,posy));
    }
}

function handleCoin(){
   
    coin.forEach((object,index) => {
        object.update();
        object.draw();
        let dx  = (object.x) - (girl[0].x+75);
        let dy  = (object.y) - (girl[0].y+220);
        let distance = Math.sqrt(dx*dx + dy*dy);
      
        if (distance < 25) { 
            coin.splice(index,1);
            score++;
            document.getElementById('score1').innerHTML = `Score : `+ score;
        }
        if (object.x < -coinWidth) {
            coin.splice(index,1);
        }
    });
    if (coin.length == 0) {
        addCoin();
    }
    if (coingameframe % 5 == 0) {
        if (coinframex < 5) {
            coinframex++;
        }else{
            coinframex = 0;
        }
    }
    coingameframe++;
}

//===================================coin end=======================================================

//====================================life===========================================================
class Life{
    constructor(x,y,col){
        this.x = x;
        this.y = y;
        this.r = 25;
        this.col = col;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.r,this.r);
        ctx.lineWidth = 1;
        ctx.fillStyle = this.col;
        ctx.strokeStyle = 'white'
        ctx.fill(); 
        ctx.stroke();
        ctx.closePath();
    }
}

function initlife() {
    for (let m = 0; m < 3; m++) {
        life.push(new Life(canvas.width-150 + m*33,28,'rgb(6, 255, 27)'));
    }
    
}

initlife();

function handellife(){ 
    for (let m = 0; m < life.length; m++) {
        life[m].draw();
    }
    if (hit > 30) {
        life.pop();
        hit = 0;
    }
    if (life.length == 0) {
        document.getElementById('gameover').style.display = 'block';
        girl = [];
    }
}

//=================================life end==============================================================

//=================================rock==================================================================

let rockImg = new Image();
rockImg.src = 'img/rock.png';
let rock = [];

class Rock{
    constructor(){
    this.x = canvas.width+Math.random()*500;
    this.y = canvas.height/1.9;
    this.size = 75;
    this.speedModifier = 6.5;
    this.speed =girlSpeed*this.speedModifier;    
    }
    draw(){
        ctx.drawImage(rockImg,this.x,this.y,this.size,this.size);
    }
    update(){
        this.speed =girlSpeed*this.speedModifier;
        this.x = Math.floor(this.x - this.speed); 
        if (this.x < -this.size) {
           this.x = canvas.width;  
        }
    }
}
function addRock() {
    
    rock.push(new Rock());
}
function handleRock() {
    if (rock.length == 0) {
        addRock();
    }
    rock[0].draw();
    rock[0].update();

    if (girl[0].x +200< rock[0].x + rock[0].size &&
        girl[0].x+ girl[0].width > rock[0].x &&
        girl[0].y-500 < rock[0].y + rock[0].size &&
        girl[0].y-500 + girl[0].height > rock[0].size){
        girlSpeed = 0.01;
        hit++;
    }
}

const btn = document.getElementById('btn');

btn.addEventListener('click',()=>{
    start();
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('pannel').style.display = 'flex';
})
function start() {
    setInterval(()=>{
        clear();
        handleLayer();
        handelgirl();
        handleCoin();
        handellife();
        handleRock();
        handelbigAnimal();
       
    },1000/60)
}
