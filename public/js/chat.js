var socket=io();

function scroll(){
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');

  var clientHeight=messages.prop('clientHeight');
  var scrollHeight=messages.prop('scrollHeight');
  var scrollTop=messages.prop('scrollTop');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
  {
  	
  	messages.scrollTop(scrollHeight);
  }
};
socket.on('connect',function () {
   		console.log('connected to server');
 
   });

socket.on('newMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
    	from:message.from,
    	text:message.text,
    	createdAt:formattedTime
    });

    jQuery('#messages').append(html);
    scroll();
});

socket.on('newLocationMessage',function(message){
 
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#location-template').html();
    var html=Mustache.render(template,{
    	from:message.from,
    	url:message.url,
    	createdAt:formattedTime
    });

    jQuery('#messages').append(html);
    scroll();
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