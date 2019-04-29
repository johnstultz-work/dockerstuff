#!/bin/bash

USER=`whoami`

if [ ! -f $PWD/build/envsetup.sh ] ;then
  echo "Doesn't look like an Android build dir"
  exit
fi

CMD="${@:2}"

docker run -i -t -e TARGET="$1-userdebug" -e COMMAND="$CMD" -v $PWD:/home/docker/android $USER/android
