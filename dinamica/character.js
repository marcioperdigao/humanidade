/*
 * pos.X and pos.Y used to know where the user camera is. Its negative to subtract from the config.x and inforChar.y, they're the real
 * position in the map, but to print it on canvas, we need to subtract the real position from the camera position.
 *
 * */
var imagemCarregada=false;
var character=function(config){
    this.canvas=document.getElementById("game");
    this.context=this.canvas.getContext("2d");
    this.pos=config.pos;
    this.mobNumber=config.mobNumber;
    this.nextHit=100;
    this.config={};
    var _this=this;
    var xmlhttp = new XMLHttpRequest();
    var url = "img/character/perdigao.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            _this.myFunction(xmlhttp.responseText);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    this.myFunction=function(response) {

        this.config = JSON.parse(response);

        this.changeView();
    };

    //POSITION OF THE VIEW GAME, USED TO KNOW WHERE PRINT, WHERE THE CAMERA USER IS
    this.alive=true;


    this.units={
        x:0,
        y:0,
        moves:0,
        follow:false,
        side:0,
        left:false,
        stop:false,
        imageFrame:0,
        distanciaX:null,
        distanciaY:null,
        distanciaDiagonal:null//distância do mob para o character se for menor que um certo valor entao o mob ataca
    };



    this.moves=0;
    this.mouse={
        x:0,
        y:0
    };

    this.timePerFrame=0;

    this.img=new Image();
    this.img.src="img/character/clotharmor.png";
    this.img.addEventListener('load',function(){
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


    this.drawingMobs=new drawTheMob(this); //create the estancia to draw the mob
    this.followHim=new followTarget(this); //create the estancia to follow the target

};

character.prototype.attacking=function(target){
    this.target=target;
    //follow the player or mob, i don't know
    this.followHim.startFollow(this.target[0]);

    //attack the mob or player i don't know
    if(this.units.stop==true){
        if(this.nextHit==100){
            atkTarget(this.target,this); //create the stanza to atk the target
            this.nextHit=0;
        }
        this.nextHit+=this.config.atkSpeed;
    }


};

character.prototype.walk=function(){
    var pos=this.pos;


    window.addEventListener("keydown",function(e){
        var walking=200;
        var codeKeyboard=(e.keyCode);
        //pra esquerda
        if(codeKeyboard==37){
            if((pos.X<0)){
                pos.X+=walking;
            }
        }

        //pra direita
        else if(codeKeyboard==39){

            if(pos.X<4800){
                pos.X-=walking;
                //andando com o mapa
            }

        }
        //pra cima
        else if(codeKeyboard==38){
            if(pos.Y<0)
                pos.Y+=walking;

        }
        //pra baixo
        else if(codeKeyboard==40){

            if(pos.Y>-4800)
                pos.Y-=walking;

        }
    },true);

};

character.prototype.changeView=function(){
    var config=this.config;
    var canvas=this.canvas;
    var mouse=this.mouse;
    var units=this.units;
    var pos=this.pos;



    function onMouseMove(e){
        mouse.x= e.clientX-canvas.offsetLeft;
        mouse.y= e.clientY-canvas.offsetTop;

    }

    this.onMouseClick=function(e){


        config.placeFree=true;
        var distanciaX=mouse.x-pos.X-config.x-25;

        var distanciaY=mouse.y-pos.Y-config.y-40;

        var distanciaDiagonal=Math.sqrt((distanciaX)*(distanciaX)+(distanciaY)*(distanciaY));
        units.moves=distanciaDiagonal/config.moveSpeed;
        var tgValue=distanciaY/distanciaDiagonal;
        var deegres=Math.asin(tgValue);
        /*var angle=Math.asin(tgValue)*180/Math.PI;*/

        units.x=Math.cos(deegres)*config.moveSpeed;
        units.y=Math.sin(deegres)*config.moveSpeed;
        if(distanciaX<0){
            units.x=units.x*-1;
        }
        if(distanciaY<0){
            //units.y=units.x*-1;
        }

        if(units.y<0){
            if(units.x>0) {
                if(units.x>units.y*-1) {
                    units.side=1;
                    units.left=false;
                }
                else {
                    units.side=4;
                    units.left=false;
                }
            }
            else if(units.y<units.x) {
                units.side=4;
                units.left=false;
            }
            else {
                units.side=1;
                units.left=true;
            }
        }
        else {
            if(units.x>0){
                if(units.x>units.y) {
                    units.side=1;
                    units.left=false;
                }
                else {
                    units.side=7;
                    units.left=false;
                }
            }
            else{
                if(units.x<units.y*-1) {

                    units.side = 1;
                    units.left=true;
                }
                else {
                    units.side=7;
                    units.left=false;
                }
            }
        }


        /* console.log(" angle "+angle+" tgValue :"+tgValue+" distanciaX :"+distanciaX+" distanciaY :"+distanciaY+" distanciaDiagonal"+distanciaDiagonal+
         " X "+config.x+" Y "+config.y+" arctan: "+angle);
         console.log("xunits: "+units.x+" yunits "+units.y+"moves "+units.moves+" pos.x "+pos.Y);*/


    };

    canvas.addEventListener("mousemove",onMouseMove,false);
    this.canvas.addEventListener("click",this.onMouseClick,false);
};


character.prototype.drawCharacter=function(){
    if(this.units.moves>0){ //USED TO CALCULATION how much more movies need to the character arrive, if its not there yet the go more one step
        this.config.x+=this.units.x;
        this.config.y+=this.units.y;
        this.units.moves--;
    }
    this.drawingMobs.drawing(this);

};

