var CLUB_PREFIX = 'myclubnl!';

var setSession = function(k, v) {
  sessionStorage[CLUB_PREFIX + k] = JSON.stringify(v);
}

var getSession = function(k) {
  g = sessionStorage[CLUB_PREFIX + k];
  if(g == undefined) {
    g = '{}'
  }
  return JSON.parse(g);
}

var login = function(d) {
  setSession('login', d);
  location.href = "./index.html";
}

var logout = function() {
  setSession('login', {});
  location.href = "./login.html";
}

var isLogin = function() {
  sess = getSession('login');
  return sess['clubname'] != undefined;
}

var findMe = function() {
  var r = {};
  if(isLogin()) {
    r = getSession('login');
  }

  return r;
}

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

var Model = function(name) {
  this.setStoreName(name);
  this.load();
}

Model.prototype.setStoreName = function(store_name) {
  this.store_name = CLUB_PREFIX + store_name;
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

Model.prototype.and = function(arg) {
  var r = [];
  for(i in this.store) {
    var st = true;
    for(j in arg) {
      st = st && (this.store[i][j] == arg[j]);
      if(!st) break;
    }

    if(st) {
      r.push(this.store[i]);
    }
  }

  return new Find(r);
}

Model.prototype.or = function(arg) {
  var r = [];
  for(i in this.store) {
    var st = false;
    for(j in arg) {
      st = st || (this.store[i][j] == arg[j]);
      if(st) break;
    }

    if(st) {
      r.push(this.store[i]);
    }
  }

  return new Find(r);
}

$("#logout").click(function(e) {
    logout();
});

function requireLogin() {
  if(!isLogin()) {
    location.href = "./login.html";
  }
}

function showAlert(classname, text) {
  var $elem = $(classname);
  $elem.hide();
  $elem.find('span.text').text(text);
  $elem.show("bounce", {}, 500, function() {});
}

$.fn.extend({
  restfulize: function(callback) {
    this.submit(function(e) {
      var $this = $(this),
          v = $this.serializeArray();
      json = {}
      for(i in v) {
        var item = v[i]
        json[item.name] = item.value;
      }
      callback(json);
      return false;
    });
  }
});
