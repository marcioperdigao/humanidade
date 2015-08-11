var imgMapTrue=true;
/** @namespace this.layers[0].matrix */
var street=function(config) {
    this.context=config.context;
    this.widthCanvas=config.widthCanvas;
    this.heightCanvas=config.heightCanvas;
    this.canvas=config.canvas;
    this.posMap=config.pos;
    this.img=TileMaps["modelo1"];
    this.tilesMap=new Image();
    this.tilesMap.src=this.img.tilesets[0].image;
    this.matrix=[{},{}];
    this.matrix[0].layer=[];
    this.matrix[1].layer=[];

    //first layer
    for (var i = 0,k=-1; i < this.img.layers[0].data.length; i++) {
        if (i % 150 === 0) {
            k++;
            this.matrix[0].layer[k] = [];
        }
        this.matrix[0].layer[k].push(this.img.layers[0].data[i]);

    }
    k=-1;
    //second layer
    for (i = 0,k=-1; i < this.img.layers[1].data.length; i++) {
        if (i % 150 === 0) {
            k++;
            this.matrix[1].layer[k] = [];
        }
        this.matrix[1].layer[k].push(this.img.layers[1].data[i]);

    }



};

street.prototype.maps=function(){
    var context=this.context;
    var pos=this.posMap;
    var matrix=this.matrix;
    var maps=this.tilesMap;

    drawMap();

    function drawMap() {

        var sourceX;
        var sourceY;
        for (var layerNumber = 0; layerNumber < 2; layerNumber++) {
            for (var rowSource = 0; rowSource < 150; rowSource++) {
                for (var colSource = 0; colSource < 150; colSource++) {

                    var tileId = matrix[layerNumber].layer[rowSource][colSource] - 1;
                    //console.log(tileId);

                    if (tileId > 350) {//tiled que precisam ser rotacionados;


                        context.save();
                        context.setTransform(1, 0, 0, 1, 0, 0);
                        context.translate(-224 + colSource * 32 + pos.X, rowSource * 32 + pos.Y+32);
                        context.rotate(180 * Math.PI / 180);
                        if(tileId>3221225470){
                            tileId-=3221225472;
                        }
                        else if(tileId>2684354560){
                            tileId-=2684354560;
                            console.log(tileId);
                        }
                        else{
                            tileId-=1610612736;

                        }


                        sourceX = Math.floor((tileId) % 8) * 32;
                        sourceY = Math.floor((tileId) / 8) * 32;
                        if (rowSource * 32 > heightCanvas - pos.Y) { //faz com que só imprima o mapa até a visão do usuario, economizando laços for
                            context.restore();
                            break;
                        }

                        if (-pos.Y - 32 < rowSource * 32) {//Só imprimir após a linha está no ponto de visão, não imprimindo nada antes deste ponto
                            context.drawImage(maps, sourceX, sourceY, 32, 32,0,0, 32, 32);
                        }
                        context.restore();

                    }
                    else {
                        if (tileId >= 0) {

                            sourceX = Math.floor((tileId) % 8) * 32;
                            sourceY = Math.floor((tileId) / 8) * 32;
                            if (rowSource * 32 > heightCanvas - pos.Y) { //faz com que só imprima o mapa até a visão do usuario, economizando laços for
                                break;
                            }
                            if (-pos.Y - 32 < rowSource * 32) {//Só imprimir após a linha está no ponto de visão, não imprimindo nada antes deste ponto
                                context.drawImage(maps, sourceX, sourceY, 32, 32, -256 + colSource * 32 + pos.X, rowSource * 32 + pos.Y, 32, 32);
                            }
                        }
                    }
                }
            }
        }
    }
};
