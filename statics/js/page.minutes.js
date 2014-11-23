(function() {
  $('h1#title').tmpl({'clubname': findMe()['clubname']});


  var minutes = new Minutes();
  var all_minutes = minutes.all();

  var addMinutesAtTable = function(data) {
    var tem = $('#minutes .template')[0].outerHTML;
    console.log(data);
    data['shortContent'] = '';
    if(data['content'].length > 20) {
      data['shortContent'] = data['content'].slice(0, 20) + '...';
    } else {
      data['shortContent'] = data;
    }

    var $elem = $(tem.tmpl(data));
    $elem.removeClass('template');
    $elem.removeAttr('style');
    $elem.removeAttr('role');

    $('#minutes tbody').append($elem);
  }

  for(i=0; i<all_minutes.length(); i++) {
    addMinutesAtTable(all_minutes.get(i));
  }
})();
