$.fn.extend({
  tmpl: function(d) {
    console.log(d);
    var $this = $(this);
    console.log($this.attr('role'));
    if($this.attr('role').indexOf('tmpl') != -1) {
      for(k in d) {
        $this.text($this.text().replace(
            new RegExp("{" + k + "}", 'g'), d[k]));
      }
    }

    return $this;
  }
});

String.prototype.tmpl = function(d) {
  var that = new String(this);

  for(k in d) {
    that = that.replace(new RegExp("{" + k + "}", 'g'), d[k]);
  }

  return that;
}
