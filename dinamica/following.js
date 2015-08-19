
var followTarget=function(fighter){
    this.fighter=fighter;

};

followTarget.prototype.startFollow=function(target){
    this.target=target;
    this.fighter.units.distanciaX=this.target.config.x-this.fighter.config.x;
    this.fighter.units.distanciaY=this.target.config.y-this.fighter.config.y;
    this.fighter.units.diagonalDistancia=Math.sqrt((this.fighter.units.distanciaX*this.fighter.units.distanciaX)+(this.fighter.units.distanciaY*this.fighter.units.distanciaY));
    if(this.fighter.units.diagonalDistancia<200){

        if(this.fighter.units.diagonalDistancia<20){//if the distance less then 32 then stop run
            this.fighter.units.stop=true;

        }
        else{
            this.fighter.units.stop=false;
        }

        if(Math.abs(this.fighter.units.distanciaX)>Math.abs(this.fighter.units.distanciaY)){
            this.fighter.units.distanciaX>0?this.fighter.units.left=false:this.fighter.units.left=true;
            this.fighter.units.side=0;
        }
        else {
            this.fighter.units.distanciaY>0?this.fighter.units.side=6:this.fighter.units.side=3;
        }

        this.fighter.units.follow=true; //if distance less of 200 then follow the target

    }
    else {
        this.fighter.units.follow = false;//if distance bigger then 200 then stop follow the target
    }


};