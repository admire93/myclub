var Find = function(r) {
  this.r = r;
}

Find.prototype.first = function() {
  return this.r[0];
}

Find.prototype.all = function() {
  return this.r;
}

Find.prototype.empty = function() {
  return this.r.length == 0;
}

var Model = function() {}

Model.prototype.setStoreName = function(store_name) {
  this.store_name = store_name;
}

Model.prototype.push = function(e) {
  this.store.push(e);
}

Model.prototype.commit = function() {
  localStorage[this.store_name] = JSON.stringify(this.store);
}


Model.prototype.load = function() {
  this.store = [];
  if(localStorage[this.store_name] != "") {
    try {
      this.store = JSON.parse(localStorage[this.store_name]);
    } catch(except) {
    }
  }
}

Model.prototype.find = function(attr, v) {
  var r = [];
  for(i in this.store) {
    if(this.store[i][attr] == v) {
      r.push(this.store[i]);
    }
  }

  return new Find(r);
}
