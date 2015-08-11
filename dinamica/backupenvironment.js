var imgMapTrue=false;
var street=function(config) {
    this.context=config.context;
    this.widthCanvas=config.widthCanvas;
    this.heightCanvas=config.heightCanvas;
    this.canvas=config.canvas;
    this.tileSheet=new Image();
    this.tileSheet.addEventListener('load',function(){

        imgMapTrue=true;
    },false);
    this.tileSheet.src="img/sprites/maps.png";
    this.tileMap=[
        [1040,1029,1029,961,1029,1029,1029,1029,1029,1040],
        [961,961,961,961,961,961,961,961,961,961],
        [1040,961,1101,961,1101,961,1101,961,961,1040],
        [1040,1101,961,961,1101,961,961,1101,961,1040],
        [1040,961,961,961,1101,1101,961,1101,961,1040],
        [1040,961,961,1101,961,961,961,1101,961,1040],
        [1040,961,961,961,961,961,961,1101,961,1040],
        [1040,961,1101,961,1101,961,1101,961,961,961],
        [1040,961,961,961,961,961,961,961,961,1040],
        [1040,1029,1029,1029,961,1029,1029,1029,1029,1040]
    ];

    var sol= 2;
    var principalX = this.widthCanvas/250, principalY = this.heightCanvas/1.8, principalTamX = this.widthCanvas*2, principalTamY = this.heightCanvas/3;
    var grd = this.context.createLinearGradient(0, principalY, 0, principalY + sol);
    grd.addColorStop(0, '#444');
    grd.addColorStop(1, '#000');
    this.context.beginPath();
    this.context.fillStyle = grd;
    this.context.fillRect(principalX, principalY, principalTamX, principalTamY);
    this.context.closePath();
    this.context.fill();
    //context.stroke();
    var i = 1;

    while (principalX+(i*50)< this.widthCanvas) {
        this.context.beginPath();
        this.context.fillStyle = "white";
        this.context.rect(principalX + (i * 50), principalY+principalTamY/2, 30, 4);
        this.context.fill();
        this.context.closePath();
        i++;

    }


};

street.prototype.maps=function(){
    context=this.context;
    var tileMap=this.tileMap;
    var tileSheet=this.tileSheet;
    var mapIndexOffset=-1;
    var mapRows=10;
    var mapCols=10;




    //ground that you can walk;

    //alert(Math.floor((tileMap[0][0]-32)/64)*32);
    //alert(Math.floor((tileMap[0][0])%64)*32);
    drawMap();

    function drawMap(){
        context.drawImage(tileSheet,400,100);
        for(var rowCtr=0;rowCtr<mapRows;rowCtr++){
            for(var colCtr=0;colCtr<mapCols;colCtr++){
                var tileId=tileMap[rowCtr][colCtr]+mapIndexOffset;
                var sourceX=Math.floor((tileId)%64)*32;
                var sourceY=Math.floor((tileId)/64)*32;
                context.drawImage(tileSheet,sourceX,sourceY,32,32,colCtr*32,rowCtr*32,32,32);

            }
        }

    }
};
/**
 * Created by Nonato on 25/07/2015.
 */
