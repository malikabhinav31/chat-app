	var socket=io();

socket.on('connect',function () {
   		console.log('connected to server');
 
   });
socket.on('welcomeUser',function(message){
  console.log(message);
});
socket.on('newMessage',function(message){
   console.log("New message received",message);
});
 socket.on('disconnect',function () {
   console.log('Disconnected from server');
 });

 