alert("giiii");
window.onload=canvasApp();

function canvasApp(){ //Code encapule inside function canvasApp

    drawScreen();

    function drawScreen(){

        var canvas=document.getElementById("game");

        alert('helllooo');
        var context=canvas.getContext("2d");



        context.fillStyle="#aaadaa";
        context.fillrect(0,0,500,300);

    }

}