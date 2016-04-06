var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os');

var iohandler = require('./iohandler.js');

var PORT = 8000;
var IP = 'localhost';
//var IP = getLocalIP(); not working atm
var clients = [];

app.get('/', function(req, res){
  res.sendfile('index.html');
});


/*
	socket.emit() : only send to the sender
	io.emit() : global broadcast to all clients
*/
io.on('connection', function(socket){
  console.log('a user connected, socketID : ',socket.id);
  socket.emit('clientID', socket.id);//send the unique id back to the client 
  clients.push(socket.id);
  /*
	this listener will take the json object received from one user and rebroadcast
	back to all connected devices that's listening to the tag 'JSONPayload'

	!IMPORTANT: We rebroad cast information back to all clients including the original sender because it act as a 
	way to inform sender that the server received the message
  */
  socket.on('JSONPayload',iohandler.test);
  /*
  socket.on('JSONPayload', function(json){
  	console.log('json: ' + JSON.stringify(json));
  	io.emit('JSONPayload', json);
  });
  */
  socket.on('disconnect', function(){
    console.log('user disconnected');
    clients.splice(clients.indexOf(socket), 1);
  });
});

/*
The ip address below can be found using the following
1: ctrl + r
2: ipocnfig
3: find "Wireless LAN IPv4 Address"
*/
http.listen(PORT, IP,function(req,res){
  console.log('listening on ' ,IP, ' : ', PORT);
});

/*
grab localIP automatically
*/
function getLocalIP(){
	var interfaceList = os.networkInterfaces();
	//console.log(interfaceList);
}