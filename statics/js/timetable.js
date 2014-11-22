var TimeTable = function() {};

TimeTable.prototype = new Model('timetable');
TimeTable.prototype.constructor = TimeTable;

TimeTable.prototype.create = function(lectureName, from, time) {
  var d = {
    'lectureName': lectureName,
    'from': from,
    'time': time
  };

  this.push(d);
  this.commit();

  return this;
}

TimeTable.prototype.createByJSON = function(json) {
  return this.create(json['lectureName'], json['from'], json['time']);
}
