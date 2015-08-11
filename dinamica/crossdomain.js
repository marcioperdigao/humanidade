var lastReportTime=0;


function updateSales(sales) {
	var sala=new Array();
	sala=sales;
	var salesDiv=document.getElementById("server");
	for (var i = 0; i < sala.length; i++) {
		var sale = sala[i];
		
		var p=document.createElement("p");
		p.innerHTML=sale.name+" sold "+sale.sales+" gumballs";
		salesDiv.appendChild(p);
	}
	
	if(sala.length>0){
		// alert(sala.length);
		
		lastReportTime=sale.time;
		
	}
	
}

window.onload= function () {
	setInterval(handleRefresh,3000);
};
function handleRefresh() {
	var url = "http://gumball.wickedlysmart.com" +
"?callback=updateSales" +
"&lastreporttime=" + lastReportTime +
"&random=" + (new Date()).getTime();
	var newScriptElement=document.createElement("script");
	newScriptElement.setAttribute("src",url);
	newScriptElement.setAttribute("id","jsonp");
	
	var oldScriptElement=document.getElementById("jsonp");
	var head=document.getElementsByTagName("head")[0];
	if(oldScriptElement==null){
		head.appendChild(newScriptElement);
	}
	else{
		head.replaceChild(newScriptElement,oldScriptElement);
	}
	
}

