#!/bin/bash

USER=`whoami`
LIST=`ls Dockerfile* | sed -e 's/Dockerfile.//'`

for i in $LIST
do
	docker build -t $USER/$i . -f Dockerfile.$i
done
