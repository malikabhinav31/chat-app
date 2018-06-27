	var socket=io();

socket.on('connect',function () {
   		console.log('connected to server');
 
   });

socket.on('newMessage',function(message){
   console.log("New message received",message);
    
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var li=jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}:  ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
 
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current Location</a>');

    var formattedTime=moment(message.createdAt).format('h:mm a');
    li.text(`${message.from}  ${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
 socket.on('disconnect',function () {
   console.log('Disconnected from server');
 });


 jQuery("#message-form").on('submit',function(e){
 	e.preventDefault();

 	socket.emit('createMessage',{
       from:"User",
       text:jQuery('[name=message]').val()
 	},function(){
       jQuery('[name=message]').val('');
 	});
 });

 var getLocation=jQuery('#get-location');
 getLocation.on('click',function(){
   if(!navigator.geolocation){
   	return alert('geolocation not suppported');
   }

   getLocation.attr('disabled','disabled').text('Sending Location..');

   navigator.geolocation.getCurrentPosition(function(position){
   	getLocation.removeAttr('disabled').text('Send Location');
     socket.emit('createLocationMessage',{
     	lat:position.coords.latitude,
     	lng:position.coords.longitude
     });
   },function(){ 
      alert('could not fetch location');
      getLocation.removeAttr('disabled').text('Send Location');
   });
 });