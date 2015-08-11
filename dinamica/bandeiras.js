


var flagstone=function(posX,posY,tamX,tamY,canvas,context) {

    this.canvas=canvas;
    this.context=context;
    widthCanvas = canvas.width;
    heightCanvas = canvas.height;

    this.posX = posX, this.posY = posY, this.tamX = tamX, this.tamY = tamY;

};

    flagstone.prototype.drawingFlagBrasil=function(){

        //quadrado verde
        this.context.beginPath();
        this.context.fillStyle = "green";
        this.context.rect(this.posX, this.posY, this.tamX, this.tamY);
        this.context.closePath();
        this.context.fill();
        //triangulo
        this.context.shadowColor = "rgba(0,0,0,0)";
        //context.strokeStyle ="yellow";
        //context.lineWidth = 5;
        //  context.lineCap = "square";
        // context.lineJoin = "round";
        this.context.beginPath();
        this.context.moveTo(this.posX + this.tamX / 10, this.posY + this.tamY / 2);
        this.context.lineTo(this.posX + this.tamX / 2, this.posY + this.tamY / 7);
        this.context.lineTo(this.posX + (this.tamX) - this.tamX / 10, this.posY + this.tamY / 2);
        this.context.lineTo(this.posX + this.tamX / 2, this.posY + (this.tamY) - this.tamY / 7);
        this.context.closePath();
        //context.stroke();
        this.context.shadowOffsetX = -15;
        this.context.shadowOffsetY = 15;
        this.context.shadowBlur = 0;
        this.context.shadowColor = "rgba(0,0,0,0)";
        this.context.fillStyle = "yellow";
        this.context.fill();
        //bola centro
        var raio = this.tamX / 5;
        this.context.beginPath();
        this.context.fillStyle = "blue";
        //context.fillStroke="black";
        this.context.arc(this.posX + this.tamX / 2, this.posY + this.tamY / 2, raio, 0, 2 * Math.PI, true);
        this.context.closePath();
        //context.stroke();
        this.context.fill();
        //faixa branca
        this.context.beginPath();
        this.context.fillStyle = "WHITE";
        this.context.rect(this.posX + (this.tamX / 2) - raio, this.posY + (this.tamY / 2) - (raio / 8), raio * 2, (raio / 4));
        this.context.closePath();
        this.context.fill();
        //ordem e progreço
        /*this.context.beginPath();
        this.context.fillStyle = "black";
        this.context.font = "9px Tahoma";
        this.context.fillText("Ordem e Progresso", this.posX + (this.tamX / 2) - raio, this.posY + 3 + this.tamY / 2);
        this.context.closePath();*/
        //this.context.fill();

    };