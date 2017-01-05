#!/bin/bash

USER=`whoami`
LIST=`ls Dockerfile* | sed -e 's/Dockerfile.//'`

#NO_CACHE="--no-cache"
NO_CACHE=""

if [ "$1" != "" ]
then
	LIST=$1
fi

for i in $LIST
do
	docker build $NO_CACHE -t $USER/$i . -f Dockerfile.$i
done
