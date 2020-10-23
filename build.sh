#!/bin/bash

USER=`whoami`
LIST=`ls Dockerfile* | sed -e 's/Dockerfile.//'`

if [[ "$1" == "--no-cache" ]]; then
  NO_CACHE="--no-cache"
  if [["$2" != "" ]]; then
	LIST=$2
  fi
else
  if [[ "$1" != "" ]]; then
	LIST=$1
  fi
fi

for i in $LIST
do
	docker build $NO_CACHE -t $USER/$i -f Dockerfile.$i  .
done
