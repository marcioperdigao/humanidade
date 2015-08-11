

    var casa=function(config){
        this.context=config.context;
        this.casaX=widthCanvas/config.x;
        this.casaY=heightCanvas/config.y;
        this.casaTamX=widthCanvas/config.tamX;
        this.casaTamY=heightCanvas/config.tamY;
        this.portaTamX=this.casaTamX/4;
        this.portaTamY=this.casaTamY/3;
        this.portaX=this.casaX+(this.casaTamX/2)-this.portaTamX/2;
        this.portaY=this.casaY+this.casaTamY-this.portaTamY;

    };
    //1000 500

    casa.prototype.drawCasa=function(){
        this.context.fillStyle="lightblue";
        this.context.fillRect(this.casaX,this.casaY,this.casaTamX,this.casaTamY);
        this.context.fillStyle="black";
        this.context.fillRect(this.portaX,this.portaY,this.portaTamX,this.portaTamY);

    };
