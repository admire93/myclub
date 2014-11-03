$('h1#title').tmpl({'clubname': findMe()['clubname']});

$.fn.extend({
  'changeClass': function(target, change) {
    var $this = $(this);
    $this.removeClass(target);
    $this.addClass(change);
  },
  'validate': function(opt, submit) {
    var $this = $(this);
    var $inputs = $this.find('input');

    $inputs.focusout(function() {
      var $that = $this;
      var $this = $(this);
      for(k in opt) {
        if($this.attr('name') == k) {
          var r = opt[k].test($this.val());
          if(r) {
            $this.parent().changeClass('has-error', 'has-success');
            $this.data('validate', 'success');
          } else {
            $this.parent().changeClass('has-success', 'has-error');
            $this.data('validate', 'error');
          }
        }
      }
    });

    var f = function(e) {
      var r = [];

      for(i=0; i<$inputs.length; i++) {
        var d = $($inputs[i]).data('validate');
        if(d != undefined) {
          r.push(d == 'success');
        }
      }

      if(r.length != 0 && r.reduce(function(a, b) { return a && b})) {
        var mem = new Member();
      } else {
        return false;
      }
    };

    if(submit != undefined) {
      submit.click(f);
    } else {
      this.submit(f);
    }
  }
});

$('.form').validate({
  'phoneNumber': /01[0-9][0-9]{3,4}[0-9]{4}/,
  'studentNumber': /[0-9]{8}/,
  'sns': /https?:\/\/facebook\.com\/[0-9a-zA-Z]+\/?/,
}, $('.form button[name=submit]'));


//http://graph.facebook.com/kanghyojun/picture
