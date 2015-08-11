var net = require('net')
var chatServer = net.createServer()
clientList=[];
chatServer.on('connection', function(client) {
	clientList.push(client)
	
	client.write('Hi!\n');
	client.on('data',function (data){
		for(i=0;i<clientList.length;i++){
			if(!(clientList[i]==client)){
				clientList[i].write(data)
			}
		}
	})

})
chatServer.listen(9000)