# stage 1 - node with chrome (all puppeteer dependencies) and nestjs
FROM node:12-slim as node_chromed
MAINTAINER ziv

# experimental: using apt instead of apt-get
RUN  apt update \
     && apt install -y wget gnupg ca-certificates dumb-init \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt update \
     && apt install -y google-chrome-stable \
     && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

RUN npm install -g puppeteer @nestjs/cli --unsafe-perm=true --allow-root

# stage 2 - app
# FROM node_chromed