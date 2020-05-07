#!/bin/bash

docker run -i -t --privileged -v /dev/bus/usb:/dev/bus/usb -v $1:/home/docker/dev/ jstultz/ubuntu-dev 
