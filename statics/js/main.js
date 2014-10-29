var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
          return JSON.parse(c.substring(name.length,c.length));
        }
    }
    return {};
}

var setCookie = function(name, json) {
  document.cookie = name + '=' + JSON.stringify(json);
}

var login = function(d) {
  setCookie('clublogin', d);
  location.href = "./index.html";
}

var logout = function() {
  setCookie('clublogin', {});
  location.href = "./login.html";
}

var isLogin = function() {
  cookie = getCookie('clublogin');
  return cookie['clubname'] != undefined;
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
