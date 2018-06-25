const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage}=require("./utility/message");
const publicPath=path.join(__dirname+"/../public");
const port=process.env.PORT||3000
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('welcomeUser',generateMessage("Admin","Welcome to the chat app"));
    	

  socket.broadcast.emit('newMessage',generateMessage("Admin","New User Joined"));
    	
  socket.on('createMessage',(message)=>{
    console.log('new message created:',message);

    io.emit('newMessage',generateMessage(message.fron,message.text));     	
   });

  socket.on('disconnect',()=>{
  	console.log("User disconnected");
  });
});


server.listen(port,()=>console.log("starting at port ",port));