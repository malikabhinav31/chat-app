const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname+"/../public");
const port=process.env.PORT||3000
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

   socket.emit('newMessage',{
      from:"abhi",
      text:"Hello people",
      createdAt:new Date().getTime().toString()
   });

   socket.on('createMessage',(message)=>{
      console.log('new message created:',message);
   });

  socket.on('disconnect',()=>{
  	console.log("User disconnected");
  });
});


server.listen(port,()=>console.log("starting at port ",port));