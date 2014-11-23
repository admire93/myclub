$.fn.extend({
  tmpl: function(d) {
    var $this = $(this);
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
