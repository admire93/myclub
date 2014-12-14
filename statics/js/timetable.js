var TimeTable = function() {};

TimeTable.prototype = new Model('timetable');
TimeTable.prototype.constructor = TimeTable;

TimeTable.prototype.create = function(lectureName, from, time, color) {
  var d = {
    'lectureName': lectureName,
    'from': from,
    'time': time,
    'color': color
  };

  this.push(d);
  this.commit();

  return this;
}

TimeTable.prototype.createByJSON = function(json) {
  return this.create(json['lectureName'], json['from'], json['time'], json['color']);
}
