var Member = function() {
  this.unique = true;
};

Member.prototype = new Model('member', true);
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

var addMemberAtTable = function(data) {
  var tem = $('#members .template')[0].outerHTML;
  var n = new Find(data['sns'].split('/'));
  var url = 'http://graph.facebook.com/' + n.last() + '/picture?width=50&height=50';
  data['pics'] = '<img src=' + url + ' width="50" height="50" />';
  var $elem = $(tem.tmpl(data));
  $elem.removeClass('template');
  $elem.removeAttr('style');
  $elem.removeAttr('role');

  $('#members tbody').append($elem);
}
