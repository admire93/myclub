(function() {
  var m = new Minutes();

  $('#add-minutes').restfulize(function(d) {
    var now = new Date();

    m.create(d['minutesTitle'], d['minutesContent'].trim(), now.getTime());
    location.href = "./minutes.html";
  });
})();
