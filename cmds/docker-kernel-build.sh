#!/bin/bash

USER=`whoami`

if [ ! -f $PWD/MAINTAINERS ] ;then
  echo "Doesn't look like a kernel source dir"
  exit
fi

CMD="${@:2}"

docker run -i -t -e TARGET="$1" -e COMMAND="$CMD" -v $PWD:/home/docker/kernel $USER/kernel
