FROM ubuntu:16.04

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \
    wget \
    bzip2 \
    git \
    libssl-dev \
    openssh-server \
    nodejs \
    npm

# SSH Server
RUN mkdir /var/run/sshd
RUN echo 'root:screencast' | chpasswd
RUN sed -i '/PermitRootLogin/c\PermitRootLogin yes' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

# Install miniconda
RUN echo 'export PATH=/opt/miniconda/bin:$PATH' > /etc/profile.d/conda.sh && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/miniconda && \
    rm ~/miniconda.sh

# NodeJS
#RUN npm install --no-cache git
RUN npm install -g n
RUN npm install -g yarn
RUN n 9.11.1

RUN mkdir -p /app | \
    mkdir -p /frontend | \
    mkdir -p /media-files | \
    mkdir -p /static-files | \
    mkdir -p /database

COPY ./app/requirements.yml /app/requirements.yml

RUN /opt/miniconda/bin/conda env create -f /app/requirements.yml

# activate conda env
ENV PATH /opt/miniconda/envs/app/bin:$PATH
RUN sed '$ a source activate app' -i /root/.bashrc

WORKDIR /frontend
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
COPY ./frontend/yarn.lock /frontend/
RUN yarn install
COPY ./frontend /frontend
RUN npm run build

COPY ./app /app
COPY ./scripts /scripts
RUN chmod +x /scripts/*

WORKDIR /app

EXPOSE 8000
EXPOSE 22
