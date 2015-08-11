//onload=criando();


function smileFace(){
	var canvas=document.getElementById("game");
	var context=canvas.getContext("2d");
	// context.fill(255,12,24);
	context.fillStyle="black";
	context.textSize(200);
	context.fillText("hello",100,100);
	context.fillStyle="black";
	context.fillRect(30,30,30,30);
	// context.fill();
	
	context.beginPath();
	context.fillStyle="#FDF5E6";
	context.strokeStyle="black";
	context.lineWidth=2;
	context.arc(200,200,100,0,2*Math.PI,true);
	context.fill();
	context.stroke();
	
	context.beginPath();
	context.fillStyle="blue";
	context.strokeStyle="black";
	context.linewidth=1;
	context.arc(159,170,15,0,2*Math.PI,true);
	context.fill();
	
	context.beginPath();
	context.fillStyle="blue";
	context.linewidth=1;
	context.arc(244,170,15,0,2*Math.PI,true);
	context.fill();
	
	context.beginPath();
	context.moveTo(200,200);
	context.lineTo(209,230);
	context.lineTo(200,230);
	context.lineWidth=3;
	context.strokeStyle="#FFE4C4";
	context.stroke();
	
	context.beginPath();
	context.fillStyle="red";
	context.strokeStyle="red";
	context.lineWidth=5;
	context.arc(200,200,80,degreesToRadians(45),degreesToRadians(132),false);
	context.fill();
	context.stroke();
	
};
function criando() {
	var canvas=document.getElementById("game");
	var context=canvas.getContext("2d");
	
	fillBackGroundColor(canvas,context);
	var selectObj=document.getElementById("shapes");
	var index=selectObj.selectedIndex;
	var shape=selectObj[index].value;
	if(shape=="squares"){
		for(var squares=0;squares<40;squares++){
		
			drawSquares(canvas,context);
		}
	}
	else{
		for(var squares=0;squares<40;squares++){
		
			drawCircles(canvas,context);
		}
	}
	
	
}

function fillBackGroundColor(canvas,context) {
	var selectObj=document.getElementById("backgroundcolor");
	var index=selectObj.selectedIndex;
	var backgroundcolor=selectObj[index].value;
	
	context.fillStyle=backgroundcolor;
	context.fillRect(0,0,canvas.width,canvas.height);
}

function drawSquares(canvas,context) {
	var w=Math.floor(Math.random()*40);
	var x=Math.floor(Math.random()*canvas.width);
	var y=Math.floor(Math.random()*canvas.height);
	context.fillStyle="lightblue";
	context.fillRect(x,y,w,w);
}
function drawCircles(canvas,context) {
	var x=Math.floor(Math.random()*canvas.width);
	var y=Math.floor(Math.random()*canvas.height);
	var radius=Math.floor(Math.random()*40);
	context.beginPath();
	context.fillStyle="lightblue";
	context.arc(x,y,radius,0,degreesToRadians(360),true);
	context.fill();
	

	
}
function degreesToRadians(degrees) {
	return(degrees*Math.PI)/180;
}

function updateTweets(tweets) {
	var tweetsSelection=document.getElementById("tweets");
	for (var i = 0; i < tweets.length; i++) {
		
		var tweet = tweets[i];
		var option=document.createElement("option");
		option.text=tweet.text;
		option.value=tweet.text.replace("\"", "'");
		
		tweetsSelection.appendChild(option);
	}
	tweetsSelection.selectedIndex=0;
}
		
	


function getMyLocation(){
		
	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition(showPosition);
		
	}
	else {
		alert("Ops!, no geolacation support");
	}
	
	
}
function showPosition(position) {

	
	var latitude=position.coords.latitude;
	var longitude=position.coords.longitude;
	
	var div=document.getElementById("local");
	div.innerHTML="You are at latitude: "+latitude+", longitude"+longitude+".";	
		
}
// window.onload= function() {
// 	var movie = new Object();
// 		movie.title="FIM DOS TEMPOS";
// 		movie.genre="Gotico";
// 		movie.showtimes=["20","30"];
		
// 		var jasonString=JSON.stringify(movie);
// 		alert(jasonString);
// 		var jasonparse=JSON.parse(jasonString);
// 		alert(jasonparse.title);
	
// };


function teste() {
	var url="http://localhost/humanidade/sales.json";
	var request=new XMLHttpRequest();
	
	request.onload=function () {
		
		if(request.status==200){
			handle(request.reponseText);	
		
		}
	};
	request.open("get",url,true);
	request.send(null);
	
}

window.onload=function servidor(){
	var url="http://localhost/humanidade/sales.json";
	
	var request= new XMLHttpRequest();
	
	request.onload=function () {
		
		if(request.status==200){
			handle(request.responseText);
		}
	}; 

	request.open("get",url,true);
	request.send(null);
};

function handle(reposta) {
	
	alert(reposta);
	
}

function HEY() {
	// var url="/sales.jason";
	var url="http://gumball.wickedlysmart.com/gumball/gumball.html";
	var request=new XMLHttpRequest();
	
	
	alert("HELLOOOOOO");
	// request.onreadystatechange=displayLuck(request);
	
	
	request.onload=function () {
		
		if (request.status==200) {
		
			displayLuck(request.responseText);
		}
		
	};
	request.open("GET",url);
	request.send(null);
};

function displayLuck(luck) {
	
	alert(luck);
	
	var luckparse=JSON.parse(luck);
	
	var server=document.getElementById("server");
	for (var i = 0; i < luckparse.length; i++) {
		var luckpars=luckparse[i];
		alert("ERRO");
	
	var p=document.createElement("p");
	
	server.appendChild(p);
	
	p.innerHTML="Nome: "+luckpars.name+" comprou: "+luckpars.sales+" gumballs";
	}
	
}