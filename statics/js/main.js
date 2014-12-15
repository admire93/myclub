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

var Model = function(name, unique) {
  if(unique) {
    name = name + findMe()['clubname'];
  } else {
    unique = false;
  }
  this.setStoreName(name);
  this.unique = unique;
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
  var name = this.store_name;
  if(this.unique) {
    name = this.store_name + findMe()['clubname'];
  }
  localStorage[name] = JSON.stringify(this.store);
}


Model.prototype.load = function() {
  this.store = [];
  if(localStorage[this.store_name] != "") {
    try {
      var name = this.store_name;
      if(this.unique) {
        name += findMe()['clubname'];
      }
      this.store = JSON.parse(localStorage[name]);
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

function exportDummy() {
  r = {}
  for(k in localStorage) {
    if(k.indexOf("myclubnl") != -1) {
      r[k] = localStorage[k];
    }
  }
  console.log(JSON.stringify(r));
}

function importDummy() {
  var a = '{"myclubnl!equipment":"[{\"name\":\"가나다\",\"status\":\"borrow\",\"num\":\"1\",\"createdAt\":1418574945291},{\"name\":\"하핳\",\"status\":\"보관\",\"num\":\"1\",\"createdAt\":1418575184057}]","myclubnl!minutes":"[{\"title\":\"흐그\",\"content\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus tortor a felis semper vestibulum et eget enim. Nam dignissim eget nisl id rutrum. Nam vitae consectetur purus. Proin tristique accumsan erat. Maecenas vitae gravida lacus. Etiam turpis est, ornare in tortor id, mattis vehicula ipsum. Morbi fringilla elit vel accumsan luctus. Donec vitae eros vel nisl rhoncus luctus ac vel tortor.\\r\\n\\r\\nNullam a diam nisi. Vivamus facilisis, lacus non viverra blandit, nunc lorem aliquam velit, sed pulvinar neque libero in magna. Nulla sodales turpis a sapien efficitur mollis. Phasellus faucibus venenatis augue non fringilla. Fusce placerat orci id commodo mattis. Nam et sollicitudin risus, sit amet consectetur orci. Sed auctor rutrum massa ut gravida. Sed id aliquam dui. Vestibulum suscipit nisl ac faucibus feugiat. Aenean rhoncus erat non semper fermentum.\",\"createdAt\":1416744608338},{\"title\":\"ㅇㅇ\",\"content\":\"ㅇㅇㅇㅇㅇ\",\"createdAt\":1416805539773},{\"title\":\"가나다\",\"content\":\"오늘은 이런걸했습니다 ㅋ\",\"createdAt\":1417419992992},{\"title\":\"이것은 회의록입니다\",\"content\":\"회의록은 ㅎㅎ... 흫아항하앟\",\"createdAt\":1417420223552},{\"title\":\"키키킼\",\"content\":\"ㅁㄴㅇㄹㅁㄴㅇㄹㅁ냐ㅐㅇ러ㅐㅁ냐어램넝래넝래ㅓㅁ내ㅑㅇ러맨어래먄어램넝래ㅑㄴ멍램너애런\",\"createdAt\":1417420234933},{\"title\":\"\",\"content\":\"asdfasdfi\\r\\n\\r\\nasdf\\r\\nas\\r\\nd fas\\r\\ndf a\\r\\nsdfsadf sadf saldf jasdlkf jasdf\\r\\n\\r\\n\\r\\nasd fasdfasdf asodfjowf wefa\\r\\nsdf\\r\\na\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\nasdfasdfsa            jj\",\"createdAt\":1418574007804},{\"title\":\"회의제목은 이거입니\",\"content\":\"본회의 의 주제는 이런거입니다.\\r\\n\\r\\n * 가나다\\r\\n * 헬로우\\r\\n\\r\\n가나다라마바사\",\"createdAt\":1418574628480},{\"title\":\"ㅋ\",\"content\":\"가\",\"createdAt\":1418574667854},{\"title\":\"rr\",\"content\":\"rrr\",\"createdAt\":1418574771653}]","myclubnl!equipmentnlnl":"[{\"name\":\"서버용 컴퓨터\",\"status\":\"보관\",\"num\":\"1\",\"createdAt\":1418577054112}]","myclubnl!membernlnl":"[{\"studentNumber\":\"12109303\",\"name\":\"강효준\",\"phoneNumber\":\"01087332439\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture?width=50&height=50 width=\\\"50\\\" height=\\\"50\\\" />\"},{\"studentNumber\":\"12109322\",\"name\":\"김현아\",\"phoneNumber\":\"01082231223\",\"sns\":\"http://facebook.com/hyuna.kim.18847\",\"pics\":\"<img src=http://graph.facebook.com/hyuna.kim.18847/picture?width=50&height=50 width=\\\"50\\\" height=\\\"50\\\" />\"},{\"studentNumber\":\"12109355\",\"name\":\"박경선\",\"phoneNumber\":\"01013234485\",\"sns\":\"http://facebook.com/qkrrudtjs\",\"pics\":\"<img src=http://graph.facebook.com/qkrrudtjs/picture?width=50&height=50 width=\\\"50\\\" height=\\\"50\\\" />\"},{\"studentNumber\":\"12109302\",\"name\":\"공성현\",\"phoneNumber\":\"01052213185\",\"sns\":\"http://facebook.com/gong.seonghyeon\",\"pics\":\"<img src=http://graph.facebook.com/gong.seonghyeon/picture?width=50&height=50 width=\\\"50\\\" height=\\\"50\\\" />\"},{\"studentNumber\":\"10109324\",\"name\":\"최봉용\",\"phoneNumber\":\"01021302398\",\"sns\":\"http://facebook.com/icybye\",\"pics\":\"<img src=http://graph.facebook.com/icybye/picture?width=50&height=50 width=\\\"50\\\" height=\\\"50\\\" />\"},{\"studentNumber\":\"11109322\",\"name\":\"안기욱\",\"phoneNumber\":\"01088932213\",\"sns\":\"http://facebook.com/kiwook.ahn\"}]","myclubnl!membernl":"[{\"studentNumber\":\"12109303\",\"name\":\"강효준\",\"phoneNumber\":\"01087332439\",\"sns\":\"http://facebook.com/kanghyojun\"}]","myclubnl!member":"[{\"studentNumber\":\"12109303\",\"name\":\"효준\",\"phoneNumber\":\"01087332439\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"},{\"studentNumber\":\"10109373\",\"name\":\"최봉용\",\"phoneNumber\":\"01088883233\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"},{\"studentNumber\":\"07142356\",\"name\":\"박진석\",\"phoneNumber\":\"01087662122\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"},{\"studentNumber\":\"11223223\",\"name\":\"강동의\",\"phoneNumber\":\"01077777777\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"},{\"studentNumber\":\"12109303\",\"name\":\"강효준\",\"phoneNumber\":\"0101231234\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"},{\"studentNumber\":\"122333222\",\"name\":\"흐스그\",\"phoneNumber\":\"01012342223\",\"sns\":\"http://facebook.com/kanghyojun\",\"pics\":\"<img src=http://graph.facebook.com/kanghyojun/picture />\"}]","myclubnl!minutesnlnl":"[{\"title\":\"회장 선출을 위한 모임\",\"content\":\"오늘은 회장 선출을 위해서 모였습니다. 선거에 참여한 인원은 다음과 같습니다.\\r\\n\\r\\n * 박진석\\r\\n * 공성현\\r\\n\\r\\n투표 결과는 추후에 공지됩니다.\\r\\n\\r\\n\\r\\n오늘 참석인원은\\r\\n\\r\\n   - 강효준\\r\\n   - 최봉용\\r\\n\\r\\n  ...\\r\\n\\r\\n스터디내용은 다음과 같이 정리합니다\\r\\n\\r\\n  #include <stdio.h>\\r\\n  void main() {\\r\\n    printf(\\\"Hello World!\\\\n\\\");\\r\\n  }\",\"createdAt\":1418577181455}]","myclubnl!timetable":"[{\"lectureName\":\"가\",\"from\":\"mon-two\",\"time\":\"1\",\"color\":\"#ffb0b0\"},{\"lectureName\":\"나\",\"from\":\"wed-three\",\"time\":\"1\",\"color\":\"#ffcbaf\"},{\"lectureName\":\"다\",\"from\":\"thu-two\",\"time\":\"1\",\"color\":\"#c8afff\"}]","myclubnl!timetablenlnl":"[{\"lectureName\":\"프로그래밍\",\"from\":\"mon-one\",\"time\":\"4\",\"color\":\"#ffcbaf\"},{\"lectureName\":\"수치해석\",\"from\":\"tue-three\",\"time\":\"3\",\"color\":\"#ffb0b0\"},{\"lectureName\":\"공업수학\",\"from\":\"thu-two\",\"time\":\"2\",\"color\":\"#afe6ff\"},{\"lectureName\":\"웹프로그래밍\",\"from\":\"fri-three\",\"time\":\"3\",\"color\":\"#d9ffaf\"}]","myclubnl!user":"[{\"clubname\":\"df\",\"password\":\"df\"},{\"clubname\":\"seoultech-nl\",\"password\":\"1234\"},{\"clubname\":\"nl\",\"password\":\"nl\"},{\"clubname\":\"foo\",\"password\":\"foo\"},{\"clubname\":\"hello\",\"password\":\"myname\"},{\"clubname\":\"ㅋㅋ\",\"password\":\"zz\"}]"}';
  var payload = JSON.parse(a);
  for(k in payload) {
    if(!localStorage.hasOwnProperty(k)) {
      localStorage[k] = payload[k];
    }
  }
}
