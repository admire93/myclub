(function() {
  $('h2#title').tmpl({'clubname': findMe()['clubname']});
  var member = new Member();
  var all_members = member.all();
  var i = member.count();
  var $tmpl = $('#member-list li.tmpl').clone();
  var til = member.count() - 12;
  if(til < 0) {
    til = 0;
  }
  while(i > til) {
    var m = all_members.get(i);
    if(m !== undefined) {
      var $elem = $tmpl.clone();
      var n = new Find(m['sns'].split('/'));
      var url = 'http://graph.facebook.com/' + n.last() + '/picture';
      $elem.find('img')
           .attr('src', url);
      $elem.find('.member-name')
           .html(m.name);
      $elem.find('.pics-card')
           .attr('data-sn', m.studentNumber)
           .click(function() {
             location.href = "./member_timetable.html?sn=" + $(this).data('sn');
           });
      $elem.attr('style', '')
           .appendTo('#member-list')
           .removeClass('tmpl');
    }
    i -= 1;
  }
})();
