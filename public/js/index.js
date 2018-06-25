	var socket=io();

socket.on('connect',function () {
   		console.log('connected to server');
 
   socket.emit('createMessage',{
   	from:"user1",
   	text:"Hello abhinav"
   });
 });

socket.on('newMessage',function(message){
   console.log("New message received",message);
});
 socket.on('disconnect',function () {
   console.log('Disconnected from server');
 });

 