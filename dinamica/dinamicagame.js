function cadastro() {
	var cad=document.getElementById("cadastroFlutuante");
	cad.style.visibility="visible";
}

window.onload=function startGame(){
    var canvas=document.getElementById("game");
    var context=canvas.getContext("2d");
    widthCanvas=canvas.width;
    heightCanvas=canvas.height;
    var p=function(){
        this.X;
        this.Y;
    };
    var pos=new p();
    pos.X=0;
    pos.Y=0;



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
        var pessoa=[];

        pessoa[0]= new character({
            name:"Jose",
            tamX:100,
            tamY:200,
            charContext:context,
            charCanvas:canvas,
            pos:pos,
            speed:5

        });

        pessoa[0].walk(pessoa[0]);
        pessoa[0].changeView(pos);

    var workHouse=new createHouse(context);


    setInterval(draw,1000/60);

    function draw() {
        //console.log(pos.X+" "+pos.Y);
        //context.fillStyle="#ffffff";
        //context.fillRect(0,0,widthCanvas,heightCanvas)
        context.clearRect(0,0,widthCanvas,heightCanvas);

        drawBody();

        function drawBody() {
    //1000 500


            map();
            caracter();
            workHouse.openWork();
        }

        function caracter() {

            pessoa[0].drawCharacter();
        }

        function map() {

                streetMain.maps();

            lotes();
        }

        function lotes() {

            var flagBrasil=new flagstone(180,129,30,30,canvas,context);
            flagBrasil.drawingFlagBrasil();

        }

    }

};