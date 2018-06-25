var expect=require('expect');


var {generateMessage}=require('./message');

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