var imgMapTrue=true;
var street=function(config) {
    this.context=config.context;
    this.widthCanvas=config.widthCanvas;
    this.heightCanvas=config.heightCanvas;
    this.canvas=config.canvas;
    this.posMap=config.pos;


};

street.prototype.maps=function(){
    var context=this.context;
    var pos=this.posMap;

    var img=TileMaps["modelo1"];
    var matrix = [], i, k;

    for (i = 0, k = -1; i < img.layers[0].data.length; i++) {
        if (i % 150 === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(img.layers[0].data[i]);
    }
    var maps=new Image();
    maps.src=img.tilesets[0].image;

    var row=0,col=0;
    // console.log(pos.Y+" "+matrix[30][40]);

    drawMap();

    function drawMap() {
        for (var rowSource = 0; rowSource < 150; rowSource++) {
            for (var colSource = 0; colSource < 150; colSource++) {

                var tileId = matrix[rowSource][colSource]-1;
                //console.log(tileId);
                if(tileId>=0){
                    var sourceX = Math.floor((tileId) % 8) * 32;
                    var sourceY = Math.floor((tileId) / 8) * 32;
                    if (rowSource * 32 > heightCanvas - pos.Y) { //faz com que só imprima o mapa até a visão do usuario, economizando laços for
                        break;
                    }
                    if (-pos.Y-32 < rowSource * 32) {//Só imprimir após a linha está no ponto de visão, não imprimindo nada antes deste ponto
                        context.drawImage(maps, sourceX, sourceY, 32, 32, -256+colSource * 32 + pos.X, rowSource * 32 + pos.Y, 32, 32);
                    }


                }
            }
        }
    }
};
