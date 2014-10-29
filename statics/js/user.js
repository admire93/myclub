var User = function() {};

User.prototype = new Model('user');
User.prototype.constructor = User;

User.prototype.create = function(clubname, password) {
  var user = this.find('clubname', clubname);

  if(user.empty()) {
    this.push({'clubname': clubname, 'password': password});
  }

  this.commit();
}
