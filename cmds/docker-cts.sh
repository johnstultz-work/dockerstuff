#!/bin/bash
echo "Don't forget 'run -m <module>'"
ARGS="${@:2}"
echo $ARGS
adb kill-server
docker run -i -t --privileged -v /dev/bus/usb:/dev/bus/usb -e ARGS="$ARGS" -v $1:/home/docker/persist jstultz/cts

