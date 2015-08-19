function cadastro() {
    var cad=document.getElementById("cadastroFlutuante");
    cad.style.visibility="visible";
}
var imagens=function(){
    this.img=new Image();
    this.img.src="img/mobs/goblin/goblin.png";
    this.img.addEventListener('load',function(){
        imagemCarregada=true;
    },false);
};




window.addEventListener("load",startGame,false);

function startGame(){
    var canvas=document.getElementById("game");
    var context=canvas.getContext("2d");
    var img=new imagens();

    widthCanvas=canvas.width;
    heightCanvas=canvas.height;
    var p=function(){
        this.X;
        this.Y;
    };



    var pos=new p();
    pos.X=0;
    pos.Y=0;
    var mobN=function(){
        this.number=10;
    };
    var mobNumber = new mobN();


    //instancia map
    var streetMain=new street({
        context:context,
        canvas:canvas,
        widthCanvas:widthCanvas,
        heightCanvas:heightCanvas,
        pos:pos
    });


    //instancia casa

    var casas=[];
    casas[0]=new casa({
        x:6,
        y:18,
        tamX:8,
        tamY:2,
        context:context,
        widthCanvas:widthCanvas,
        heightCanvas:heightCanvas
    });

    //instancia pessoa
    var mobs=[];
    var pessoa=[];

    pessoa[0]= new character({
        pos:pos,
        mobNumber:mobNumber
    });

    pessoa[0].walk(pessoa[0]);

    for(var i=0;i<10;i++){
        mobs[i]=new aiMobs({
            pos:pos,
            mobNumber:mobNumber,
            img:img
        });
    }
    var respawGoblin=300;
    var workHouse=new creation(canvas,pessoa[0]);


    setInterval(draw,1000/60);

    function draw() {

        //console.log(pos.X+" "+pos.Y);
        //context.fillStyle="#ffffff";
        //context.fillRect(0,0,widthCanvas,heightCanvas)
        context.clearRect(0,0,widthCanvas,heightCanvas);

        drawBody();

        function drawBody() {

            map();
            character();
            mobsFunctions();


        }

        function character() {

            pessoa[0].drawCharacter();
            pessoa[0].attacking(mobs);

        }

        function map() {
            streetMain.maps();

            //streetMain.maps();
            //lotes();
        }

        function lotes() {

            var flagBrasil=new flagstone(180,129,30,30,canvas,context);
            flagBrasil.drawingFlagBrasil();

        }
        function mobsFunctions(){
            respawGoblin--;

            if(respawGoblin<0 && mobs.length<10){
                respawGoblin=1000;

                var tempMob=new aiMobs({
                    pos:pos,
                    mobNumber:mobNumber,
                    img:img
                });
                console.log("Respaw of a Goblin");
                mobs.push(tempMob);

            }
            for(var i=0;i<mobs.length<10;i++) {
                mobs[i].drawMob();
                mobs[i].moving();
                mobs[i].attacking(pessoa);
            }
        }

    }

};