(function() {
  $('h1#title').tmpl({'clubname': findMe()['clubname']});
  var member = new Member();
  var all_members = member.all();

  for(i=0; i<all_members.length(); i++) {
    addMemberAtTable(all_members.get(i));
  }
})();
