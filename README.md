# sp-lsbish - stream-parser-lsb-init-script-headers

A node stream parser for LSB (Linux Standard Base) headers of an init script.

## Introduction

Init scripts can expose headers to expose information about the service definition.

Those information starts by `### BEGIN INIT INFO` and ends with `### END INIT INFO `,
they are a set of key-value pairs and can have multi-lines value.

They usually looks likes this:

```sh
$ cat /etc/init.d/puppet
#! /bin/sh
### BEGIN INIT INFO
# Provides:          puppet
# Required-Start:    $network $named $remote_fs $syslog
# Required-Stop:     $network $named $remote_fs $syslog
# Should-Start:      puppetmaster apache2
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: puppet agent
# Description:       The puppet agent connects to a puppet master, requests a
#                    catalog of resources, and configures the local system.
### END INIT INFO                                                                                                                                          
start() {
...
}

...
```

# Install

```sh
npm i @mh-cbon/sp-lsbish --save
```

# Usage

`lsbish` is a function which takes no arguments
and returns an `object` stream
which expect a by line input.

```js
require('fs')
.createReadStream('/etc/init.d/x11-common')
.pipe(require('split')())
.pipe(require('@mh-cbon/lsbish')())
.pipe(require('through2').obj(function (data, enc, cb) {
  console.log(data)
  cb(null, data);
}))
```

Which prints out

```js
{ id: 'Provides', value: 'x11-common' }
{ id: 'Required-Start', value: '$remote_fs' }
{ id: 'Required-Stop', value: '$remote_fs' }
{ id: 'Default-Start', value: 'S' }
{ id: 'Default-Stop', value: undefined }
```

# Read more
