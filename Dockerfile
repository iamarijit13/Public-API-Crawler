FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get update && apt-get install -y curl mongodb gpg
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | tee /usr/share/keyrings/nodesource.gpg >/dev/null
RUN gpg --no-default-keyring --keyring /usr/share/keyrings/nodesource.gpg --list-keys
RUN echo 'deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x focal main' > /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app
RUN mkdir -p /data/db
RUN chmod +x run.sh

CMD './run.sh'