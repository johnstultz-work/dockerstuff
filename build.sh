#!/bin/bash

USER=`whoami`
LIST=`ls Dockerfile* | sed -e 's/Dockerfile.//'`

if [-n $1]
then
	LIST=$1
fi

for i in $LIST
do
	docker build -t $USER/$i . -f Dockerfile.$i
done
