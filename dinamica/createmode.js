
var createHouse=function(context){
    this.canvas=document.getElementById("workShop");

    this.context=this.canvas.getContext("2d");
    this.workHouse={
        positionX:0,
        positionY:0,
        tamX:228,
        tamY:400,
        title:"Work Shop",
        alpha:1
    };
    this.TilesMaps=TileMaps["modelo1"];
    this.imgTilesMaps=new Image();
    this.imgTilesMaps.src=this.TilesMaps.tilesets[0].image;
    /*for(var countingTiles=0;countingTiles<this.imgTilesMaps.tilesets[0].imageheight*this.imgTilesMaps.tilesets[0].imageheight/32;countingTiles++){

    }*/
    /*this.fieldPositionX;
    this.fieldPositionY;
    this.fieldWidth;
    this.fieldHeight;*/
};

createHouse.prototype.openWork=function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.save();

    this.context.globalAlpha=0.5;
    this.context.fillStyle="#666666";
    this.context.fillRect(this.workHouse.positionX,this.workHouse.positionY,this.workHouse.tamX,this.workHouse.tamY);

    this.context.restore();

    this.context.textBaseline="top";
    this.context.font="20px Sans-Serif";
    var metrics=this.context.measureText(this.workHouse.title);
    var titleWidth=metrics.width;
    this.context.fillStyle="white";
    this.context.fillText(this.workHouse.title,this.workHouse.positionX+(this.workHouse.tamX/2)-titleWidth/2,this.workHouse.positionY);


    for(var countHeight=0;countHeight<Math.floor(this.TilesMaps.tilesets[0].imageheight/32);countHeight++){

        if(countHeight*24>this.workHouse.tamY-84) break;
        for(var countWidth=0;countWidth<Math.floor(this.TilesMaps.tilesets[0].imagewidth/32);countWidth++){

            this.context.drawImage(this.imgTilesMaps,32*countWidth,32*countHeight,32,32,4+countWidth*24+4*countWidth,countHeight*24+this.workHouse.positionY+30+4*countHeight,24,24);
            //imageNumber++;

        }
    }

}