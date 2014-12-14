(function() {
  var e = new Equipment();

  $('#add-equipment').restfulize(function(d) {
    e.createByJSON(d);
    location.href = "./equipment.html";
  });

})();
