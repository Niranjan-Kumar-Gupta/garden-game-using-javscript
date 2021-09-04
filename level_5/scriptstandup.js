

class FanUp{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "img/pole.png";
        this.width = canvas.width/3;
        this.img1 = new Image();
        this.img1.src = "img/circleKill.png";
        this.img1Size = 100;
        this.height = canvas.height/2;
        this.rad  =canvas.width/30;  
        this.yy = this.y;
        this.lenx = this.width/3;
        this.leny = 50;
        this.th = 0;
        this.radfanUp = this.width/4.5;
        this.fanUpImgX = 0;
        this.fanUpImgY = 0;
        this.fanUpImgX1 = 0;
        this.fanUpImgY1 = 0;
        this.speed = 6.5;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.fillStyle = 'gold';
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 10;
        
        ctx.moveTo(this.x+this.width/2-canvas.width*0.01,this.yy+this.height/2.5);
        ctx.lineTo(this.x+this.width/2-canvas.width*0.01-this.lenx,this.yy+this.height/2.5+this.leny);
        ctx.closePath();
        ctx.lineTo(this.x+this.width/2-canvas.width*0.01+this.lenx,this.yy+this.height/2.5+this.leny*-1);
        ctx.stroke();
        ctx.closePath();
        this.fanUpImgX = this.x+this.width/2-canvas.width*0.01-this.lenx-this.img1Size/2;
        this.fanUpImgY = this.yy+this.height/2.5+this.leny-this.img1Size/2;
        this.fanUpImgX1 = this.x+this.width/2-canvas.width*0.01+this.lenx-this.img1Size/2;
        this.fanUpImgY1 = this.yy+this.height/2.5+this.leny*-1-this.img1Size/2
        ctx.drawImage(this.img1,this.fanUpImgX,this.fanUpImgY,this.img1Size,this.img1Size);
        ctx.drawImage(this.img1,this.fanUpImgX1,this.fanUpImgY1,this.img1Size,this.img1Size);
        ctx.arc(this.x+this.width/2-canvas.width*0.01,this.yy+this.height/2.5,10,0,Math.PI*2); 
        ctx.fill()
    }
    update(){
        this.th += 0.06;
        this.lenx = -this.radfanUp*Math.sin(this.th);
        this.leny = this.radfanUp*Math.cos(this.th);
        this.x = Math.floor(this.x - this.speed*girlSpeed); 
    }
}

fanUp.push(new FanUp(canvas.width,canvas.height/4.5));
let hitLife = 0;
function handelfanUp() {
    fanUp[0].draw();
    fanUp[0].update();
    if (fanUp[0].x < -fanUp[0].width) {
        fanUp[0].x = canvas.width;
    }
    if (girl.length) {
        let dx = fanUp[0].fanUpImgX - girl[0].x;
        let dy = fanUp[0].fanUpImgY - girl[0].y;  
        let dist = Math.sqrt(dx*dx + dy*dy);
        let dx1 = fanUp[0].fanUpImgX1 - girl[0].x;
        let dy1 = fanUp[0].fanUpImgY1 - girl[0].y;  
        let dist1 = Math.sqrt(dx1*dx1 + dy1*dy1);
        if (dist < 50 || dist1 < 50) {
            hitLife++;
            girl[0].soundgirl.play();
            if (hitLife > 30) {  
                hitLife = 0;
                life.pop();
            }
           
        }   
    }
}
