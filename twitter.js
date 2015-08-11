//var express=require('express')
var express=require('express-session')
var app=express.createServer()
var tweets=[]
app.get('/',function(req,res){
	res.send('Welcome to Node Twitter\n')
})
app.post('/send',session.bodyParser(),function(req,res){
	if(req.body && req.body.tweet){
		tweets.push(req.body.tweet)
		res.send({status:"ok", message:"Tweet received"})
	}
	else{
	res.send({status:"nok", message:"No tweet received"})
	}
})
	
	app.get('/tweets',function(req,res){
		app.send(tweets)
	})
app.listen(8000)