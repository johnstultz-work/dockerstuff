#!/bin/bash

docker run -i -t -p 127.0.0.1:8888:8888 -v $1:/home/docker/dev/ jstultz/lisa
