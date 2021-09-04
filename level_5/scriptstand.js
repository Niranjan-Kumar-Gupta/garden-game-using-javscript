
let fanDown = [];

class FanDown{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "img/snowstand.png";
        this.width = canvas.width/7;
        this.img1 = new Image();
        this.img1.src = "img/circleKill.png";
        this.img1Size = 80;
        this.height = canvas.height/2.6;
        this.rad  =canvas.width/30;
      
        this.yy = this.y;
        this.lenx = this.width/3;
        this.leny = 50;
        this.th = 0;
        this.radfanDown = this.width/3.5;
        this.speed = 6.5;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.fillStyle = 'gold';
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 10;
        
        ctx.moveTo(this.x+this.width/2,this.yy+this.height/2.5);
        ctx.lineTo(this.x+this.width/2-this.lenx,this.yy+this.height/2.5+this.leny);
        ctx.closePath();
        ctx.lineTo(this.x+this.width/2+this.lenx,this.yy+this.height/2.5+this.leny*-1);
        ctx.stroke();
        ctx.closePath();
        ctx.drawImage(this.img1,this.x+this.width/2-this.lenx-this.img1Size/2,this.yy+this.height/2.5+this.leny-this.img1Size/2,this.img1Size,this.img1Size);
        ctx.drawImage(this.img1,this.x+this.width/2+this.lenx-this.img1Size/2,this.yy+this.height/2.5+this.leny*-1-this.img1Size/2,this.img1Size,this.img1Size);
        ctx.arc(this.x+this.width/2-2,this.yy+this.height/2.5,10,0,Math.PI*2); 
        ctx.fill()
    }
    update(){
        this.th += 0.25;
        this.lenx = -this.radfanDown*Math.sin(this.th);
        this.leny = this.radfanDown*Math.cos(this.th);
       
        this.x = Math.floor(this.x - this.speed*girlSpeed); 
    }
}


function addfanDown() {
  
    if (Math.random() > 0.5) {
        for (let i = 0; i < 2; i++) { 
            let xx =  canvas.width*1.5; 
           
             fanDown.push(new FanDown(xx+i*600,canvas.height/1.85)); 
          } 
    }else{
        
         fanDown.push(new FanDown(canvas.width*1.5,canvas.height/1.85)); 
         
    }
    
    
}
addfanDown();
function handelfanDown() {
    if (fanDown.length == 0) {
       
        addfanDown();
    }
    fanDown.forEach((object,index) => {
        object.draw();
        object.update();
        if (object.x < -object.width) {
            fanDown.splice(index,1);
         
        }
    });
}
