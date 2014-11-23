(function() {
  var mem = new Member();
  var timetable = new TimeTable();
  var findMember = mem.find('studentNumber', getParameterByName('sn'));
  var $popup = $("#popup");

  if(findMember.empty()) {
    error(404);
    return;
  }

  var currentMember = findMember.first();

  $('h1#title').tmpl({'memberName': currentMember.name});

  $('#timetable tbody tr').each(function(i, e) {
    var ord = ['mon', 'tue', 'wed', 'thu', 'fri'];
    var $tr = $(e);
    $tr.find('td').each(function(i, e) {
      var d = "{day}-{time}".tmpl({'day': ord[i], 'time': $tr.attr('class')});
      $(e).addClass(d)
    });
  });

  $('#timetable td')
    .hover(
      function(e) {
        $(this).addClass('over');
      },
      function(e) {
        $(this).removeClass('over');
      })
    .click(
      function(e) {
        var $this = $(this);
        var d = $this.attr('class').split(' ')[0];
        $('input[type=hidden]').attr('value', d);
        if($this.hasClass('lecture')) {
          var condit = {
            'lectureName': $this.data('lecture'),
            'from': $this.data('lecture-from')
          };

          var time = timetable.and(condit).first();
          var $deleteButton = $('<button type="button" class="btn btn-danger">삭제</button>');

          for(k in time) {
            $('input[name=' + k + ']').attr('value', time[k]);
          }

          $deleteButton.click(function(e) {
            timetable.del(condit);
            $popup.close();
            location.reload();
          });

          $popup.find('div.buttons').append($deleteButton);
        }

        $popup.bPopup();
      });


  $('#add-time').restfulize(function(d) {
    timetable.createByJSON(d);
    $popup.close();
    location.reload();
  });

  var lectures = timetable.all();

  var s = [
    'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
  ];

  var pickColor = function() {
    return '#abc';
  }

  for(var i = 0; i < lectures.length(); i++) {
    var lec = lectures.get(i);
    var sp = lec.from.split('-');
    var day = sp[0];
    var time = sp[1];
    var start = parseInt(s.indexOf(time));
    var end = start + parseInt(lec.time);

    for(var j = start; j < end; j++) {
      var rgb = pickColor();
      var className = day + '-' + s[j];

      $('td.'+className)
        .css('background-color', rgb)
        .text(lec.lectureName)
        .addClass('lecture')
        .attr('data-lecture', '{lectureName}'.tmpl(lec))
        .attr('data-lecture-from', '{from}'.tmpl(lec));
    }

  }

})();
