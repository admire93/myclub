var Minutes = function() {
  this.unique = true;
};

Minutes.prototype = new Model('minutes', true);
Minutes.prototype.constructor = Minutes;

Minutes.prototype.create = function(t, c, d) {
  var d = {
    'title': t,
    'content': c,
    'createdAt': d
  }

  this.push(d);
  this.commit();
}
