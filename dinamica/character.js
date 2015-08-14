
var imagemCarregada=false;
var character=function(config){
    this.name=config.name || "Undefined Name";
    this.infoChar=config;
    this.infoChar.x=config.x || widthCanvas/2;
    this.infoChar.y=config.y || heightCanvas/2;
    this.tamX=config.tamX || 25;
    this.tamY=config.tamY || 50;
    this.pos=config.pos;
    this.canvas=config.charCanvas;
    this.units={
        x:0,
        y:0,
        moves:0,
        frameY:0
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
    this.hulk.src="img/character/done/hulk/hulk.png";
    this.hulk.addEventListener('load',function(){
        imagemCarregada=true;
    },false);

};
character.prototype.walk=function(){
    var pos=this.pos;


    window.addEventListener("keydown",function(e){
        var walking=16;
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

            if(pos.Y>-1000)
                pos.Y-=walking;

        }
        //alert(heightCanvas/6+" "+pessoa.y);
    },true);

};

character.prototype.changeView=function(){
    var charReal=this.infoChar;
    var canvas=this.canvas;
    var mouse=this.mouse;
    var units=this.units;
    var pos=this.pos;


    function onMouseMove(e){
        mouse.x= e.clientX-canvas.offsetLeft;
        mouse.y= e.clientY-canvas.offsetTop;
        if(mouse.x<30){

        }
    }

    function onMouseClick(e){

        var distanciaX=mouse.x-pos.X-charReal.x-25;

        var distanciaY=mouse.y-pos.Y-charReal.y-40;

        var distanciaDiagonal=Math.sqrt((distanciaX)*(distanciaX)+(distanciaY)*(distanciaY));
        units.moves=distanciaDiagonal/charReal.speed;
        var tgValue=distanciaY/distanciaDiagonal;
        var deegres=Math.asin(tgValue);
        var angle=Math.asin(tgValue)*180/Math.PI;

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

    //desenhando a cabeça

    var name=this.name;
    var context=this.context;
    if(this.units.moves>0){
        this.infoChar.x+=this.units.x;
        this.infoChar.y+=this.units.y;
        this.units.moves--;
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
        if(this.timePerFrame==5){
            this.timePerFrame=0;
            this.frameIndex++;
            if(this.frameIndex==this.hulkFrame.length){
                this.frameIndex=0;
            }
        }
        this.timePerFrame++;
    }
};

