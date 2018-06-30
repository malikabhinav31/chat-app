const expect=require('expect');

const {Users}=require('./users');


describe('user tests',()=>{
	var x;
	beforeEach(()=>{
      x=new Users();
      x.users=[{
        id:'1',
        name:'abhinav',
        room:'room1'
      },{
        id:'2',
        name:'abhi',
        room:'room2'
      },{
        id:'3',
        name:'malik',
        room:'room1'
      }];
	});
   it('should add user',()=>{
   	  var x=new Users();
      var user={id:'123',name:'abhinav',room:'room1'};
      var val=x.addUser(user.id,user.name,user.room);
      expect(x.users).toEqual([user]);
   });

   it('should return names for room1',()=>{
      var namelist=x.getUserList('room1');
      var ans=["abhinav","malik"];
      expect(namelist).toEqual(ans);
   });
    it('should return names for room2',()=>{
      var namelist=x.getUserList('room2');
      expect(namelist).toEqual(["abhi"]);
   });
    it('should remove a user',()=>{
       var removedUser=x.removeUser('1');
       expect(removedUser).toEqual([{
        id:'1',
        name:'abhinav',
        room:'room1'
      }]);
       expect(x.users.length).toBe(2);
    });
    it('should not removed user',()=>{
    	var removedUser=x.removeUser('100');
        expect(removedUser).toEqual([]);
       expect(x.users.length).toBe(3);
    });
    it('should get find user',()=>{
      var requiredUser=x.removeUser('2');
       expect(requiredUser).toEqual([{
        id:'2',
        name:'abhi',
        room:'room2'
      }]);
    });
    it('should not find user',()=>{
       var requiredUser=x.removeUser('5');
       expect(requiredUser).toEqual([]);
    });
});