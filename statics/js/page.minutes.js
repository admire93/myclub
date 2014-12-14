(function() {
  $('h2#title').tmpl({'clubname': findMe()['clubname']});


  var minutes = new Minutes();
  var all_minutes = minutes.all();

  var addMinutesAtTable = function(data) {
    var tem = $('#minutes .template')[0].outerHTML;
    data['shortContent'] = '';
    if(data['content'].length > 20) {
      data['shortContent'] = data['content'].slice(0, 20) + '...';
    } else {
      data['shortContent'] = data['content'];
    }


    data['rowCreatedAt'] = data['createdAt'];
    data['createdAt'] = new Date(data['createdAt']).toUTCString();

    var $elem = $(tem.tmpl(data));
    $elem.removeClass('template');
    $elem.removeAttr('style');
    $elem.removeAttr('role');
    $elem.click(function() {
      location.href = $elem.find('a').attr('href');
    })

    $('#minutes tbody').append($elem);
  }

  for(i=0; i<all_minutes.length(); i++) {
    addMinutesAtTable(all_minutes.get(i));
  }
})();
