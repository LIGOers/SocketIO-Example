var socket = io();
var id;
currentPage = 0;

socket.on('connect', function(){
	console.log('socket connection established');
});

socket.on('clientID', function(clientID) {
	id = clientID;
	console.log('clientID: ' + id);
});

socket.on('currentPage', function(currentPage){
	console.log('currentPage: ' + currentPage);
	highlightSelectedPage(currentPage);
	this.currentPage = currentPage;
	getPageContent(currentPage);
});

/*
this function will ask the server to update the server current page variable
*/
function updatePage(value){
	socket.emit('updatePage', id, value);
}

/*
this function will ask the server which page is currently dispaying
this funciton can be used to check the sync between client and server
currentPage variable
 */
function getCurrentPage(){
	socket.emit('getPage',id);
	highlightSelectedPage(currentPage);
	//$('.nav-toggle').addClass('nav-toggle-animation');
}

/*
highlight the currently selected page in modal page
*/
function highlightSelectedPage(value){
	console.log('in highlightSelectedPage ' + value);
	$(".modal-body button").removeClass("btn-primary");
	$(".modal-body button:nth-child(" + (parseInt(value) + 1) + ")").addClass("btn-primary");
}

function getPageContent(){
	console.log('getting content for page ')
	$("#contentBody").load('./content/siteMap.html #contentBody');
}


