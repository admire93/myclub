(function() {
  var minutes = new Minutes();
  var member = new Member();
  var timetable = new TimeTable();
  var equip = new Equipment();

  var info = {
    'clubname': findMe()['clubname'],
    'studnetNumber': member.count(),
    'minutesNumber': minutes.count(),
    'timetableNumber': timetable.count(),
    'equipmentNumber': equip.count()
  };

  $('h1#title').tmpl(info);
  $('.info').each(function(i, e) {
    $(e).tmpl(info);
  });

  var all_members = member.all();
  var i = member.count();
  var $tmpl = $('#recent-member ul li.tmpl').clone();
  var til = member.count() - 5;
  if(til < 0) {
    til = 0;
  }
  while(i > til) {
    var m = all_members.get(i);
    if(m !== undefined) {
      var $elem = $tmpl.clone();
      var n = new Find(m['sns'].split('/'));
      var url = 'http://graph.facebook.com/' + n.last() + '/picture?width=200&height=200';
      $elem.find('img')
           .attr('src', url)
      $elem.find('.member-name')
           .html(m.name)
      $elem.attr('style', '')
           .appendTo('#recent-member ul')
           .removeClass('tmpl')
    }
    i -= 1;
  }
})();
