(function() {
  $('h1#title').tmpl({'clubname': findMe()['clubname']});
  var equipment = new Equipment();
  var all_equipment = equipment.all();

  var addEquipmentAtTable = function(data) {
    var tem = $('#equipment .template')[0].outerHTML;

    var $elem = $(tem.tmpl(data));
    $elem.removeClass('template');
    $elem.removeAttr('style');
    $elem.removeAttr('role');

    $('#equipment tbody').append($elem);
  }

  for(i=0; i<all_equipment.length(); i++) {
    addEquipmentAtTable(all_equipment.get(i));
  }

  $('.delete-equipment').restfulize(function(d) {
    var condit = {
      'name': d['name'],
      'createdAt': d['createdAt']
    };
    var e = equipment.and(condit);
    if(!e.empty()) {
      equipment.del(condit);
    }

    location.href = './equipment.html'
  });
})();
