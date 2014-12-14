(function() {
  var mem = new Member();
  var timetable = new TimeTable();
  var findMember = mem.find('studentNumber', getParameterByName('sn'));
  var $popup = $("#popup");
  var $deleteButton = $('<button type="button" class="btn btn-danger">삭제</button>');


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
        $('input[name=from]').attr('value', d);
        $('input[name=color]').val(colors[0]);
        if($this.hasClass('lecture')) {
          var condit = {
            'lectureName': $this.data('lecture'),
            'from': $this.data('lecture-from')
          };

          var time = timetable.and(condit).first();

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

  var colors = (function() {
    var c = [
      [255, 176, 176],
      [255, 203, 175],
      [255, 238, 175],
      [217, 255, 175],
      [175, 230, 255],
      [175, 200, 255],
      [200, 175, 255],
    ];
    var r = [];
    for(var i = 0; i < c.length; i++) {
      r.push('#' + c[i][0].toString(16) + c[i][1].toString(16) + c[i][2].toString(16));
    }

    return r;
  })();
  var $tmpl = $('.color-picker .tmpl').clone();
  colors.map(function(e, i) {
    var $elem = $tmpl.clone();
    $elem.attr('data-color', e)
         .attr('style', '')
         .removeClass('tmpl')
         .css('background', e)
         .click(function() {
           $('.color-picker').find('.selected').removeClass('selected');
           $(this).addClass('selected');
           $('.color-picker').find('input[name=color]').val(e);
         });

    if(i == 0) {
      $elem.addClass('selected');
      $('.color-picker').find('input[name=color]').val(e);
    }
    $elem.appendTo('.color-picker');
  });

  for(var i = 0; i < lectures.length(); i++) {
    var lec = lectures.get(i);
    if(lec == null) {
      continue;
    }

    var sp = lec.from.split('-');
    var day = sp[0];
    var time = sp[1];
    var start = parseInt(s.indexOf(time));
    var end = start + parseInt(lec.time);

    for(var j = start; j < end; j++) {
      var rgb = lec.color;
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
