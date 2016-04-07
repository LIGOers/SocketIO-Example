var socket = io();
var id;

socket.on('clientID', function(clientID) {
	id = clientID;
	console.log('clientID: ' + id);
});

socket.on('currentPage', function(currentPage){
	console.log('currentPage: ' + currentPage);
});

function updatePage(value){
	socket.emit('updatePage', id, value);
}


