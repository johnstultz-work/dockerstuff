#
# Dockerfile.android: Android build environment
#
FROM ubuntu:16.04
MAINTAINER John Stultz <john.stultz@linaro.org>
ENV TERM xterm
# Update the image to the lastest updates
RUN apt-get update && apt-get -y dist-upgrade && apt-get clean && apt-get -y autoremove

# Get dependencies
RUN apt-get update && apt-get install -y \
	aapt \
	unzip\
	sudo \
        openjdk-9-jdk-headless \
	libusb-1.0

# make username a variable, so the script is portable
# add '--build-arg user_name=$USER' to the docker build command
ARG --description="user name for container" user_name=docker
RUN useradd -m $user_name
RUN echo 'export PATH="/usr/sbin/:/sbin/:$PATH"' >> /home/$user_name/.bashrc

#ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-x86.zip /home/$user_name/
#ADD https://dl.google.com/dl/android/cts/android-cts-7.1_r1-linux_x86-arm.zip /home/$user_name/
#ADD https://dl.google.com/dl/android/cts/android-cts-9.0_r7-linux_x86-arm.zip /home/$user_name/

#ADD http://testdata.linaro.org/lkft/aosp-stable/aosp-master-throttled/6832201/test_suites_arm64/android-cts.zip  /home/$user_name/
#ADD http://testdata.linaro.org/lkft/aosp-stable/google-released-cts/android-cts-11_r5/android-cts.zip /home/$user_name/
ADD android-cts.zip  /home/$user_name/
ADD https://dl.google.com/android/repository/platform-tools-latest-linux.zip /home/$user_name/
RUN chown $user_name.$user_name /home/$user_name/*.zip


USER $user_name
WORKDIR /home/$user_name

run echo '#!/bin/bash'				>> /home/$user_name/cts.sh 
run echo 'export PATH=$PATH:~/platform-tools/'	>> /home/$user_name/cts.sh
run echo 'adb devices'				>> /home/$user_name/cts.sh
run echo 'if [[ -z "${ARGS}" ]]; then echo "No ARGS value"; bash; exit ; fi' >> /home/$user_name/cts.sh
run echo './android-cts/tools/cts-tradefed run commandAndExit cts --abi arm64-v8a $ARGS --disable-reboot' >> /home/$user_name/cts.sh
run chmod +x /home/$user_name/cts.sh

# Unzup zip files
RUN	cd ~/ && \
	mkdir bin && \
	unzip android-cts.zip && \
	unzip platform-tools-latest-linux.zip

CMD ./cts.sh
