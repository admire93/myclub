(function() {
  var mem = new Member();
  var findMember = mem.find('studentNumber', getParameterByName('sn'));

  if(findMember.empty()) {
    error(404);
    return;
  }

  var currentMember = findMember.first();

  $('h1#title').tmpl({'memberName': currentMember.name});

  $('#timetable td').hover(function(e) {
  });
})();
