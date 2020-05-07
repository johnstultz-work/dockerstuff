#!/bin/bash

USER=`whoami`
CMD="${@:1}"
docker run -i -t -e COMMAND="$CMD" -v $PWD:/home/docker/data  $USER/webwormhole

