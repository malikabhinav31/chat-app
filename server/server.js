const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {Users}=require('./utility/users');
const {isRealString}=require('./utility/validator');
const {generateMessage,generateLocationMessage}=require("./utility/message");

const publicPath=path.join(__dirname+"/../public");
const port=process.env.PORT||3000

var user=new Users();
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  
    	
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name)||!isRealString(params.room)){
    	return callback('Name and Room name required');
    }
    socket.join(params.room);
    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} Joined`));
    user.removeUser(socket.id);
    user.addUser(socket.id,params.name,params.room);
    var updatedList=user.getUserList(params.room);
    io.to(params.room).emit('updateList',updatedList);
    callback();
  });
  socket.on('createMessage',(message,callback)=>{
    console.log('new message created:',message);
    var from=user.getUser(socket.id)[0].name;
    io.emit('newMessage',generateMessage(from,message.text));   
    callback("");	
   });

  socket.on('createLocationMessage',(coords)=>{
  	var from=user.getUser(socket.id)[0].name;
    io.emit('newLocationMessage',
    	generateLocationMessage(from,coords.lat,coords.lng));
  });
  socket.on('disconnect',()=>{
  	console.log("User disconnected");
  	var removed=user.removeUser(socket.id)[0];
  	if(removed){
      var updatedList=user.getUserList(removed.room);
      io.to(removed.room).emit('newMessage',generateMessage('Admin',`${removed.name} left`));
      io.to(removed.room).emit('updateList',updatedList);
  	}
    
  });
});


server.listen(port,()=>console.log("starting at port ",port));