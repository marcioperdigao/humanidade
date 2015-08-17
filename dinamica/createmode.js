const WORK_SHOP_STATE_TITLE=0;
const WORK_SHOP_STATE_GROUND=1;
const WORK_SHOP_STATE_HOUSE=2;
const WORK_SHOP_STATE_CLOSE=3;
var creation=function(canvasMain,pessoa){

    this.canvas=document.getElementById("workShop");
    this.context=this.canvas.getContext("2d");
    var creationContext=this.context;
    var creationCanvas=this.canvas;

    var tileId;
    var createHouseMouse={
        x:0,
        y:0
    };

    this.workHouse={
        positionX:0,
        positionY:0,
        tamX:228,
        tamY:400,
        title:"Work Shop",
        textGroundOption:"Grounds Tiles",
        alpha:1,
        tileId:undefined,
        newState:0
    };
    var workHouse=this.workHouse;


    this.TilesMaps=TileMaps["modelo1"];
    this.imgTilesMaps=new Image();
    this.imgTilesMaps.src=this.TilesMaps.tilesets[0].image;

    var _this=this;
    function onMouseMoveWork(e){

        createHouseMouse.x=e.clientX-creationCanvas.offsetLeft;
        createHouseMouse.y=e.clientY-creationCanvas.offsetTop;

    }
    this.onMouseClickWork=function(e){
        var metricsWorkHouse=0;

        if(workHouse.newState==WORK_SHOP_STATE_TITLE){
            metricsWorkHouse=creationContext.measureText(workHouse.textGroundOption);
            console.log(workHouse.title);
            metricsWorkHouse=metricsWorkHouse.width;

            if(createHouseMouse.x<(creationCanvas.width/2)+metricsWorkHouse/2 && createHouseMouse.x>(creationCanvas.width/2)-metricsWorkHouse/2){
                if(createHouseMouse.y<60 && createHouseMouse.y>30){
                    workHouse.newState=WORK_SHOP_STATE_GROUND;
                    _this.startWorkShop();
                }
            }
        }
        else if(workHouse.newState==WORK_SHOP_STATE_GROUND){
            metricsWorkHouse=creationContext.measureText(workHouse.title);
            console.log(_this.startWorkShop);
            metricsWorkHouse=metricsWorkHouse.width;
            if(createHouseMouse.x>workHouse.positionX+(workHouse.tamX/2)-metricsWorkHouse/2 && createHouseMouse.x<workHouse.positionX+(workHouse.tamX/2)+metricsWorkHouse/2){
                if(createHouseMouse.y<30 && createHouseMouse.y>0){
                    workHouse.newState=WORK_SHOP_STATE_TITLE;
                    _this.startWorkShop();
                }
            }
        }
    };
    this.canvas.addEventListener("mousemove",onMouseMoveWork,true);
    this.canvas.addEventListener("click",this.onMouseClickWork,false);
    this.startWorkShop();
};

creation.prototype.startWorkShop=function(working){



        switch (this.workHouse.newState){
            case(WORK_SHOP_STATE_TITLE):
                this.stateTitle();
                break;
            case(WORK_SHOP_STATE_GROUND):
                this.stateGround();
                break;
        }
};

creation.prototype.stateTitle=function(){

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

    metrics=this.context.measureText(this.workHouse.textGroundOption);
    var TextGroundWidth=metrics.width;
    this.context.fillStyle="lightblue";
    this.context.fillRect((this.canvas.width/2)-5-TextGroundWidth/2,30,TextGroundWidth+10,30);
    this.context.textBaseline="top";
    this.context.font="20px Sans-Serif";


    this.context.fillStyle="white";
    this.context.fillText(this.workHouse.textGroundOption,(this.canvas.width/2)-TextGroundWidth/2,35);

};

creation.prototype.stateGround=function(){

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

    var number=0;
    var positionX=0;
    var positionY=0;
    for(var countHeight=0;countHeight<Math.floor(this.TilesMaps.tilesets[0].imageheight/32);countHeight++){


        for(var countWidth=0;countWidth<Math.floor(this.TilesMaps.tilesets[0].imagewidth/32);countWidth++){
            if(number==0 || number==1 || number==9 || number==72 || number==73 || number==74 || number==75 || number==76
                || number==80 || number==81 || number==82 || number==88 || number==89 || number==90 || number==211 || number==215
                || number==219 || number==223 || number==227 || number==231 || number==235 || number==236 || number==237
                || number==238 || number==239 || number==264 || number==265 || number==266 || number==267 || number==268
                || number==272 || number==273 || number==274 || number==275 || number==276 || number==277 || number==282
                || number==283 || number==284 || number==285 || number==286 || number==290 || number==291 || number==292 ||
                number==293 || number==328 || number==330 || number==331 || number==332 || number==337 || number==339 ||
                number==340 || number==341 || number==344 || number==346){
            this.context.drawImage(this.imgTilesMaps,32*countWidth,32*countHeight,32,32,4+positionX*32+4*positionX,positionY*32+this.workHouse.positionY+30+4*positionY,32,32);
            positionX++;
                if(positionX==6){
                    positionY++;
                    positionX=0;
                }
            }
            number++;

        }
    }

};
