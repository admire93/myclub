var Equipment = function() {
  this.unique = true;
};

Equipment.prototype = new Model('equipment', true);
Equipment.prototype.constructor = Equipment;

Equipment.prototype.create = function(name, _status, num) {
  var now = new Date();
  var d = {
    'name': name,
    'status': _status,
    'num': num,
    'createdAt': now.getTime()
  }

  this.push(d);
  this.commit();

  return this;
}

Equipment.prototype.createByJSON = function(json) {
  return this.create(json['name'], json['status'], json['num']);
}
