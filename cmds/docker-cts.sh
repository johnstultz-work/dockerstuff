#!/bin/bash

docker run -i -t --privileged -v /dev/bus/usb:/dev/bus/usb -v $1:/home/docker/persist jstultz/cts bin/bash

