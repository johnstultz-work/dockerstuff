#!/bin/bash
ARGS="${@:2}"
docker run -i -t --privileged -v /dev/bus/usb:/dev/bus/usb -e ARGS="$ARGS" -v $1:/home/docker/persist jstultz/cts

