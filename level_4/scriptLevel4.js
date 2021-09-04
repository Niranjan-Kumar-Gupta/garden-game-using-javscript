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
backgroundLayer0.src = 'img/level4back.jpg';
 
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/firemountain.png';
 
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/firemountain.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/scarryhome.png';


const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/tree3.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/platformRiver.png';


const backgroundLayer6 = new Image();
backgroundLayer6.src = 'img/fireground.png';


const layer0 = new Layer(backgroundLayer0,0,0,0,canvas.width,canvas.height);
const layer1 = new Layer(backgroundLayer1,0,canvas.height/4.5,1,canvas.width,canvas.height/2.5);
const layer2 = new Layer(backgroundLayer2,0,canvas.height/3,1.5,canvas.width,canvas.height/3.5);
const layer3 = new Layer(backgroundLayer3,0,canvas.height/3.1,2.5,canvas.width,canvas.height/3.5);

const layer4 = new Layer(backgroundLayer4,0,canvas.height/3.9,4.5,canvas.width,canvas.height/2.3);
const layer5 = new Layer(backgroundLayer5,0,canvas.height/2.52,5.5,canvas.width,canvas.height/2.0);
const layer6 = new Layer(backgroundLayer6,0,canvas.height*0.63,6.5,canvas.width,canvas.height/2.5);

let layer = [layer0,layer1,layer2,layer3,layer4,layer5,layer6];

function handleLayer(){
    layer.forEach((object,index)=>{
        object.draw();
        object.update();
    });
}

//=================================enviorment End=====================================
//====================================rain=================

const ParticleArray = [];

let hue = 0;


let move = {
    x:Math.random()*canvas.width/2 + canvas.width/1.5,
    y:0,
}

class Particle{
    constructor(){
        this.x = move.x;//Math.random()*canvas.width;//mouse.x;
        this.y = move.y;//Math.random()*canvas.height;//mouse.y;
        this.size = Math.random()*25 +5;
        this.speedX = Math.random()*2-1;
        this.speedY = Math.random()*2-1;
        this.color = 'hsl('+hue+this.size+',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 1) {
            this.size -= 1.5;
        }

    }
    draw(){   
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);  
        ctx.fill(); 
    }
}
  
function init() {
    
    if (move.x < 30) {
        move.x = Math.random()*canvas.width;
        move.y = 50;
         
    }else if(move.y > canvas.height/1.5){
        move.x = Math.random()*canvas.width/4 + canvas.width/2;
        move.y = 0;
    }
    move.x -= 5*girlSpeed*1.2;
    move.y += 5*girlSpeed;
    for (let i = 0; i < 10; i++) {
        ParticleArray.push(new Particle());
        
    }
}


let fireLife = 0;
function handleParticle() {
    init();     
    for (let i = 0; i < ParticleArray.length; i++) {
        ParticleArray[i].update();
        ParticleArray[i].draw();
        if (ParticleArray[i].size<=4) {
            ParticleArray.splice(i,1);
           
            i--;
        } 
        if (girl.length) {
            let dx = move.x - girl[0].x - girl[0].width/2;
            let dy = move.y - girl[0].y - girl[0].height/2;  
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 50) {
                fireLife++;
                girl[0].soundgirl.play();
                if (fireLife>3000) {
                    life.pop();
                    fireLife = 0;
                }
               
            }   
        }
        
    }
}


//=============rain end============================================

//=================fall===============================================
let fireImg = new Image();
fireImg.src = 'img/fireburn.png';

let fireImgFront = new Image();
fireImgFront.src = 'img/firegap.png';


let fireWidth = 305;
let fireHeight = 361;
let fireframex = 0;
let firegameframe = 0;

class Fire{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 210;
        this.height = 220;
        this.speed = 0
        this.speedModifier=5.5;
    }
    draw(){
        ctx.drawImage(fireImgFront,this.x,this.y,this.width,this.height);
       
        ctx.drawImage(fireImg,fireWidth*fireframex,0,fireWidth,fireHeight,this.x,this.y,this.width*0.5,this.height*0.5);
        ctx.drawImage(fireImg,fireWidth*fireframex,0,fireWidth,fireHeight,this.x+this.width*0.3,this.y,this.width*0.5,this.height*0.5);
        ctx.drawImage(fireImg,fireWidth*fireframex,0,fireWidth,fireHeight,this.x+this.width*0.6,this.y,this.width*0.5,this.height*0.5);
       
    }
    update(){
        this.speed =girlSpeed*this.speedModifier;
        this.x = Math.floor(this.x - this.speed); 
    }
}
let fire = [];
//fire.push(new Fire(100,480));
function addFire() {
   
    for (let i = 0; i < 2; i++) { 
      let xx = Math.random()*canvas.width + canvas.width;    
       fire.push(new Fire(xx,canvas.height/1.5));    
    }
    
}
addFire();
function handelfire() {
    if (fire.length == 0) {
        addFire();
    }
    fire.forEach((object,index) => {
        object.draw();
        object.update();
        if (object.x < -object.width) {
            fire.splice(index,1);
         
        }
    });
   
    if (firegameframe % 20 == 0) {
        if (fireframex < 6 && fireframex != 2) {
            fireframex++;
        }else{
            fireframex = 1;
        }
    }
    firegameframe++;
}


//=========================fall end=======================================================

//========================girl=========================================================

let player = {
    x:580,
    y:canvas.height/2.06,
    speed:5
}


let girlImg = new Image();
girlImg.src = 'img/girlWalking1.png';

let girlImgJumping = new Image();
girlImgJumping.src = 'img/girlJumping21.png';

let girlImgPunch = new Image();
girlImgPunch.src = 'img/girlPunch.png';


let girlWidth = 214;
let girlHeight = 350;
let girlframex = 0;
let girlgameframe = 0;
let girlrunSpeed = 7;

class Girl{
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.img = img;
        this.speedY = -8;
        this.girlFramex = 0;
        this.width = 130;
        this.height = 200;
        this.sound = new Audio();
        this.sound.src = 'img/edm1.mp3';
        this.soundgirl = new Audio();
        this.soundgirl.src = 'scream9.wav';
        this.soundgirl1 = new Audio();
        this.soundgirl1.src = 'girl.wav';
      
    }
    draw(){
      
        ctx.drawImage(this.img,girlWidth*girlframex,0,girlWidth,girlHeight,this.x,this.y,this.width,this.height);
    }
   
    movePlayer() {
        this.sound.play();
        if (this.y == player.y) {
            this.img = girlImg;
            this.width = 130;
            girlWidth = 214
        }
        if (keys[38] && this.y > -45){
            this.y += this.speedY;
            girlSpeed = 1.5;
            girlframex = 3;
            this.img = girlImgJumping;
            this.width = 100;
            girlWidth = 204
        } else if(girlgameframe % girlrunSpeed == 0) {
            if (girlframex < 4) {
                girlframex++;
            }else{
                girlframex = 0;
            }
        }
        if (keys[37] && this.x > 50){
            girlSpeed = 0.6;
            this.x -= player.speed*0.002;
        }
        if (keys[32] || keys[13]){
           girlSpeed = 0.5;
           this.img =  girlImgPunch;
           girlrunSpeed = 10;
        }
        if (keys[39] && this.y < canvas.width){
            girlSpeed = 2;
            girlrunSpeed = 3;
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
    girlrunSpeed = 7;
    delete keys[e.keyCode];
})
 
let fallDown = 0;
function handelgirl(){
    if (girl.length) {
        girl[0].draw();
        girl[0]. movePlayer();
        if (girlgameframe > 100) {
            girlgameframe = 0;  
        } 
    
       fire.forEach((object,index) => {

                if ((girl[0].img == girlImg) && girl[0].x  < object.x + object.width/2 &&
                girl[0].x+ girl[0].width - 50 > object.x &&
                girl[0].y < object.y + object.height &&
                girl[0].y + girl[0].height > object.height){
                    girl[0].y += 5;
                    girlSpeed = 1.5;
                    girlframex = 3;
                    if (girl[0].y > canvas.height/1.95+girl[0].width/2 +100) {
                        girl[0].soundgirl1.play();
                        girlSpeed = 0;
                        setTimeout(()=>{
                            document.getElementById('gameover').style.display = 'block';
                            girl = [];
                            life = [];
                            diamond = [];
                        },2000)
                    }
                    else if(girl[0].y > canvas.height/1.95+girl[0].width/2-20){
                            fallDown++;
                            if (fallDown > 3) {
                                girl[0].soundgirl1.play();
                                life.pop();
                                fallDown = 0;
                            }   
                            girlSpeed = 0.1;
                    }
                
                    
                }else if((girl[0].img != girlImg) && girl[0].x  < object.x + object.width/2 &&
                girl[0].x+ girl[0].width - 50 > object.x &&
                girl[0].y < object.y + object.height &&
                girl[0].y + girl[0].height > object.height){
                    hit++;
                }
                
            });
   
    }
    if (fallDown > 100) {
        fallDown = 0;
    }
   
}
//========================girl end==============================================================

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
    if (hit > 500) {
        life.pop();
        hit = 0;
    }
    if (life.length == 0) {
        document.getElementById('gameover').style.display = 'block';
        girl = [];
    }
}
//======================life end===================================================


//======================================coin=====================================================

let coinImg = new Image();
coinImg.src = 'img/coin.png';
let coinWidth = 84;
let coinHeight = 84;
let coinframex = 0;
let coingameframe = 0;


class Coin{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speedx = 5.5;
        this.width = 70;
        this.height = 70;
    }
    draw(){
        ctx.drawImage(coinImg,coinWidth*coinframex,0,coinWidth,coinHeight,this.x,this.y,this.width,this.height);
    }
    update(){
        this.x -= this.speedx*girlSpeed;
    }
}
let score = 0;
let coin = [];
function addCoin(){
    let posy = 560;
    for (let k = 0; k < 5; k++) {
        coin.push(new Coin(canvas.width*1.3+coinWidth*k,posy));
    }
}

function handleCoin(){
    if (girl.length) { 
        coin.forEach((object,index) => {
            object.update();
            object.draw();
            let dx  = (object.x) - (girl[0].x);
            let dy  = (object.y) - (girl[0].y);
            let distance = Math.sqrt(dx*dx + dy*dy);
          
            if (distance < 100) { 
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
}


//====================================big animal========================


let bigAnimalImg = new Image();
bigAnimalImg.src = 'img/bird2.png';
let bigAnimalWidth = 255;
let bigAnimalHeight = 280;
let framex = 0;
let gameframe = 0;
let animalSound = 0;


class BigAnimal{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sound = new Audio();
        this.sound.src = 'img/Eagle.mp3';
        this.width = 300;
        this.height = 250;
    }
    draw(){
        ctx.drawImage(bigAnimalImg,bigAnimalWidth*framex,0,bigAnimalWidth,bigAnimalHeight,this.x,this.y,this.width,this.height);
    }
    update(){
       
        this.x += 0.5; 
    }
}

let bigAnimal = [];
bigAnimal.push(new BigAnimal(-300,canvas.height/3.2));
function handelbigAnimal(){
    if (girl.length) {
        bigAnimal[0].draw();
        bigAnimal[0].update();
        if (gameframe % 10 == 0) {
            if (framex < 4) {
                framex++;
            }else{
                framex = 0;
            }
        }
        if(animalSound%515 === 0 && bigAnimal[0].x > -bigAnimal[0].width/2)
        {
            bigAnimal[0].sound.play();
        }
        gameframe++;
        animalSound++;
        if (animalSound > 2000) {
            animalSound = 0;
        }
        let dx  =  (girl[0].x - (bigAnimal[0].x+170)) ;
        if (dx<40) {
            document.getElementById('gameover').style.display = 'block';
            girl = [];
            life = [];
        }
    }
   
}
//====================================big animal end==========================


//=========================diamond===================================================================
let diamondImg = new Image();
diamondImg.src = 'img/diamond1.png';
let diamondWidth = 200;
let diamondHeight = 384;
let diamondframex = 0;
let diamondgameframe = 0;

class Diamond{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speedx = 8;
        this.width = 100;
        this.height = 150;
    }
    draw(){
        ctx.drawImage(diamondImg,diamondWidth*diamondframex,0,diamondWidth,diamondHeight,this.x,this.y,this.width,this.height);
    }
    update(){
        this.x -= this.speedx*girlSpeed;
    }
}
let diamond = [];

function adddiamond(){
    let posy = 300;
   
    diamond.push(new Diamond(canvas.width*4,posy));

}

function handlediamond(){
    if (girl.length) {
         diamond.forEach((object,index) => {
      
            object.update();
             object.draw();

            if ((girl[0].img == girlImgJumping) && girl[0].x  < object.x + object.width/2 &&
                girl[0].x + girl[0].width/2 > object.x &&
                girl[0].y < object.y + object.height/2 &&
                girl[0].y + girl[0].height/2 > object.height/2) { 
                diamond.splice(index,1);
                score += 10;
                document.getElementById('score1').innerHTML = `Score : `+ score;
            }
            if (object.x < -diamondWidth) {
                diamond.splice(index,1);
            }
    });
    if (diamond.length == 0){
        adddiamond();
    }
    if (diamondgameframe % 5 == 0) {
        if (diamondframex < 5) {
            diamondframex++;
        }else{
            diamondframex = 0;
        }
    }
    diamondgameframe++; 
        }
       
}
//====================================diamond end==================================================



const btn = document.getElementById('btn');

btn.addEventListener('click',()=>{ 
    start(); 
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('pannel').style.display = 'flex';
})

    // start(); 
    // document.getElementById('startGame').style.display = 'none';
    // document.getElementById('pannel').style.display = 'flex';
function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function start() {
    setInterval(()=>{
        clear();
        handleLayer();  
        handelfire();
        handlediamond();
        handelgirl();
        handellife();
        handelbigAnimal();
        handleParticle();
        handleCoin();   
    },1000/60)
}
 