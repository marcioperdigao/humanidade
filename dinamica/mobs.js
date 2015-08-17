
var aiMobs=function(config) {
    this.configMob={};
    this.pos=config.pos; //POSITION OF THE VIEW GAME, USED TO KNOW WHERE PRINT, WHERE THE CAMERA USER IS
    this.mobPosition={};
    this.mobPosition.x=600;
    this.mobPosition.y=100;

    var _this=this;
    var xmlhttp = new XMLHttpRequest();
    var url = "img/mobs/goblin/goblin.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            _this.myFunction(xmlhttp.responseText);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    this.myFunction=function(response) {

        this.configMob = JSON.parse(response);
        console.log(this.configMob);
        console.log(this.configMob.animations.atk_right.row);
    };


    this.units={
        x:0,
        y:0,
        moves:0,
        frameY:0,
        placeFree:true
    };
    this.moves=0;

    this.canvas=document.getElementById("game");
    this.context=this.canvas.getContext("2d");
    this.timePerFrame=0;
    this.frameIndex=0;
    this.mobImg=new Image();
    this.mobImg.src="img/mobs/goblin/goblin.png";
    this.mobImg.addEventListener('load',function(){
        imagemCarregada=true;
    },false);

    this.matrix=[{},{},{},{}];
    this.matrix[0].layer=[];
    this.matrix[1].layer=[];
    this.matrix[2].layer=[];
    this.matrix[3].layer=[];

    //first layer
    for (var i = 0,k=-1; i < TileMaps["modelo1"].layers[0].data.length; i++) {
        if (i % 150 === 0) {
            k++;
            this.matrix[0].layer[k] = [];
        }
        this.matrix[0].layer[k].push(TileMaps["modelo1"].layers[0].data[i]);

    }
    //4 layer
    for (i = 0,k=-1; i < TileMaps["modelo1"].layers[3].data.length; i++) {
        if (i % 150 === 0) {
            k++;
            this.matrix[3].layer[k] = [];
        }
        this.matrix[3].layer[k].push(TileMaps["modelo1"].layers[3].data[i]);

    }
};

aiMobs.prototype.moving=function(){
    if(this.mobPosition.y<420){//first check point
        this.mobPosition.y+=this.configMob.moveSpeed;
    }
    else if(this.mobPosition.y>=420 && this.mobPosition.x<=2500){//second check point
        this.mobPosition.x+=this.configMob.moveSpeed;
    }
    else if(this.mobPosition.y<=1300 && this.mobPosition.x<=3520){//third check point... know he will walk in diagonal
        this.mobPosition.x+=this.configMob.moveSpeed*(54/100);
        this.mobPosition.y+=this.configMob.moveSpeed*(46/100);
    }
    else if(this.mobPosition.y<=2048 && this.mobPosition.x<=4094){//fourth check point... know he will walk in diagonal
        this.mobPosition.x+=this.configMob.moveSpeed*(35/100);
        this.mobPosition.y+=this.configMob.moveSpeed*(65/100);
    }
    else if(this.mobPosition.y<=4260 && this.mobPosition.x<=4064){//fifth check point... know he will walk in diagonal
        this.mobPosition.x+=this.configMob.moveSpeed*(4/100);
        this.mobPosition.y+=this.configMob.moveSpeed*(96/100);
    }


};


aiMobs.prototype.drawMob=function(){

    /*if(this.units.moves>0){ //USED TO CALCULATION how much more movies need to the character arrive, if its not there yet the go more one step
        this.infoChar.x+=this.units.x;
        this.infoChar.y+=this.units.y;
        this.units.moves--;
    }
    //Now i'm calculation the real position of the char and using this to get the tiled Id
    var tileX=(Math.floor((this.infoChar.x+20)/32));
    var tileY=(Math.floor((this.infoChar.y+50)/32));

    if(!this.matrix[3].layer[tileY][tileX]==false){
        this.infoChar.x-=this.units.x;
        this.infoChar.y-=this.units.y;
        this.units.moves=0;
    }
*/
    this.context.beginPath();
    this.context.font="15px Sans-Serif";
    this.context.fillStyle="black";
    this.context.linewidth=4;
    this.context.fillText(this.configMob.id,this.mobPosition.x+this.pos.X,this.mobPosition.y+this.pos.Y);
    this.context.closePath();

    var sourceX=Math.floor(this.units.moves%this.configMob.animations.atk_right.length)*52;
    var sourceY=Math.floor(2/9)*52;

    this.context.drawImage(this.mobImg,sourceX,this.configMob.animations.atk_right.row,52,52,this.mobPosition.x+this.pos.X,+this.mobPosition.y+this.pos.Y,this.configMob.width,this.configMob.height);
    this.timePerFrame++;
    if(this.timePerFrame==15){
        this.timePerFrame=0;
        this.units.moves++;
        if(this.units.moves==this.configMob.animations.atk_right.lenght){
            this.units.moves=0;
        }
    }

    /*if(this.units.moves>0){
        if(this.timePerFrame==10){
            this.timePerFrame=0;
            this.frameIndex++;
            if(this.frameIndex==this.hulkFrame.length){
                this.frameIndex=0;
            }
        }
        this.timePerFrame++;
    }
*/
};