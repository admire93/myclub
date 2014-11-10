var Member = function() {};

Member.prototype = new Model('member');
Member.prototype.constructor = Member;

Member.prototype.create = function(studentNumber, name, phoneNumber, sns) {
  var d = {
    'studentNumber': studentNumber,
    'name': name,
    'phoneNumber': phoneNumber,
    'sns': sns
  };
  var member = this.and(d);

  if(member.empty()) {
    this.push(d);
    this.commit();
  }

  return this;
};

Member.prototype.createByJSON = function(json) {
  return this.create(
      json['studentNumber'], json['name'], json['phoneNumber'], json['sns']);
};
