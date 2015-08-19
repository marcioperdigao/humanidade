var drawTheMob=function(_this){
this._this=_this;


};

drawTheMob.prototype.drawing=function(){
    //console.log(this._this.config.id);
     /*if(this._this.units.moves>0){ //USED TO CALCULATION how much more movies need to the character arrive, if its not there yet the go more one step
     this._this.infoChar.x+=this._this.units.x;
     this._this.infoChar.y+=this._this.units.y;
     this._this.units.moves--;
     }*/
     //Now i'm calculation the real config of the char and using this._this to get the tiled Id
     var tileX=(Math.floor((this._this.config.x+20)/32));
     var tileY=(Math.floor((this._this.config.y+50)/32));

     if(!this._this.matrix[3].layer[tileY][tileX]==false){
     this._this.config.x-=this._this.units.x;
     this._this.config.y-=this._this.units.y;
     this._this.units.moves=0;
     }



    this._this.context.beginPath();
    this._this.context.font="15px Sans-Serif";
    this._this.context.fillStyle="black";
    this._this.context.linewidth=4;

    this._this.context.fillText(this._this.config.id,this._this.config.x+this._this.pos.X,this._this.config.y+this._this.pos.Y-5);
    this._this.context.closePath();

    /*console.log(this._this.config.animations[this._this.units.side].row);*/

    var sourceX=Math.floor(this._this.units.imageFrame%(this._this.config.animations[this._this.units.side].length+1))*this._this.config.width;

//console.log(this._this.config.animations[this._this.units.side].lenght+" "+this._this.units.side);
    var sourceY=this._this.config.animations[this._this.units.side].row*this._this.config.height;

    if(this._this.units.left){
        this._this.context.save();
        //Drawing the bar orange below the bar life
        this._this.context.fillStyle="orange";
        this._this.context.fillRect(this._this.config.x + this._this.pos.X+4,this._this.config.y + this._this.pos.Y-5,50,8);
        this._this.context.fillStyle="green";
        var lifeBarXPorcent=(this._this.config.life*50)/this._this.config.lifeFull;
        this._this.context.fillRect(this._this.config.x + this._this.pos.X+4,this._this.config.y + this._this.pos.Y-5,lifeBarXPorcent,8);

        this._this.context.scale(-1, 1);
        this._this.context.drawImage(this._this.img, sourceX, sourceY, this._this.config.width, this._this.config.height, -(this._this.config.x + this._this.pos.X)-this._this.config.width, this._this.config.y + this._this.pos.Y,
            this._this.config.width, this._this.config.height);
        this._this.context.restore();
        this._this.timePerFrame++;
        if (this._this.timePerFrame == 10) {
            this._this.timePerFrame = 0;

            if (this._this.units.imageFrame == this._this.config.animations[this._this.units.side].length) {
                this._this.units.imageFrame =-1 ;

            }
            this._this.units.imageFrame++;
        }
    }

    else {

        //Drawing the bar orange below the bar life
        this._this.context.fillStyle="orange";
        this._this.context.fillRect(this._this.config.x + this._this.pos.X+4,this._this.config.y + this._this.pos.Y-5,50,8);
        this._this.context.fillStyle="green";
        var lifeBarXPorcent=(this._this.config.life*50)/this._this.config.lifeFull;
        this._this.context.fillRect(this._this.config.x + this._this.pos.X+4,this._this.config.y + this._this.pos.Y-5,lifeBarXPorcent,8);

        //Drawing the mob or char
        this._this.context.drawImage(this._this.img, sourceX, sourceY, this._this.config.width, this._this.config.height, this._this.config.x + this._this.pos.X, this._this.config.y + this._this.pos.Y, this._this.config.width, this._this.config.height);

        this._this.timePerFrame++;
        if (this._this.timePerFrame == 10) {
            this._this.timePerFrame = 0;
            /*console.log("id "+this._this.config.id+" "+this._this.units.side+" " +this._this.config.animations[this._this.units.side].length+
                " "+sourceX+" moves "+this._this.units.imageFrame);
*/
            if (this._this.units.imageFrame == this._this.config.animations[this._this.units.side].length) {
                this._this.units.imageFrame =-1 ;

            }
            this._this.units.imageFrame++;
        }

    }


};