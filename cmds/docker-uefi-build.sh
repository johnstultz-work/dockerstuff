#!/bin/bash

docker run -i -t -v $1:/home/docker/persist jstultz/uefi bin/bash

