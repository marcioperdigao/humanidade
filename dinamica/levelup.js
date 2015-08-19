
function leveling(fighter){

    fighter.config.level++;
    fighter.config.exp=0;
    fighter.config.expNextlvl=100+fighter.config.level*0.25;
    fighter.config.lifeFull+=fighter.config.lifePerlvl*fighter.config.level;
    fighter.config.life=fighter.config.lifeFull;
    fighter.config.mana+=fighter.config.manaPerlvl*fighter.config.level;
    console.log("LEVEL UP "+fighter.config.id+" now is lvl "+fighter.config.level);

}
