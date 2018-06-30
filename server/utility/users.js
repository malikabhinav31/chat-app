class Users {
	constructor () {
		this.users=[];
	}
	addUser(id,name,room){
		var user={id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
      var updatedList=this.users.filter((user)=>user.id!==id);
      var removedUser=this.users.filter((user)=>user.id===id);
      this.users=updatedList;
      return removedUser;
	}
	getUser(id){
       var requiredUser=this.users.filter((user)=>user.id===id);
       return requiredUser;
	}
	getUserList(room){
		var users=this.users.filter((user)=>user.room===room);
		var nameArray=users.map((user)=>user.name);

		return nameArray;
	}
}


module.exports={Users};