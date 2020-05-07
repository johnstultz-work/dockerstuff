#!/bin/bash
docker rm $(docker ps -a -q)
docker rmi `docker images | grep none | awk -e '{print $3}'`
