
var through2 = require('through2');

module.exports = function () {

  var started = false;
  var current;
  var found;
  var line = 0;
  var lsbish = function (chunk, enc, callback) {

    chunk = chunk.toString();

    if (!started && chunk.match(/^\s*### BEGIN INIT INFO/i)) {
      started = true;

    }else if (started && chunk.match(/^\s*### END INIT INFO/i)) {
      started = false;

    } else if (started) {
      // # Provides:          puppet
      var parsed = chunk.match(/^\s*#\s+([^\s]+):(\s+(.+))?/);
      if (parsed) {

        if (current) {
          found = current;
          current = null;
        }

        current = {
          id: parsed[1],
          value: parsed[3] && parsed[3].replace(/\s+$/, '')
        }
      } else if (current && chunk.match(/^\s*#\s+(.+)/)) {
        // is a multi line value
        current.value +=  ' ' + chunk.match(/^\s*#\s+(.+)/)[1].replace(/\s+$/, '');
      } else if(!current) {
        this.emit('error', 'invalid value at line ' + line)
      }
    }
    callback(null, found);
    found = null;
    line++;
  }

  var flush = function (cb) {
    if (current) this.push(current);
    cb();
  }

  return through2.obj(lsbish, flush);
}
