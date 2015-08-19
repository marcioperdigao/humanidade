
var aiMobs=function(config) {

    this.config={};
    this.pos=config.pos; //POSITION OF THE VIEW GAME, USED TO KNOW WHERE PRINT, WHERE THE CAMERA USER IS
    this.mobNumber=config.mobNumber;
    /* this.target=config.target; //info of all players position*/
    this.nextHit=100;
    var _this=this;
    var xmlhttp = new XMLHttpRequest();
    var url = "img/mobs/goblin/goblinsont.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            _this.myFunction(xmlhttp.responseText);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    this.myFunction=function(response) {

        this.config = JSON.parse(response);
        this.config.life+=30*this.config.level;
        this.config.x+=Math.random()*config.mobNumber.number*100;
        this.config.y+=Math.random()*config.mobNumber.number*100;



    };
    console.log(config.life);

    this.drawingMobs=new drawTheMob(this); //create the estancia to draw the mob
    this.followHim=new followTarget(this); //create the estancia to follow the target

    this.units={
        x:0,
        y:0,
        moves:0,
        follow:false,
        side:0,
        imageFrame:0,
        left:false,
        stop:false,
        distanciaX:null,
        distanciaY:null,
        distanciaDiagonal:null//distância do mob para o character se for menor que um certo valor entao o mob ataca
    };


    this.canvas=document.getElementById("game");
    this.context=this.canvas.getContext("2d");
    this.timePerFrame=0;
    this.img=config.img.img;

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
    if(this.units.follow==false){
        if(this.config.y<420){//first check point
            this.config.y+=this.config.moveSpeed;
            this.units.side=7;

        }
        else if(this.config.y>=420 && this.config.x<=2500){//second check point
            this.config.x+=this.config.moveSpeed;
            this.units.side=1;
            this.units.left=false;

        }
        else if(this.config.y<=1300 && this.config.x<=3520){//third check point... know he will walk in diagonal
            this.config.x+=this.config.moveSpeed*(54/100);
            this.config.y+=this.config.moveSpeed*(46/100);
            this.units.side=1;
            this.units.left=false;

        }
        else if(this.config.y<=2048 && this.config.x<=4094){//fourth check point... know he will walk in diagonal
            this.config.x+=this.config.moveSpeed*(35/100);
            this.config.y+=this.config.moveSpeed*(65/100);
            this.units.side=7;

        }
        else if(this.config.y<=4260 && this.config.x<=4064){//fifth check point... know he will walk in diagonal
            this.config.x+=this.config.moveSpeed*(4/100);
            this.config.y+=this.config.moveSpeed*(96/100);
            this.units.side=7;

        }
    }
    else if(this.units.stop==false) {
        //console.log(this.units.distanciaX+" distanciaY "+this.units.distanciaY+ " diagonalDistancia "+this.units.diagonalDistancia);

        if(this.config.x<this.target[0].config.x){
            this.config.x+=this.config.moveSpeed;

        }
        else if(this.config.x>this.target[0].config.x){
            this.config.x-=this.config.moveSpeed;

        }

        if(this.config.y>this.target[0].config.y){
            this.config.y-=this.config.moveSpeed;

        }
        else if(this.config.y<this.target[0].config.y){
            this.config.y+=this.config.moveSpeed;

        }

    }

};
aiMobs.prototype.attacking=function(target){
    this.target=target;
    //follow the player
    this.followHim.startFollow(this.target[0]);

    //attack

    if(this.units.stop==true){
        if(this.nextHit==100){
            atkTarget(this.target,this); //create the stanza to atk the target
            this.nextHit=0;
        }
        this.nextHit+=this.config.atkSpeed;
    }


};

aiMobs.prototype.drawMob=function(){

    this.drawingMobs.drawing();

};