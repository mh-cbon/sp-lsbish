var should = require('should')


var fs        = require('fs');
var path      = require('path');
var split     = require('split');
var through2  = require('through2');
var lsbish    = require('../index.js');

describe('LSB init script headers stream parser', function() {
  it('parses headers', function(done) {
    var properties = []
    var k = fs.createReadStream(path.join(__dirname, '../fixtures/x11-common.sh'));
    k.pipe(split())
    .pipe(lsbish())
    .pipe(through2.obj(function (d, e, c) {
      properties.push(d)
      c();
    }))
    k.on('close', function () {
      if (done) {
        properties.length.should.eql(5);
        properties[0].should.eql({ id: 'Provides', value: 'x11-common' });
        properties[4].should.eql({ id: 'Default-Stop', value: undefined });
        done();
      }
    })
    k.on('error', function (err) {
      done(err);
      done = null;
    })
  });
  it('parses headers with multi-line values', function(done) {
    var properties = []
    var k = fs.createReadStream(path.join(__dirname, '../fixtures/puppet.sh'));
    k.pipe(split())
    .pipe(lsbish())
    .pipe(through2.obj(function (d, e, c) {
      properties.push(d)
      c();
    }))
    k.on('close', function () {
      if (done) {
        properties.length.should.eql(8);
        properties[0].should.eql({ id: 'Provides', value: 'puppet' });
        properties[7].should.eql({ id: 'Description',
          value: 'The puppet agent connects to a puppet master, requests a catalog of resources, and configures the local system.'
        });
        done();
      }
    })
    k.on('error', function (err) {
      done(err);
      done = null;
    })
  });

  it('parses other headers with multi-line values', function(done) {
    var properties = []
    var k = fs.createReadStream(path.join(__dirname, '../fixtures/bs.sh'));
    k.pipe(split())
    .pipe(lsbish())
    .pipe(through2.obj(function (d, e, c) {
      properties.push(d)
      c();
    }))
    k.on('close', function () {
      if (done) {
        properties.length.should.eql(8);
        properties[0].should.eql({ id: 'Provides', value: 'puppet and other stuff' });
        properties[7].should.eql({ id: 'Description',
          value: 'The puppet agent connects to a puppet master, requests a catalog of resources, and configures the local system.'
        });
        done();
      }
    })
    k.on('error', function (err) {
      done(err);
      done = null;
    })
  });

});
