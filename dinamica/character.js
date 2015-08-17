/*
* pos.X and pos.Y used to know where the user camera is. Its negative to subtract from the infoChar.x and inforChar.y, they're the real
* position in the map, but to print it on canvas, we need to subtract the real position from the camera position.
*
* */
var imagemCarregada=false;
var character=function(config){
    this.name=config.name || "Undefined Name";
    this.infoChar=config;
    this.infoChar.x=config.x || 64+widthCanvas/2; //THIS IS THE POSITION
    this.infoChar.y=config.y || heightCanvas/2;
    this.pos=config.pos; //POSITION OF THE VIEW GAME, USED TO KNOW WHERE PRINT, WHERE THE CAMERA USER IS
    this.tamX=config.tamX || 25;
    this.tamY=config.tamY || 50;

    this.canvas=config.charCanvas;
    this.units={
        x:0,
        y:0,
        moves:0,
        frameY:0,
        placeFree:true
    };
    this.moves=0;
    this.mouse={
        x:0,
        y:0
    };

    //this.canvas=config.charCanvas;
    this.context=config.charContext;
    this.hulkFrame=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    this.timePerFrame=0;
    this.frameIndex=0;
    this.hulk=new Image();
    this.hulk.src="img/character/hulk.png";
    this.hulk.addEventListener('load',function(){
        imagemCarregada=true;
    },false);

    this.matrix=[{},{},{},{}];
    this.matrix[0].layer=[];
    this.matrix[1].layer=[];
    this.matrix[2].layer=[];
    this.matrix[3].layer=[];
    //this.matrix[1].layer=[];
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
    var charReal=this.infoChar;
    var canvas=this.canvas;
    var mouse=this.mouse;
    var units=this.units;
    var pos=this.pos;
    var infoChar=this.infoChar;
    var matrix=this.matrix;


    function onMouseMove(e){
        mouse.x= e.clientX-canvas.offsetLeft;
        mouse.y= e.clientY-canvas.offsetTop;

    }

    function onMouseClick(e){


            charReal.placeFree=true;
            var distanciaX=mouse.x-pos.X-charReal.x-25;

            var distanciaY=mouse.y-pos.Y-charReal.y-40;

            var distanciaDiagonal=Math.sqrt((distanciaX)*(distanciaX)+(distanciaY)*(distanciaY));
            units.moves=distanciaDiagonal/charReal.speed;
            var tgValue=distanciaY/distanciaDiagonal;
            var deegres=Math.asin(tgValue);
            /*var angle=Math.asin(tgValue)*180/Math.PI;*/

            units.x=Math.cos(deegres)*charReal.speed;
            units.y=Math.sin(deegres)*charReal.speed;
            if(distanciaX<0){
                units.x=units.x*-1;
            }
            if(distanciaY<0){
                //units.y=units.x*-1;
            }

            if(units.y<0){
                if(units.x>0) {
                    if(units.x>units.y*-1) units.frameY=8;
                    else units.frameY=12;
                }
                else if(units.y<units.x) units.frameY=12;
                else units.frameY=4;
            }
            else {
                if(units.x>0){
                    if(units.x>units.y) units.frameY=8;
                    else units.frameY=0;
                }
                else{
                    if(units.x<units.y*-1) units.frameY=4;
                    else units.frameY=0;
                }
            }

            /* console.log(" angle "+angle+" tgValue :"+tgValue+" distanciaX :"+distanciaX+" distanciaY :"+distanciaY+" distanciaDiagonal"+distanciaDiagonal+
             " X "+charReal.x+" Y "+charReal.y+" arctan: "+angle);
             console.log("xunits: "+units.x+" yunits "+units.y+"moves "+units.moves+" pos.x "+pos.Y);*/
        }

    canvas.addEventListener("mousemove",onMouseMove,false);
    this.mouse=mouse;
    canvas.addEventListener("click",onMouseClick,false);

};


character.prototype.drawCharacter=function(pessoa){

    var name=this.name;
    var context=this.context;


    if(this.units.moves>0){ //USED TO CALCULATION how much more movies need to the character arrive, if its not there yet the go more one step
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

        context.beginPath();
        context.font="10px Sans-Serif";
        context.fillStyle="black";
        context.linewidth=2;
        context.fillText(name,this.infoChar.x+this.pos.X+10,this.infoChar.y+this.pos.Y);
        context.closePath();

        var sourceX=Math.floor(this.hulkFrame[this.frameIndex]%4)*40;
        var sourceY=Math.floor(this.hulkFrame[this.units.frameY]/4)*56;

        context.drawImage(this.hulk,sourceX,sourceY,40,56,this.infoChar.x+this.pos.X,this.infoChar.y+this.pos.Y,40,56);
        if(this.units.moves>=0){
            if(this.timePerFrame==10){
                this.timePerFrame=0;
                this.frameIndex++;
                if(this.frameIndex==this.hulkFrame.length){
                    this.frameIndex=0;
                }
            }
            this.timePerFrame++;
        }

};

