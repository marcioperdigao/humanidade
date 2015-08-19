

function atkTarget(target,fighter){

    this.damage=fighter.config.atk-target[0].config.def;
    target[0].config.life-=this.damage;
    console.log(fighter.config.id+" DEALS "+this.damage+" OF DAMAGE ON "+target[0].config.id+" life now is"+target[0].config.life);
    //console.log(fighter.config.level);
    if(target[0].config.life<=0) {
        fighter.units.stop=false;
        fighter.config.exp += target[0].config.level * 30;


        target.splice(0,1);

        fighter.mobNumber.number--;

        if (fighter.config.exp >= 1) {

            leveling(fighter);

        }
    }
    //console.log(target.config.life);
}
