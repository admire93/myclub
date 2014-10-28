var User = function() {
  this.setStoreName('user');
  this.load();
}

User.prototype = new Model();
User.prototype.constructor = User;

User.prototype.find = function(attr, v) {
  var r = [];
  for(i in this.store) {
    if(this.store[i][attr] == v) {
      r.push(this.store[i]);
    }
  }

  return new Find(r);
}

User.prototype.create = function(clubname, password) {
  var user = this.find('clubname', clubname);

  if(user.empty()) {
    this.push({'clubname': clubname, 'password': password});
  }

  this.commit();
}
