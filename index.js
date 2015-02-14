var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var amount = 0;
io.on('connection', function(socket){
	amount++;
	var number = amount;
	socket.on('chat message', function(msg){
		if(msg == '') return;
		io.emit('chat message', 'User Number '+ number.toString() +  ': ' + msg);
		console.log('User: ' + number.toString() +  ' ' + msg);
	});
	console.log('a user conneced');
	socket.on('disconnect', function(){
		console.log('user disconnect');
	});
});

http.listen(3000, 'localhost', function(){
	console.log('listening on *:3000');
});