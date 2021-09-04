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
let fanUp = [];


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
backgroundLayer0.src = 'img/wild.jpg';
 
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'img/iceMountain.png';
 
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'img/snowmoun.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = 'img/snowHome2.png';



const backgroundLayer4 = new Image();
backgroundLayer4.src = 'img/snowHome1.png';

const backgroundLayer4a = new Image();
backgroundLayer4a.src = 'img/snowTree.png';


const backgroundLayer5 = new Image();
backgroundLayer5.src = 'img/platfromsnow.png';


const backgroundLayer6 = new Image();
backgroundLayer6.src = 'img/icefront.png';


const layer0 = new Layer(backgroundLayer0,0,0,0,canvas.width,canvas.height);
const layer1 = new Layer(backgroundLayer1,0,canvas.height/4.5,1,canvas.width,canvas.height/3.5);
const layer2 = new Layer(backgroundLayer2,0,canvas.height/3.8,1.5,canvas.width,canvas.height/4.5);
const layer3 = new Layer(backgroundLayer3,0,canvas.height/3.1,2.5,canvas.width,canvas.height/5.4);
const layer4 = new Layer(backgroundLayer4,0,canvas.height/4,4.5,canvas.width,canvas.height/3.1);
const layer4a = new Layer(backgroundLayer4a,0,280,5.5,canvas.width,canvas.height*0.5);
const layer5 = new Layer(backgroundLayer5,0,canvas.height/2.82,6.5,canvas.width,canvas.height/1.80);
const layer6 = new Layer(backgroundLayer6,0,canvas.height*0.49,7.5,canvas.width,canvas.height/2);

let layer = [layer0,layer1,layer2,layer3,layer4,layer4a,layer5];

function handleLayer(){
    layer.forEach((object,index)=>{
        object.draw();
        object.update();
    });
}

function handelLayer6() {   
    layer6.draw();
    layer6.update();
}


let snowFall = [];

class SnowFall{
    constructor(){
        this.x  = Math.random()*(canvas.width+200)+50;
        this.y  = -Math.random()*100-20;
        this.size = Math.random()*5+1;
        this.speedY = Math.random()*4+2;
        this.speedX = 0.5;
        this.speedCantrol = 3;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white'
      
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fill();
        ctx.closePath();
    }
    update(){
        if (this.size > 4) {
            this.y += this.speedY*0.3*this.speedCantrol;
            this.x -= this.speedX*girlSpeed;
        }else if(this.size > 2){
            this.y += this.speedY*0.2*this.speedCantrol;
            this.x -= this.speedX*girlSpeed;
        }else if(this.size > 1.5){
            this.y += this.speedY*0.1*this.speedCantrol;
            this.x -= this.speedX*girlSpeed;
        }else if(this.size > 1){
            this.y += this.speedY*0.08*this.speedCantrol;
            this.x -= this.speedX*girlSpeed;
            if (this.y > canvas.height/2) {
                this.y = 0;
            }
        }
        else
        {
            this.y += this.speedY*0.07*this.speedCantrol;
            this.x -= this.speedX*girlSpeed;
        }
    }
}
function initsnowFall() {
    for (let i = 0; i < 400; i++) {
       snowFall.push(new SnowFall());
    }
}
initsnowFall();

function handelsnowFall() {
    snowFall.forEach((object,index)=>{
        object.draw();
        object.update();
        if(object.y > canvas.height + object.size || object.x < 0){
            snowFall.splice(index,1);
            snowFall.push(new SnowFall());
        }
    })
}


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
    if (girl.length) {
        girl[0].y = player.y;
        girlSpeed= 1;
        girlrunSpeed = 7;
    }
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
    
      fanDown.forEach((object,index) => {

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
                    else if(girl[0].y > canvas.height/1.95+girl[0].width/2-30){
                            fallDown++;
                            if (fallDown > 3) {
                                girl[0].soundgirl.play();
                                life.pop();
                                fallDown = 0;
                            }   
                            girlSpeed = 0.1;
                    }
                
                    
                }else if((girl[0].img != girlImg) && girl[0].x  < object.x + object.width/2 &&
                girl[0].x+ girl[0].width > object.x &&
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
        this.speedx = 6.5;
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
    let posy = 520;
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



function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

   start(); 
    document.getElementById('startGame').style.display = 'none';
    //document.getElementById('pannel').style.display = 'flex';

function start() {
    setInterval(()=>{
        clear();
        handleLayer();
        handelsnowFall();
        handelfanUp();
        handelfanDown();
        handelgirl();
        handleCoin();
        handlediamond();
        handelbigAnimal();
        handelLayer6();
        handellife();
    },1000/60)
}

