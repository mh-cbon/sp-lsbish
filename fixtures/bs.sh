#! /bin/sh
### BEGIN INIT INFO
# Provides:          puppet
#                     and other stuff
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
