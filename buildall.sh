#!/bin/bash

USER=`whoami`

for i in `ls | sed -e 's/Dockerfile.//'`
do
	docker build -t $USER/$i . -f Dockerfile.$i
done
