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

function showAlert(classname, text) {
  var $elem = $(classname);
  $elem.hide();
  $elem.find('span.text').text(text);
  $elem.show("bounce", {}, 500, function() {});
}

$('#login').restfulize(function(d) {
  var $me = $('#login');
  var u = new User();

  if(d['clubname'] == "" || d['password'] == "") {
    $me.find('.form-group').removeClass('has-error');
    $me.find('input').each(function(i, e) {
      var $e = $(e);
      if($e.val() == '') {
        $e.parent().addClass('has-error');
      }
    });

    showAlert('.alert', "동아리 이름 또는 비밀번호가 비어있습니다!");
    return;
  }

  var q = u.find('clubname', d['clubname']);

  if(window['isJoin']) {
    var $password = $('input[name=password]');
    var $passwordConfirm = $('input[name=password-confirm]');
    if($password.val() != $passwordConfirm.val()) {

      showAlert('.alert', "패스워드 확인이 일치하지않습니다.");
      $password.parent().addClass('has-error');
      $passwordConfirm.parent().addClass('has-error');
      return;
    }
    u.create(d['clubname'], d['password'])
    login(d);
  } else if(q.empty()) {
    $('.submit-box').before($('<div class="form-group"><input type="password" name="password-confirm" placeholder="비밀번호 확인" class="form-control" /></div>'));
    window['isJoin'] = true;
    return;
  } else {
    var q = u.and({'clubname': d['clubname'], 'password': d['password']});
    if(q != undefined && q.empty()) {
      showAlert('.alert', "동아리 이름 또는 비밀번호가 잘못되었습니다.");
    } else {
      login(q.first());
    }
  }
});
