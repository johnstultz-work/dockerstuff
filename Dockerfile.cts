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
	bc \
	bison \
	build-essential \
	ccache \
	curl \
	dosfstools \
	flex \
	g++-multilib \
	gcc \
	gcc-4.8 \
	gcc-multilib \
	gettext \
	git-core \
	gnupg \
	gperf \
	lib32ncurses5-dev \
	lib32z-dev \
	libc6-dev-i386 \
	libgl1-mesa-dev \
	libx11-dev \
	libxml2-utils \
	make \
	mtools \
	openjdk-8-jdk \
	python \
	python-mako \
	unzip \
	uuid-dev \
	x11proto-core-dev \
	xsltproc \
	zip \
	zlib1g-dev

# make username a variable, so the script is portable
# add '--build-arg user_name=$USER' to the docker build command
ARG --description="user name for container" user_name=docker
RUN useradd -m $user_name
RUN echo 'export PATH="/usr/sbin/:/sbin/:$PATH"' >> /home/$user_name/.bashrc

ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-x86.zip /home/$user_name/
ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-arm.zip /home/$user_name/
RUN chown $user_name.$user_name /home/$user_name/android-cts*
