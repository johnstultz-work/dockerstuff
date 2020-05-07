#!/bin/bash
  
USER=`whoami`

if [ ! -f $PWD/build/build.sh ] ;then
  echo "Doesn't look like a kernel repo build dir"
  exit
fi

CMD="${@:1}"

docker run -i -t -e COMMAND="$CMD" -v $PWD:/home/docker/repo $USER/kernel-repo
