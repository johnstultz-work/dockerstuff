#
# Dockerfile.android: Android build environment
#
FROM ubuntu:16.04
MAINTAINER John Stultz <john.stultz@linaro.org>
ENV TERM xterm
# Update the image to the lastest updates
RUN apt-get update && apt-get -y dist-upgrade && apt-get clean && apt-get -y autoremove

# Add bits to get java8
RUN apt-get update && apt-get install -y  software-properties-common
RUN add-apt-repository ppa:openjdk-r/ppa

# Get dependencies
RUN apt-get update && apt-get install -y \
	aapt \
	adb \
	openjdk-8-jdk \
	unzip\
	sudo

# make username a variable, so the script is portable
# add '--build-arg user_name=$USER' to the docker build command
ARG --description="user name for container" user_name=docker

# Add $user_name user
RUN useradd -m $user_name && echo "$user_name:docker" | chpasswd && adduser $user_name sudo

RUN echo 'export PATH="/usr/sbin/:/sbin/:$PATH"' >> /home/$user_name/.bashrc

ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-x86.zip /home/$user_name/
ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-arm.zip /home/$user_name/
ADD https://dl.google.com/dl/android/cts/android-cts-9.0_r7-linux_x86-arm.zip /home/$user_name/
RUN chown $user_name.$user_name /home/$user_name/android-cts*

USER $user_name

RUN	cd ~/ && \
	echo '#!/bin/bash'		>> cts-x86.sh && \
	echo 'cd ~/'			>> cts-x86.sh && \
	echo 'unzip android-cts-7.1_r1-linux_x86-x86.zip' >> cts-x86.sh && \
	echo './android-cts/tools/cts-tradefed run cts'	>> cts-x86.sh && \
	chmod +x cts-x86.sh

RUN	cd ~/ && \
	echo '#!/bin/bash'		>> cts-arm.sh && \
	echo 'cd ~/'			>> cts-arm.sh && \
	echo 'unzip android-cts-7.1_r1-linux_x86-arm.zip' >> cts-arm.sh && \
	echo './android-cts/tools/cts-tradefed run cts' >> cts-arm.sh && \
	chmod +x cts-arm.sh
