Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

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
  if(r == undefined) {
    r = [];
  }
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

Find.prototype.get = function(i) {
  return this.r[i];
}

Find.prototype.length = function(i) {
  return this.r.length;
}

Find.prototype.last = function(i) {
  return this.r[this.r.length - 1];
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

Model.prototype.reset = function(e) {
  this.store = [];
  this.commit();
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

Model.prototype.del = function(arg) {
  var r = [];
  var idxs = [];

  for(i in this.store) {
    var st = true;
    for(j in arg) {
      st = st && (this.store[i][j] == arg[j]);
      if(!st) break;
    }

    if(st) {
      idxs.push(i);
    }
  }

  for(var i = 0; i < idxs.length; i++) {
    r.push(this.store.remove(idxs[i]));
  }


  this.commit();
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

Model.prototype.all = function() {
  return new Find(this.store);
}

Model.prototype.count = function() {
  return this.store.length;
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function error(code) {
  if(code == 404) {
    location.href = './error_404.html';
  }
}
