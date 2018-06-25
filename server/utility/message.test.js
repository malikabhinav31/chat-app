var expect=require('expect');


var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
   it('should generate correct message',()=>{
   	var from="Abhinav";
   	var text="Hello test";
      var res=generateMessage(from,text);
         expect(res.from).toBe(from);
         expect(res.text).toBe(text);
         expect(typeof res.createdAt).toBe('number');
   });
});


describe('generateLocationMessage',()=>{
	it('should generate correct location message',()=>{
    var from="Abhinav";
   	var lat=12,lng=13;
      var res=generateLocationMessage(from,lat,lng);
         expect(res.from).toBe(from);
         expect(res.url).toBe('https://www.google.com/maps?q=12,13');
         expect(typeof res.createdAt).toBe('number');
	});
});